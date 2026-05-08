import { useRef } from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { RootLayout } from "@/components/layout/RootLayout"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { HeroSection } from "@/components/sections/HeroSection"
import { ReplacementCalculator } from "@/components/sections/ReplacementCalculator"
import { Process } from "@/components/sections/Process"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { IndustryPage } from "@/pages/IndustryPage"
import { LegalPage } from "@/pages/LegalPage"
import { WebAgentPage } from "@/pages/WebAgentPage"
import { PodcastsPage } from "@/pages/PodcastsPage"
import { FeaturesPage } from "@/pages/FeaturesPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { OfflineBanner } from "@/components/errors/OfflineBanner"
import { useScrollDepth } from "@/hooks/useScrollDepth"

// ── Simplified "Rome" homepage ────────────────────────────────────────────────
// Four sections only: Hero (problem/promise) → Calculator (£30k+ value)
// → Process (the Sausage Factory) → FinalCTA (the Brass Ball Guarantee)
function HomePage() {
  const mainRef = useRef<HTMLElement | null>(null)
  useScrollDepth(mainRef)

  return (
    <RootLayout mainRef={mainRef}>
      <ErrorBoundary section="HeroSection" inline>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary section="ReplacementCalculator" inline>
        <ReplacementCalculator />
      </ErrorBoundary>
      <ErrorBoundary section="Process" inline>
        <Process />
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
          <Route path="/features" element={
            <ErrorBoundary section="FeaturesPage">
              <FeaturesPage />
            </ErrorBoundary>
          } />
          <Route path="/podcasts" element={
            <ErrorBoundary section="PodcastsPage">
              <PodcastsPage />
            </ErrorBoundary>
          } />
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
