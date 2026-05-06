import Vapi from "@vapi-ai/web"

let instance: Vapi | null = null

function getVapi(): Vapi {
  if (!instance) {
    instance = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY ?? "")
  }
  return instance
}

export type CallState = "idle" | "requesting" | "active" | "ended"

export function startCall(assistantId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const vapi = getVapi()
    vapi.once("call-start", () => resolve())
    vapi.once("error", reject)
    vapi.start(assistantId)
  })
}

export function stopCall(): void {
  getVapi().stop()
}

export function setMuted(muted: boolean): void {
  getVapi().setMuted(muted)
}

export function onCallEnd(cb: () => void): () => void {
  const vapi = getVapi()
  vapi.on("call-end", cb)
  return () => vapi.removeListener("call-end", cb)
}

export function onSpeechStart(cb: () => void): () => void {
  const vapi = getVapi()
  vapi.on("speech-start", cb)
  return () => vapi.removeListener("speech-start", cb)
}

export function onSpeechEnd(cb: () => void): () => void {
  const vapi = getVapi()
  vapi.on("speech-end", cb)
  return () => vapi.removeListener("speech-end", cb)
}

export function onVolumeLevel(cb: (volume: number) => void): () => void {
  const vapi = getVapi()
  vapi.on("volume-level", cb)
  return () => vapi.removeListener("volume-level", cb)
}
