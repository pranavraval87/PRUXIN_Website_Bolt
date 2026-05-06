import { ApiError, NetworkError, TimeoutError, ValidationError, logError } from "@/lib/errors"
import { track } from "@/lib/analytics"

// ─── Config ───────────────────────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  timeout?: number      // ms, default 10 000
  retries?: number      // default 2 for idempotent methods
  retryDelay?: number   // ms between retries, default 800
}

const DEFAULT_TIMEOUT = 10_000
const DEFAULT_RETRY_DELAY = 800

function isRetryable(method: string, status?: number): boolean {
  if (!["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) return false
  if (status !== undefined && status < 500 && status !== 429) return false
  return true
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Core Fetch Wrapper ───────────────────────────────────────────────────────

export async function apiFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = 2,
    retryDelay = DEFAULT_RETRY_DELAY,
    method = "GET",
    ...fetchOptions
  } = options

  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort("timeout"), timeout)

    try {
      const response = await fetch(url, {
        method,
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...fetchOptions.headers,
        },
      })

      clearTimeout(timer)

      if (!response.ok) {
        let message = `HTTP ${response.status}`
        try {
          const body = await response.json()
          message = body?.message ?? body?.error ?? message
        } catch {
          // Non-JSON error body
        }

        const err = new ApiError(response.status, message, { url, method })

        if (attempt < retries && isRetryable(method, response.status)) {
          lastError = err
          await delay(retryDelay * (attempt + 1))
          continue
        }

        track({ name: "network_error", url, status: response.status })
        logError(err, { url, method, status: response.status, attempt })
        throw err
      }

      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        return (await response.json()) as T
      }
      return (await response.text()) as unknown as T
    } catch (err) {
      clearTimeout(timer)

      if (err instanceof ApiError) throw err

      // AbortController fired — distinguish timeout from intentional abort
      if (err instanceof DOMException && err.name === "AbortError") {
        const timeoutErr = new TimeoutError()
        track({ name: "network_error", url })
        logError(timeoutErr, { url, method, attempt })
        throw timeoutErr
      }

      // Network-level failure (offline, DNS failure, etc.)
      const netErr = new NetworkError(undefined, { url, method, cause: String(err) })

      if (attempt < retries && isRetryable(method)) {
        lastError = netErr
        await delay(retryDelay * (attempt + 1))
        continue
      }

      track({ name: "network_error", url })
      logError(netErr, { url, method, attempt })
      throw netErr
    }
  }

  throw lastError
}

// ─── Convenience Methods ──────────────────────────────────────────────────────

export const api = {
  get<T>(url: string, opts?: FetchOptions) {
    return apiFetch<T>(url, { ...opts, method: "GET" })
  },

  post<T>(url: string, body: unknown, opts?: FetchOptions) {
    return apiFetch<T>(url, {
      ...opts,
      method: "POST",
      body: JSON.stringify(body),
      retries: 0, // Never auto-retry writes
    })
  },

  put<T>(url: string, body: unknown, opts?: FetchOptions) {
    return apiFetch<T>(url, {
      ...opts,
      method: "PUT",
      body: JSON.stringify(body),
      retries: 0,
    })
  },

  patch<T>(url: string, body: unknown, opts?: FetchOptions) {
    return apiFetch<T>(url, {
      ...opts,
      method: "PATCH",
      body: JSON.stringify(body),
      retries: 0,
    })
  },

  delete<T>(url: string, opts?: FetchOptions) {
    return apiFetch<T>(url, { ...opts, method: "DELETE", retries: 0 })
  },
}

// ─── Validation Helper ────────────────────────────────────────────────────────

/**
 * Validate an object against a set of rules.
 * Returns a ValidationError if any rules fail, or null if all pass.
 *
 * Usage:
 *   const err = validate({ email }, { email: [required(), isEmail()] })
 *   if (err) throw err
 */
type Validator = (value: unknown) => string | null

export function validate(
  data: Record<string, unknown>,
  rules: Record<string, Validator[]>
): ValidationError | null {
  const fieldErrors: Record<string, string> = {}

  for (const [field, validators] of Object.entries(rules)) {
    for (const validator of validators) {
      const error = validator(data[field])
      if (error) {
        fieldErrors[field] = error
        break
      }
    }
  }

  if (Object.keys(fieldErrors).length === 0) return null

  return new ValidationError(
    `Please correct the highlighted fields.`,
    fieldErrors
  )
}

// Common validators
export const validators = {
  required:
    (msg = "This field is required"): Validator =>
    (v) =>
      v === null || v === undefined || v === "" ? msg : null,

  minLength:
    (n: number, msg?: string): Validator =>
    (v) =>
      typeof v === "string" && v.length < n ? (msg ?? `Minimum ${n} characters`) : null,

  maxLength:
    (n: number, msg?: string): Validator =>
    (v) =>
      typeof v === "string" && v.length > n ? (msg ?? `Maximum ${n} characters`) : null,

  isEmail:
    (msg = "Enter a valid email address"): Validator =>
    (v) =>
      typeof v === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? msg : null,

  isPhone:
    (msg = "Enter a valid UK phone number"): Validator =>
    (v) =>
      typeof v === "string" && !/^(\+44|0)\d{9,10}$/.test(v.replace(/\s/g, "")) ? msg : null,

  matches:
    (pattern: RegExp, msg: string): Validator =>
    (v) =>
      typeof v === "string" && !pattern.test(v) ? msg : null,
}
