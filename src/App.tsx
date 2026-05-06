import { RootLayout } from "@/components/layout/RootLayout"
import { HeroSection } from "@/components/sections/HeroSection"
import { AudioSection } from "@/components/sections/AudioSection"

export function App() {
  return (
    <RootLayout>
      <HeroSection />
      <AudioSection />
    </RootLayout>
  )
}

export default App
