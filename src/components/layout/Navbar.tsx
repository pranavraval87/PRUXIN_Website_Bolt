import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme } = useTheme()
  const isLight = theme === "light"

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 glass-nav")}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img
            src={isLight ? "/Pruxin_logo_DARK copy.svg" : "/Pruxin_logo_LIGHT copy.svg"}
            alt="PRUXIN"
            className="h-7 w-auto transition-opacity duration-200 group-hover:opacity-80"
          />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sign in
          </a>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue transition-all duration-300 font-medium"
          >
            Get Started
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
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/8 flex flex-col gap-2">
              <a
                href="#login"
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </a>
              <Button className="bg-primary text-primary-foreground w-full font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
