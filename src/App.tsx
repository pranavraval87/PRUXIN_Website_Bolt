import { RootLayout } from "@/components/layout/RootLayout"
import { HeroSection } from "@/components/sections/HeroSection"
import { AudioSection } from "@/components/sections/AudioSection"
import { IndustryGrid } from "@/components/sections/IndustryGrid"
import { PainSection } from "@/components/sections/PainSection"
import { DashboardPreview } from "@/components/sections/DashboardPreview"
import { Process } from "@/components/sections/Process"
import { TrustSection } from "@/components/sections/TrustSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCTA } from "@/components/sections/FinalCTA"

export function App() {
  return (
    <RootLayout>
      <HeroSection />
      <AudioSection />
      <IndustryGrid />
      <PainSection />
      <DashboardPreview />
      <Process />
      <TrustSection />
      <PricingSection />
      <FinalCTA />
    </RootLayout>
  )
}

export default App
