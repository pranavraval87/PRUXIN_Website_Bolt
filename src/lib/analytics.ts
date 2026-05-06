interface CtaClick { name: "cta_click"; label: string; location: string }
interface AudioPlay { name: "audio_play"; testimonial_id: string }
interface ScrollDepth { name: "scroll_depth"; percent: 25 | 50 | 75 | 100 }
interface FormStart { name: "form_start"; form_id: string }
interface VapiCallStart { name: "vapi_call_start"; industry_slug?: string }
interface VapiCallEnd { name: "vapi_call_end"; duration_seconds: number }

type TrackPayload =
  | CtaClick
  | AudioPlay
  | ScrollDepth
  | FormStart
  | VapiCallStart
  | VapiCallEnd

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
