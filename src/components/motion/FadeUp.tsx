import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
        opacity: { duration, ease: "easeOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
