import { motion, AnimatePresence } from "framer-motion"
import { WifiOff, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNetworkStatus } from "@/hooks/useNetworkStatus"

export function OfflineBanner() {
  const { isOnline, wasOffline } = useNetworkStatus()
  const showOffline = !isOnline
  const showRestored = isOnline && wasOffline

  return (
    <AnimatePresence>
      {(showOffline || showRestored) && (
        <motion.div
          key={showOffline ? "offline" : "restored"}
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          role="status"
          aria-live="polite"
          className={cn(
            "fixed top-0 inset-x-0 z-[200] flex items-center justify-center gap-2.5",
            "px-4 py-2.5 text-sm font-semibold backdrop-blur-md",
            showOffline
              ? "bg-destructive/90 text-white border-b border-destructive"
              : "bg-accent/90 text-obsidian border-b border-accent/50"
          )}
        >
          {showOffline ? (
            <>
              <WifiOff className="w-4 h-4 flex-shrink-0" />
              You&apos;re offline — some features may be unavailable
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 flex-shrink-0" />
              You&apos;re back online
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
