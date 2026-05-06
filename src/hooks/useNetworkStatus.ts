import { useState, useEffect, useRef } from "react"
import { track } from "@/lib/analytics"

export interface NetworkStatus {
  isOnline: boolean
  wasOffline: boolean  // true for one render cycle after coming back online
  offlineSince: Date | null
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)
  const [offlineSince, setOfflineSince] = useState<Date | null>(null)
  const [wasOffline, setWasOffline] = useState(false)
  const offlineSinceRef = useRef<Date | null>(null)

  useEffect(() => {
    function handleOffline() {
      const now = new Date()
      offlineSinceRef.current = now
      setIsOnline(false)
      setOfflineSince(now)
      setWasOffline(false)
      track({ name: "offline_detected" })
    }

    function handleOnline() {
      const offlineMs = offlineSinceRef.current
        ? Date.now() - offlineSinceRef.current.getTime()
        : 0
      offlineSinceRef.current = null
      setIsOnline(true)
      setOfflineSince(null)
      setWasOffline(true)
      track({ name: "online_restored", offline_duration_seconds: Math.round(offlineMs / 1000) })

      // Clear the wasOffline flag after the next render
      setTimeout(() => setWasOffline(false), 4000)
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [])

  return { isOnline, wasOffline, offlineSince }
}
