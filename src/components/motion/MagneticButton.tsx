import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Props {
  children: ReactNode
  strength?: number
  className?: string
}

export function MagneticButton({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 300, damping: 20 })
  const y = useSpring(rawY, { stiffness: 300, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * strength)
    rawY.set((e.clientY - cy) * strength)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
