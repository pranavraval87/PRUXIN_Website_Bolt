interface CtaClick { name: "cta_click"; label: string; location: string }
interface AudioPlay { name: "audio_play"; testimonial_id: string }
interface ScrollDepth { name: "scroll_depth"; percent: 25 | 50 | 75 | 100 }
interface FormStart { name: "form_start"; form_id: string }
interface VapiCallStart { name: "vapi_call_start"; industry_slug?: string }
interface VapiCallEnd { name: "vapi_call_end"; duration_seconds: number }
interface AppErrorEvent { name: "app_error"; code: string; message: string; url: string }
interface NetworkErrorEvent { name: "network_error"; url?: string; status?: number }
interface ValidationErrorEvent { name: "validation_error"; form_id: string; field_count: number }
interface OfflineEvent { name: "offline_detected" }
interface OnlineEvent { name: "online_restored"; offline_duration_seconds: number }
interface ErrorBoundaryEvent { name: "error_boundary_triggered"; component?: string }

type TrackPayload =
  | CtaClick
  | AudioPlay
  | ScrollDepth
  | FormStart
  | VapiCallStart
  | VapiCallEnd
  | AppErrorEvent
  | NetworkErrorEvent
  | ValidationErrorEvent
  | OfflineEvent
  | OnlineEvent
  | ErrorBoundaryEvent

export function track(payload: TrackPayload): void {
  if (typeof window === "undefined") return

  if (Array.isArray((window as any).dataLayer)) {
    ;(window as any).dataLayer.push({ event: payload.name, ...payload })
  }

  window.dispatchEvent(new CustomEvent("pruxin:track", { detail: payload }))

  if (import.meta.env.DEV) {
    console.debug("[analytics]", payload.name, payload)
  }
}
