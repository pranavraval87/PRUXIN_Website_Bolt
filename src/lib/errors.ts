// ─── Error Classes ────────────────────────────────────────────────────────────

export class AppError extends Error {
  code: string
  context?: Record<string, unknown>

  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.context = context
  }
}

export class NetworkError extends AppError {
  constructor(message = "Network request failed. Check your connection.", context?: Record<string, unknown>) {
    super(message, "NETWORK_ERROR", context)
    this.name = "NetworkError"
  }
}

export class ApiError extends AppError {
  status: number

  constructor(status: number, message: string, context?: Record<string, unknown>) {
    super(message, `API_${status}`, context)
    this.name = "ApiError"
    this.status = status
  }
}

export class ValidationError extends AppError {
  fields?: Record<string, string>

  constructor(message: string, fields?: Record<string, string>) {
    super(message, "VALIDATION_ERROR", { fields })
    this.name = "ValidationError"
    this.fields = fields
  }
}

export class TimeoutError extends AppError {
  constructor(message = "The request timed out. Please try again.") {
    super(message, "TIMEOUT_ERROR")
    this.name = "TimeoutError"
  }
}

// ─── Error Logger ─────────────────────────────────────────────────────────────

export interface ErrorLogEntry {
  timestamp: string
  message: string
  code: string
  stack?: string
  context?: Record<string, unknown>
  url: string
  userAgent: string
}

const MAX_STORED_ERRORS = 50
const STORAGE_KEY = "pruxin:error_log"

function getStoredErrors(): ErrorLogEntry[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

function storeError(entry: ErrorLogEntry): void {
  try {
    const log = getStoredErrors()
    log.unshift(entry)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(log.slice(0, MAX_STORED_ERRORS)))
  } catch {
    // SessionStorage full or unavailable — silently drop
  }
}

export function logError(error: unknown, context?: Record<string, unknown>): void {
  const err = error instanceof Error ? error : new Error(String(error))
  const code = error instanceof AppError ? error.code : "UNKNOWN"
  const mergedContext = {
    ...(error instanceof AppError ? error.context : {}),
    ...context,
  }

  const entry: ErrorLogEntry = {
    timestamp: new Date().toISOString(),
    message: err.message,
    code,
    stack: err.stack,
    context: Object.keys(mergedContext).length > 0 ? mergedContext : undefined,
    url: window.location.href,
    userAgent: navigator.userAgent,
  }

  storeError(entry)

  if (Array.isArray((window as any).dataLayer)) {
    ;(window as any).dataLayer.push({ event: "app_error", ...entry })
  }

  window.dispatchEvent(new CustomEvent("pruxin:error", { detail: entry }))

  if (import.meta.env.DEV) {
    console.error("[ErrorLogger]", code, err.message, mergedContext)
  }
}

export function getErrorLog(): ErrorLogEntry[] {
  return getStoredErrors()
}

export function clearErrorLog(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently ignore
  }
}

// ─── User-Facing Message Resolver ─────────────────────────────────────────────

export function getUserMessage(error: unknown): { title: string; description: string } {
  if (error instanceof ValidationError) {
    return {
      title: "Please check your input",
      description: error.message,
    }
  }

  if (error instanceof NetworkError) {
    return {
      title: "Connection issue",
      description: "We couldn't reach our servers. Check your internet connection and try again.",
    }
  }

  if (error instanceof TimeoutError) {
    return {
      title: "Request timed out",
      description: "This is taking longer than expected. Please try again.",
    }
  }

  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return {
        title: "Access denied",
        description: "You don't have permission to perform this action.",
      }
    }
    if (error.status === 404) {
      return {
        title: "Not found",
        description: "The resource you requested doesn't exist.",
      }
    }
    if (error.status === 429) {
      return {
        title: "Too many requests",
        description: "You're moving too fast. Please wait a moment and try again.",
      }
    }
    if (error.status >= 500) {
      return {
        title: "Server error",
        description: "Something went wrong on our end. We've been notified and are looking into it.",
      }
    }
    return {
      title: "Request failed",
      description: error.message,
    }
  }

  if (error instanceof AppError) {
    return {
      title: "Something went wrong",
      description: error.message,
    }
  }

  return {
    title: "Unexpected error",
    description: "Something went wrong. Please refresh the page and try again.",
  }
}
