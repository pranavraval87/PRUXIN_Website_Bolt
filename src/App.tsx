import { useRef } from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { RootLayout } from "@/components/layout/RootLayout"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { HeroSection } from "@/components/sections/HeroSection"
import { AudioSection } from "@/components/sections/AudioSection"
import { IndustryGrid } from "@/components/sections/IndustryGrid"
import { PainSection } from "@/components/sections/PainSection"
import { DashboardPreview } from "@/components/sections/DashboardPreview"
import { RuxiLiveCard } from "@/components/sections/RuxiLiveCard"
import { Process } from "@/components/sections/Process"
import { Walkthrough } from "@/components/sections/Walkthrough"
import { TrustSection } from "@/components/sections/TrustSection"
import { PodcastSection } from "@/components/sections/PodcastSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { IndustryPage } from "@/pages/IndustryPage"
import { LegalPage } from "@/pages/LegalPage"
import { WebAgentPage } from "@/pages/WebAgentPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { OfflineBanner } from "@/components/errors/OfflineBanner"
import { useScrollDepth } from "@/hooks/useScrollDepth"

function HomePage() {
  const mainRef = useRef<HTMLElement | null>(null)
  useScrollDepth(mainRef)

  return (
    <RootLayout mainRef={mainRef}>
      <ErrorBoundary section="HeroSection" inline>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary section="AudioSection" inline>
        <AudioSection />
      </ErrorBoundary>
      <ErrorBoundary section="IndustryGrid" inline>
        <IndustryGrid />
      </ErrorBoundary>
      <ErrorBoundary section="PainSection" inline>
        <PainSection />
      </ErrorBoundary>
      <ErrorBoundary section="DashboardPreview" inline>
        <DashboardPreview />
      </ErrorBoundary>
      <ErrorBoundary section="RuxiLiveCard" inline>
        <RuxiLiveCard />
      </ErrorBoundary>
      <ErrorBoundary section="Process" inline>
        <Process />
      </ErrorBoundary>
      <ErrorBoundary section="Walkthrough" inline>
        <Walkthrough />
      </ErrorBoundary>
      <ErrorBoundary section="TrustSection" inline>
        <TrustSection />
      </ErrorBoundary>
      <ErrorBoundary section="PodcastSection" inline>
        <PodcastSection />
      </ErrorBoundary>
      <ErrorBoundary section="PricingSection" inline>
        <PricingSection />
      </ErrorBoundary>
      <ErrorBoundary section="FinalCTA" inline>
        <FinalCTA />
      </ErrorBoundary>
    </RootLayout>
  )
}

export function App() {
  return (
    <>
      <OfflineBanner />
      <ErrorBoundary section="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/industries/:slug" element={
            <ErrorBoundary section="IndustryPage">
              <IndustryPage />
            </ErrorBoundary>
          } />
          <Route path="/legal" element={
            <ErrorBoundary section="LegalPage">
              <LegalPage />
            </ErrorBoundary>
          } />
          <Route path="/legal/:section" element={
            <ErrorBoundary section="LegalPage">
              <LegalPage />
            </ErrorBoundary>
          } />
          <Route path="/product/web-agent" element={
            <ErrorBoundary section="WebAgentPage">
              <WebAgentPage />
            </ErrorBoundary>
          } />
          <Route path="*" element={
            <ErrorBoundary section="NotFoundPage">
              <NotFoundPage />
            </ErrorBoundary>
          } />
        </Routes>
      </ErrorBoundary>
      <Toaster position="bottom-right" richColors />
    </>
  )
}

export default App
