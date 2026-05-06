import type { LucideIcon } from "lucide-react"
import { FileText, ShieldCheck, Signature as FileSignature, Cookie, Bot } from "lucide-react"

export interface LegalSection {
  id: string
  label: string
  icon: LucideIcon
  lastReviewed: string
  placeholder?: boolean
}

export const legalSections: LegalSection[] = [
  {
    id: "terms",
    label: "Terms of Use",
    icon: FileText,
    lastReviewed: "May 2026",
    placeholder: true,
  },
  {
    id: "privacy",
    label: "Privacy Notice",
    icon: ShieldCheck,
    lastReviewed: "May 2026",
    placeholder: false,
  },
  {
    id: "dpa",
    label: "Data Processing Agreement",
    icon: FileSignature,
    lastReviewed: "May 2026",
    placeholder: true,
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    icon: Cookie,
    lastReviewed: "May 2026",
    placeholder: true,
  },
  {
    id: "ai-transparency",
    label: "AI Transparency Disclosure",
    icon: Bot,
    lastReviewed: "May 2026",
    placeholder: true,
  },
]
