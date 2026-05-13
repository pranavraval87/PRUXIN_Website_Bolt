import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GripVertical, Mic, MicOff, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useCall } from "@/lib/CallContext"

const HUD_NUM_BARS = 18
const STORAGE_KEY = "ruxi-hud-position-v1"

interface StoredPos {
  x: number
  y: number
}

function readStoredPos(): StoredPos | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredPos
    if (typeof parsed.x === "number" && typeof parsed.y === "number") return parsed
  } catch {
    // ignore
  }
  return null
}

function writeStoredPos(pos: StoredPos) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pos))
  } catch {
    // ignore
  }
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export function FloatingCallHUD() {
  const {
    callState,
    isMuted,
    elapsed,
    volumeBars,
    isSpeaking,
    isUserSpeaking,
    stopCall,
    toggleMute,
  } = useCall()

  const isMobile = useIsMobile()
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const [initialPos, setInitialPos] = useState<StoredPos>({ x: 0, y: 0 })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readStoredPos()
    if (stored) setInitialPos(stored)
    setHydrated(true)
  }, [])

  const visible = callState === "connecting" || callState === "active"

  // Downsample full bars to a smaller HUD waveform
  const hudBars =
    volumeBars.length <= HUD_NUM_BARS
      ? volumeBars
      : Array.from({ length: HUD_NUM_BARS }, (_, i) => {
          const idx = Math.floor((i / HUD_NUM_BARS) * volumeBars.length)
          return volumeBars[idx]
        })

  const dotColor = isSpeaking
    ? "bg-accent"
    : isUserSpeaking
    ? "bg-primary"
    : "bg-white/40"

  const speakerLabel =
    callState === "connecting"
      ? "Connecting…"
      : isSpeaking
      ? "Ruxi is speaking…"
      : isUserSpeaking
      ? "You are speaking…"
      : "Ruxi is listening…"

  const barColor =
    callState === "active" && isSpeaking
      ? "bg-accent"
      : callState === "active" && isUserSpeaking
      ? "bg-primary"
      : callState === "active"
      ? "bg-primary/40"
      : "bg-white/20"

  // Drag constraints: full viewport via fixed-position parent
  return (
    <>
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-[60]"
        aria-hidden="true"
      />
      <AnimatePresence>
        {visible && hydrated && (
          isMobile ? (
            <motion.div
              key="hud-mobile"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-x-3 bottom-3 z-[61] pointer-events-auto"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              role="dialog"
              aria-label="Active call with Ruxi"
            >
              <HUDInner
                hudBars={hudBars}
                barColor={barColor}
                dotColor={dotColor}
                speakerLabel={speakerLabel}
                elapsed={elapsed}
                isMuted={isMuted}
                onMute={toggleMute}
                onStop={stopCall}
                isMobile
              />
            </motion.div>
          ) : (
            <motion.div
              key="hud-desktop"
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.08}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onDragEnd={(_, info) => {
                writeStoredPos({
                  x: initialPos.x + info.offset.x,
                  y: initialPos.y + info.offset.y,
                })
                setInitialPos({
                  x: initialPos.x + info.offset.x,
                  y: initialPos.y + info.offset.y,
                })
              }}
              style={{ x: initialPos.x, y: initialPos.y }}
              className="fixed bottom-6 right-6 z-[61] pointer-events-auto"
              role="dialog"
              aria-label="Active call with Ruxi"
            >
              <HUDInner
                hudBars={hudBars}
                barColor={barColor}
                dotColor={dotColor}
                speakerLabel={speakerLabel}
                elapsed={elapsed}
                isMuted={isMuted}
                onMute={toggleMute}
                onStop={stopCall}
              />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  )
}

interface HUDInnerProps {
  hudBars: number[]
  barColor: string
  dotColor: string
  speakerLabel: string
  elapsed: number
  isMuted: boolean
  onMute: () => void
  onStop: () => void
  isMobile?: boolean
}

function HUDInner({
  hudBars,
  barColor,
  dotColor,
  speakerLabel,
  elapsed,
  isMuted,
  onMute,
  onStop,
  isMobile,
}: HUDInnerProps) {
  return (
    <div className="relative w-full sm:w-[340px]">
      {/* Aura */}
      <div className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30" />

      <div className="relative glass-card rounded-2xl border border-white/10 bg-background/85 backdrop-blur-xl p-4 shadow-2xl">
        {/* Drag handle (desktop only) */}
        {!isMobile && (
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 text-muted-foreground/50 cursor-grab active:cursor-grabbing select-none"
            aria-label="Drag to move"
          >
            <GripVertical className="w-3 h-3 rotate-90" />
          </div>
        )}

        <div className="flex items-center gap-3 mt-2">
          {/* Live dot */}
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", dotColor)}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{speakerLabel}</p>
            <p className="text-[11px] font-mono text-muted-foreground tabular-nums">
              {formatTime(elapsed)}
            </p>
          </div>
        </div>

        {/* Compact waveform */}
        <div className="mt-3 flex items-end justify-center gap-[2px] h-8">
          {hudBars.map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: `${Math.max(2, Math.round(h * 32))}px` }}
              transition={{ duration: 0.08, ease: "easeOut" }}
              className={cn(
                "w-[3px] rounded-full flex-shrink-0 transition-colors duration-300",
                barColor
              )}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMute}
            className={cn(
              "flex-1 gap-1.5 border-white/15 hover:border-white/30 h-9",
              isMuted && "border-destructive/40 text-destructive bg-destructive/5"
            )}
          >
            {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span className="text-xs">{isMuted ? "Unmute" : "Mute"}</span>
          </Button>
          <Button
            size="sm"
            onClick={onStop}
            className="flex-1 bg-destructive/90 hover:bg-destructive text-white gap-1.5 h-9"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span className="text-xs">End Call</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
