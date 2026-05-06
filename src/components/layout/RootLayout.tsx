import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface RootLayoutProps {
  children: React.ReactNode
  mainRef?: React.RefObject<HTMLElement | null>
}

export function RootLayout({ children, mainRef }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main ref={mainRef} className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
