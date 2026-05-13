import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { vapi, ASSISTANT_ID } from "@/lib/vapi"
import { supabase } from "@/lib/supabase"
import { track } from "@/lib/analytics"

export type CallState = "idle" | "connecting" | "active" | "ended"

const NUM_BARS = 40
const IDLE_BARS = Array(NUM_BARS).fill(0.1)

interface CallContextValue {
  callState: CallState
  isMuted: boolean
  elapsed: number
  volumeBars: number[]
  isSpeaking: boolean
  isUserSpeaking: boolean
  startCall: (opts?: { industrySlug?: string; pagePath?: string }) => Promise<void>
  stopCall: () => void
  toggleMute: () => void
  resetEnded: () => void
  numBars: number
}

const CallContext = createContext<CallContextValue | null>(null)

export function useCall(): CallContextValue {
  const ctx = useContext(CallContext)
  if (!ctx) throw new Error("useCall must be used inside <CallProvider>")
  return ctx
}

export function CallProvider({ children }: { children: ReactNode }) {
  const [callState, setCallState] = useState<CallState>("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [volumeBars, setVolumeBars] = useState<number[]>(IDLE_BARS)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)

  const callStateRef = useRef<CallState>("idle")
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)
  const sessionIdRef = useRef<string | null>(null)

  useEffect(() => {
    callStateRef.current = callState
  }, [callState])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const finishSession = useCallback(async (reason: "user" | "remote" | "error") => {
    const id = sessionIdRef.current
    if (!id) return
    sessionIdRef.current = null
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
    try {
      await supabase
        .from("call_sessions")
        .update({
          ended_at: new Date().toISOString(),
          duration_seconds: duration,
          ended_reason: reason,
        })
        .eq("id", id)
    } catch {
      // analytics best-effort
    }
  }, [])

  const handleCallStart = useCallback(() => {
    setCallState("active")
    startTimeRef.current = Date.now()
    setElapsed(0)
    stopTimer()
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
  }, [stopTimer])

  const handleCallEnd = useCallback(() => {
    stopTimer()
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
    track({ name: "vapi_call_end", duration_seconds: duration })
    void finishSession("remote")
    setCallState("ended")
    setElapsed(0)
    setVolumeBars(IDLE_BARS)
    setIsUserSpeaking(false)
    setIsSpeaking(false)
    setIsMuted(false)
  }, [finishSession, stopTimer])

  const handleError = useCallback(() => {
    stopTimer()
    void finishSession("error")
    setCallState("idle")
    setElapsed(0)
    setVolumeBars(IDLE_BARS)
    setIsUserSpeaking(false)
    setIsSpeaking(false)
    setIsMuted(false)
  }, [finishSession, stopTimer])

  const handleVolume = useCallback((volume: number) => {
    setIsSpeaking(volume > 0.05)
    setVolumeBars(
      Array.from({ length: NUM_BARS }, (_, i) => {
        const envelope = Math.sin((i / NUM_BARS) * Math.PI)
        return Math.min(1, volume * 3 * envelope + 0.06 + Math.random() * 0.05)
      })
    )
  }, [])

  // Subscribe once for the lifetime of the provider
  useEffect(() => {
    const speechStart = () => setIsUserSpeaking(true)
    const speechEnd = () => setIsUserSpeaking(false)

    vapi.on("call-start", handleCallStart)
    vapi.on("call-end", handleCallEnd)
    vapi.on("error", handleError)
    vapi.on("volume-level", handleVolume)
    vapi.on("speech-start", speechStart)
    vapi.on("speech-end", speechEnd)

    return () => {
      vapi.removeListener("call-start", handleCallStart)
      vapi.removeListener("call-end", handleCallEnd)
      vapi.removeListener("error", handleError)
      vapi.removeListener("volume-level", handleVolume)
      vapi.removeListener("speech-start", speechStart)
      vapi.removeListener("speech-end", speechEnd)
      stopTimer()
    }
  }, [handleCallEnd, handleCallStart, handleError, handleVolume, stopTimer])

  // Idle ambient shimmer
  useEffect(() => {
    if (callState !== "idle") return
    const interval = setInterval(() => {
      setVolumeBars(
        Array.from({ length: NUM_BARS }, (_, i) => {
          const wave = Math.sin(Date.now() / 600 + i * 0.4) * 0.12
          return 0.08 + wave + Math.random() * 0.04
        })
      )
    }, 80)
    return () => clearInterval(interval)
  }, [callState])

  const startCall = useCallback(
    async (opts?: { industrySlug?: string; pagePath?: string }) => {
      // Re-entry guard
      if (callStateRef.current === "connecting" || callStateRef.current === "active") {
        return
      }
      setCallState("connecting")
      track({ name: "vapi_call_start", industry_slug: opts?.industrySlug })

      try {
        const { data } = await supabase
          .from("call_sessions")
          .insert({
            assistant_id: ASSISTANT_ID,
            industry_slug: opts?.industrySlug ?? null,
            page_path: opts?.pagePath ?? (typeof window !== "undefined" ? window.location.pathname : null),
            user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          })
          .select("id")
          .maybeSingle()
        if (data?.id) sessionIdRef.current = data.id
      } catch {
        // analytics best-effort
      }

      try {
        await vapi.start(ASSISTANT_ID)
      } catch {
        void finishSession("error")
        setCallState("idle")
      }
    },
    [finishSession]
  )

  const stopCall = useCallback(() => {
    if (callStateRef.current !== "connecting" && callStateRef.current !== "active") return
    stopTimer()
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
    track({ name: "vapi_call_end", duration_seconds: duration })
    void finishSession("user")
    try {
      vapi.stop()
    } catch {
      // ignore
    }
    setCallState("ended")
    setElapsed(0)
    setVolumeBars(IDLE_BARS)
    setIsUserSpeaking(false)
    setIsSpeaking(false)
    setIsMuted(false)
  }, [finishSession, stopTimer])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      try {
        vapi.setMuted(next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const resetEnded = useCallback(() => {
    setCallState("idle")
    setElapsed(0)
  }, [])

  const value = useMemo<CallContextValue>(
    () => ({
      callState,
      isMuted,
      elapsed,
      volumeBars,
      isSpeaking,
      isUserSpeaking,
      startCall,
      stopCall,
      toggleMute,
      resetEnded,
      numBars: NUM_BARS,
    }),
    [callState, isMuted, elapsed, volumeBars, isSpeaking, isUserSpeaking, startCall, stopCall, toggleMute, resetEnded]
  )

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>
}
