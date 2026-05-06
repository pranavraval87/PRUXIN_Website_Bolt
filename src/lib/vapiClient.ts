import { vapi, ASSISTANT_ID } from "@/lib/vapi"

export { ASSISTANT_ID }
export type CallState = "idle" | "requesting" | "active" | "ended"

export function startCall(assistantId: string = ASSISTANT_ID): Promise<void> {
  return new Promise((resolve, reject) => {
    vapi.once("call-start", () => resolve())
    vapi.once("error", reject)
    vapi.start(assistantId)
  })
}

export function stopCall(): void {
  vapi.stop()
}

export function setMuted(muted: boolean): void {
  vapi.setMuted(muted)
}

export function onCallEnd(cb: () => void): () => void {
  vapi.on("call-end", cb)
  return () => vapi.removeListener("call-end", cb)
}

export function onSpeechStart(cb: () => void): () => void {
  vapi.on("speech-start", cb)
  return () => vapi.removeListener("speech-start", cb)
}

export function onSpeechEnd(cb: () => void): () => void {
  vapi.on("speech-end", cb)
  return () => vapi.removeListener("speech-end", cb)
}

export function onVolumeLevel(cb: (volume: number) => void): () => void {
  vapi.on("volume-level", cb)
  return () => vapi.removeListener("volume-level", cb)
}
