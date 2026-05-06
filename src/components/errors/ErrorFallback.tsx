import { motion } from "framer-motion"
import { TriangleAlert as AlertTriangle, RefreshCw, Hop as Home, Bug, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getUserMessage } from "@/lib/errors"
import { useState } from "react"

interface Props {
  error: Error
  errorId?: string
  section?: string
  inline?: boolean
  onReset?: () => void
  onNavigateHome?: () => void
}

export function ErrorFallback({
  error,
  errorId,
  section,
  inline = false,
  onReset,
  onNavigateHome,
}: Props) {
  const [showDetails, setShowDetails] = useState(false)
  const { title, description } = getUserMessage(error)

  if (inline) {
    return (
      <div
        role="alert"
        className={cn(
          "glass-card rounded-xl border border-destructive/30 bg-destructive/5 p-5",
          "flex items-start gap-4"
        )}
      >
        <div className="w-8 h-8 rounded-lg bg-destructive/15 border border-destructive/25 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-destructive" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
          {onReset && (
            <Button
              size="sm"
              variant="outline"
              onClick={onReset}
              className="mt-3 h-7 text-xs border-destructive/30 text-destructive hover:bg-destructive/10 gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              Try again
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* Outer glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-destructive/15 via-destructive/8 to-destructive/15 blur-xl pointer-events-none" />

        <div className="relative glass-card rounded-2xl border border-destructive/25 p-8 flex flex-col items-center text-center gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-destructive/20 blur-lg" />
            <div className="relative w-16 h-16 rounded-full bg-destructive/10 border border-destructive/25 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{description}</p>
            {section && (
              <p className="text-xs text-muted-foreground/60 mt-1">
                Error in: <span className="font-mono text-muted-foreground">{section}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {onReset && (
              <Button
                onClick={onReset}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-blue font-semibold gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onNavigateHome ?? (() => window.location.assign("/"))}
              className="flex-1 border-white/15 hover:border-white/30 gap-2"
            >
              <Home className="w-4 h-4" />
              Go home
            </Button>
          </div>

          {/* Debug details (dev / collapsed in prod) */}
          {(import.meta.env.DEV || errorId) && (
            <div className="w-full">
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mx-auto"
              >
                <Bug className="w-3 h-3" />
                {showDetails ? "Hide" : "Show"} error details
                {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 text-left bg-white/[0.03] border border-white/8 rounded-xl p-4 space-y-2"
                >
                  {errorId && (
                    <p className="text-[10px] text-muted-foreground/50 font-mono">
                      ID: {errorId}
                    </p>
                  )}
                  <p className="text-xs font-mono text-destructive/80 break-all">
                    {error.name}: {error.message}
                  </p>
                  {import.meta.env.DEV && error.stack && (
                    <pre className="text-[10px] font-mono text-muted-foreground/50 overflow-auto max-h-32 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
