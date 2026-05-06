import { useEffect, useRef } from "react"
import { track } from "@/lib/analytics"

const DEPTHS = [25, 50, 75, 100] as const

export function useScrollDepth(containerRef: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement>): void {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sentinels: HTMLDivElement[] = DEPTHS.map((pct) => {
      const el = document.createElement("div")
      el.style.cssText = `
        position: absolute;
        left: 0;
        width: 1px;
        height: 1px;
        pointer-events: none;
        top: ${pct}%;
      `
      el.setAttribute("data-depth", String(pct))
      container.style.position = "relative"
      container.appendChild(el)
      return el
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const pct = Number(entry.target.getAttribute("data-depth")) as 25 | 50 | 75 | 100
          if (!fired.current.has(pct)) {
            fired.current.add(pct)
            track({ name: "scroll_depth", percent: pct })
          }
        }
      },
      { threshold: 0 }
    )

    sentinels.forEach((s) => observer.observe(s))

    return () => {
      observer.disconnect()
      sentinels.forEach((s) => s.remove())
    }
  }, [containerRef])
}
