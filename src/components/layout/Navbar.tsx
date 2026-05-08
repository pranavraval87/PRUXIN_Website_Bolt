import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Link, useLocation } from "react-router-dom"

const navLinks = [
  { label: "Features", to: "/features" },
  { label: "Pricing",  to: "/#calculator" },
  { label: "Podcasts", to: "/podcasts" },
  { label: "Legal",    to: "/legal" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === "light"
  const { pathname } = useLocation()

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 glass-nav")}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={isLight ? "/Pruxin_logo_DARK copy.svg" : "/Pruxin_logo_LIGHT copy.svg"}
            alt="PRUXIN"
            className="h-7 w-auto transition-opacity duration-200 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const routePath = link.to.split("#")[0] || "/"
            const isActive = pathname === routePath && routePath !== "/"
            return (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors duration-200 rounded-md",
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
          <span className="text-sm text-muted-foreground cursor-not-allowed opacity-60">
            Check my calls
          </span>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue transition-all duration-300 font-medium rounded-full"
            asChild
          >
            <Link to="/">Build my Ruxi now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-white/8">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-white/8 flex flex-col gap-2">
              <Button className="bg-primary text-primary-foreground w-full font-medium rounded-full" asChild>
                <Link to="/" onClick={() => setMobileOpen(false)}>Build my Ruxi now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
