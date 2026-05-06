import { Link } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Tooltip styling for placeholder links ───────────────────────────────────

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

function ActiveLink({
  label,
  to,
  href,
}: {
  label: string
  to?: string
  href?: string
}) {
  const cls = "text-sm text-muted-foreground hover:text-foreground transition-colors block"
  if (to) return <Link to={to} className={cls}>{label}</Link>
  return <a href={href ?? "#"} className={cls}>{label}</a>
}

// ─── Footer columns ───────────────────────────────────────────────────────────

const columns = [
  {
    heading: "Product",
    items: [
      { label: "Ruxi Inbound",   active: true,  href: "#product" },
      { label: "Ruxi Outbound",  active: true,  href: "#pricing" },
      { label: "AI Web Agent",   active: false },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Us",  active: true,  href: "#about" },
      { label: "Legal",     active: true,  to: "/legal" },
      { label: "Contact",   active: true,  href: "mailto:pranav@pruxin.com" },
      { label: "Careers",   active: false },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Blog",           active: false },
      { label: "Podcasts",       active: false },
      { label: "Documentation",  active: false },
    ],
  },
  {
    heading: "Partner",
    items: [
      { label: "Agencies",    active: false },
      { label: "Affiliates",  active: false },
    ],
  },
]

// ─── Cookie Preferences trigger ──────────────────────────────────────────────

function handleCookiePreferences() {
  try {
    ;(window as any).revisitCkyConsent?.()
  } catch {
    // CookieYes script not loaded — silent fail
  }
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <TooltipProvider delayDuration={200}>
      <footer className="border-t border-white/8 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* 4-column nav grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12 mb-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-3">
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

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <img
              src={isLight ? "/Pruxin_logo_DARK copy.svg" : "/Pruxin_logo_LIGHT copy.svg"}
              alt="PRUXIN"
              className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
            <p className="text-xs text-muted-foreground">
              © 2026 PRUXIN. All rights reserved. Registered in England &amp; Wales.
            </p>
            <div className="flex flex-wrap gap-5 text-xs text-muted-foreground justify-center">
              <Link to="/legal/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/legal/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/legal/dpa" className="hover:text-foreground transition-colors">
                GDPR
              </Link>
              <button
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
