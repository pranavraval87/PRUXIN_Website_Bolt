import { Link } from "react-router-dom"
import { Globe, X as XIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const COMING_SOON_MSG = "Coming soon to the Obsidian ecosystem"

function PlaceholderLink({ label }: { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-sm text-muted-foreground/50 cursor-not-allowed select-none block">
          {label}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        className="bg-white/5 backdrop-blur-md border border-white/10 text-accent text-xs"
      >
        {COMING_SOON_MSG}
      </TooltipContent>
    </Tooltip>
  )
}

function SocialIcon({
  icon: Icon,
  label,
}: {
  icon: React.ElementType
  label: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="w-8 h-8 rounded-full glass-card border border-white/10 flex items-center justify-center text-muted-foreground/50 cursor-not-allowed"
          aria-label={label}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        className="bg-white/5 backdrop-blur-md border border-white/10 text-accent text-xs"
      >
        {COMING_SOON_MSG}
      </TooltipContent>
    </Tooltip>
  )
}

function ActiveLink({
  label,
  to,
  href,
}: {
  label: string
  to?: string
  href?: string
}) {
  const cls =
    "text-sm text-muted-foreground hover:text-foreground transition-colors block"
  if (to) return <Link to={to} className={cls}>{label}</Link>
  return <a href={href ?? "#"} className={cls}>{label}</a>
}

const columns = [
  {
    heading: "Services",
    items: [
      { label: "Ruxi Inbound",   active: true,  to: "/services/inbound" },
      { label: "Ruxi Outbound",  active: true,  to: "/services/outbound" },
      { label: "AI Web Agent",   active: true,  to: "/product/web-agent" },
      { label: "UX / UI Design", active: true,  to: "/services/design" },
      { label: "All services",   active: true,  to: "/services" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About us",   active: true,  href: "#about" },
      { label: "Legal",      active: true,  to: "/legal" },
      { label: "Compliance", active: true,  to: "/compliance" },
      { label: "Contact",    active: true,  href: "mailto:pranav@pruxin.com" },
      { label: "Careers",    active: false },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Blog",            active: false },
      { label: "Podcasts",        active: true,  to: "/podcasts" },
      { label: "Compliance Guide",active: true,  to: "/compliance" },
      { label: "Documentation",   active: false },
    ],
  },
  {
    heading: "Partner",
    items: [
      { label: "Agencies",   active: false },
      { label: "Affiliates", active: false },
    ],
  },
]

function handleCookiePreferences() {
  try {
    ;(window as any).revisitCkyConsent?.()
  } catch {
    // CookieYes not loaded — silent fail
  }
}

export function Footer() {
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <TooltipProvider delayDuration={200}>
      <footer className="border-t border-white/8 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Main layout: logo col + 4 nav cols */}
          <div className="grid grid-cols-2 lg:grid-cols-[200px_1fr_1fr_1fr_1fr] gap-8 lg:gap-10">
            {/* Left: logo, tagline, social, copyright */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-5">
              <img
                src={
                  isLight
                    ? "/Pruxin_logo_DARK copy.svg"
                    : "/Pruxin_logo_LIGHT copy.svg"
                }
                alt="PRUXIN"
                className="h-7 w-auto"
              />

              <div className="flex items-center gap-2 mt-1">
                <SocialIcon icon={Globe}  label="LinkedIn" />
                <SocialIcon icon={XIcon}  label="X / Twitter" />
              </div>

              <p className="text-xs text-muted-foreground">
                © 2026 PRUXIN. All rights reserved.
              </p>
            </div>

            {/* Right: 4 nav columns */}
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">
                  {col.heading}
                </p>
                <ul className="space-y-3.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      {item.active ? (
                        <ActiveLink
                          label={item.label}
                          to={"to" in item ? item.to : undefined}
                          href={"href" in item ? item.href : undefined}
                        />
                      ) : (
                        <PlaceholderLink label={item.label} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar — single legal link + Cookie Preferences */}
          <div className="mt-12 pt-6 border-t border-white/8 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-muted-foreground">
            <p>PRUXIN Ltd — Registered in Scotland.</p>
            <div className="flex flex-wrap gap-5 justify-center">
              <Link to="/legal" className="hover:text-foreground transition-colors">
                Legal &amp; Compliance
              </Link>
              <button
                id="cky-btn"
                onClick={handleCookiePreferences}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  )
}
