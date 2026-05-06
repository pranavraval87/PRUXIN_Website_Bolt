import { useRef } from "react"
import { Routes, Route } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { HeroSection } from "@/components/sections/HeroSection"
import { AudioSection } from "@/components/sections/AudioSection"
import { IndustryGrid } from "@/components/sections/IndustryGrid"
import { PainSection } from "@/components/sections/PainSection"
import { DashboardPreview } from "@/components/sections/DashboardPreview"
import { RuxiLiveCard } from "@/components/sections/RuxiLiveCard"
import { Process } from "@/components/sections/Process"
import { TrustSection } from "@/components/sections/TrustSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { IndustryPage } from "@/pages/IndustryPage"
import { useScrollDepth } from "@/hooks/useScrollDepth"

function HomePage() {
  const mainRef = useRef<HTMLElement | null>(null)
  useScrollDepth(mainRef)

  return (
    <RootLayout mainRef={mainRef}>
      <HeroSection />
      <AudioSection />
      <IndustryGrid />
      <PainSection />
      <DashboardPreview />
      <RuxiLiveCard />
      <Process />
      <TrustSection />
      <PricingSection />
      <FinalCTA />
    </RootLayout>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/industries/:slug" element={<IndustryPage />} />
    </Routes>
  )
}

export default App
