import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface RootLayoutProps {
  children: React.ReactNode
  mainRef?: React.RefObject<HTMLElement | null>
}

export function RootLayout({ children, mainRef }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip navigation — visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" ref={mainRef} className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
