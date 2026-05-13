import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown, Phone, Radio, Globe, Palette, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Phone,
    label: "Inbound Calling",
    description: "Answer every call, 24/7",
    to: "/services/inbound",
  },
  {
    icon: Radio,
    label: "Outbound Calling",
    description: "Compliant AI outreach at scale",
    to: "/services/outbound",
  },
  {
    icon: Globe,
    label: "AI Web Agent",
    description: "Intelligence layer for your website",
    to: "/product/web-agent",
    badge: "Coming Soon",
  },
  {
    icon: Palette,
    label: "UX / UI Design",
    description: "Product design & clarity consulting",
    to: "/services/design",
    subtle: true,
  },
]

const topLinks = [
  { label: "Pricing", to: "/#calculator" },
  { label: "Podcasts", to: "/podcasts" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === "light"
  const { pathname } = useLocation()

  return (
    <TooltipProvider delayDuration={200}>
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center group shrink-0">
          <img
            src={isLight ? "/Pruxin_logo_DARK copy.svg" : "/Pruxin_logo_LIGHT copy.svg"}
            alt="PRUXIN"
            className="h-7 w-auto transition-opacity duration-200 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">

          {/* Ruxi — single product link */}
          <Link
            to="/"
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 text-sm transition-colors duration-200 rounded-md",
              pathname === "/"
                ? "text-foreground bg-white/8"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <Zap aria-hidden="true" className="w-3.5 h-3.5 text-accent" />
            Ruxi
          </Link>

          {/* Services dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-haspopup="menu"
                className={cn(
                  "inline-flex items-center gap-1 px-4 py-2 text-sm transition-colors duration-200 rounded-md outline-none select-none",
                  "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  "data-[state=open]:text-foreground data-[state=open]:bg-white/8"
                )}
              >
                Services
                <ChevronDown aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={8}
              className="w-72 bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl"
            >
              {services.map((svc) => (
                <DropdownMenuItem key={svc.label} asChild className="rounded-xl p-0 focus:bg-transparent">
                  <Link
                    to={svc.to}
                    className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors duration-150 cursor-pointer group/item"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                      svc.subtle
                        ? "bg-muted/30 border-white/8 group-hover/item:bg-muted/50"
                        : "bg-accent/10 border-accent/15 group-hover/item:bg-accent/20"
                    )}>
                      <svc.icon aria-hidden="true" className={cn("w-4 h-4", svc.subtle ? "text-muted-foreground" : "text-accent")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-medium", svc.subtle ? "text-muted-foreground" : "text-foreground")}>
                          {svc.label}
                        </span>
                        {svc.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-accent/25 text-accent/80 leading-none">
                            {svc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{svc.description}</p>
                    </div>
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-1 transition-transform duration-150 group-hover/item:translate-x-0.5 group-hover/item:text-accent/60" />
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-white/8 my-1" />
              <DropdownMenuItem asChild className="rounded-xl p-0 focus:bg-transparent">
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-xs text-muted-foreground hover:text-foreground"
                >
                  View all services
                  <ArrowRight aria-hidden="true" className="w-3 h-3 ml-auto" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Flat links */}
          {topLinks.map((link) => {
            const routePath = link.to.split("#")[0] || "/"
            const isActive = pathname === routePath && routePath !== "/"
            return (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "px-4 py-2 text-sm transition-colors duration-200 rounded-md",
                  isActive
                    ? "text-foreground bg-white/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                role="button"
                aria-disabled="true"
                aria-label="Check my calls — coming in Phase 2"
                tabIndex={0}
                className="text-sm text-muted-foreground/50 cursor-not-allowed select-none"
              >
                Check my calls
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={6}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-accent text-xs"
            >
              Coming in Phase 2
            </TooltipContent>
          </Tooltip>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue transition-all duration-300 font-medium rounded-full"
            asChild
          >
            <Link to="/onboarding">Build my Ruxi now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X aria-hidden="true" className="w-5 h-5" /> : <Menu aria-hidden="true" className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden glass-nav border-t border-white/8" role="navigation" aria-label="Mobile navigation">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">

            {/* Ruxi link */}
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              <Zap aria-hidden="true" className="w-3.5 h-3.5 text-accent" />
              Ruxi
            </Link>

            {/* Services accordion */}
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-menu"
              className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5 w-full text-left"
            >
              Services
              <ChevronDown aria-hidden="true" className={cn("w-4 h-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
            </button>
            {mobileServicesOpen && (
              <div id="mobile-services-menu" className="ml-4 flex flex-col gap-0.5 mb-1">
                {services.map((svc) => (
                  <Link
                    key={svc.label}
                    to={svc.to}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-md hover:bg-white/5",
                      svc.subtle ? "text-muted-foreground/70 hover:text-muted-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <svc.icon aria-hidden="true" className={cn("w-4 h-4", svc.subtle ? "text-muted-foreground/50" : "text-accent/70")} />
                    {svc.label}
                    {svc.badge && (
                      <span className="ml-auto text-[10px] text-accent/70 border border-accent/25 rounded-full px-1.5 py-0.5 leading-none">{svc.badge}</span>
                    )}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  View all services →
                </Link>
              </div>
            )}

            {topLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-white/8">
              <Button className="bg-primary text-primary-foreground w-full font-medium rounded-full" asChild>
                <Link to="/onboarding" onClick={() => setMobileOpen(false)}>Build my Ruxi now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
    </TooltipProvider>
  )
}
