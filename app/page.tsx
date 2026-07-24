import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/sections/hero-section"
import { NarrativeSection } from "@/components/sections/narrative-section"
import { ProblemSection } from "@/components/sections/problem-section"
import { RevelationSection } from "@/components/sections/revelation-section"
import { SolutionSection } from "@/components/sections/solution-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { SocialProofSection } from "@/components/sections/social-proof-section"
import { OfferSection } from "@/components/sections/offer-section"
import { GuaranteeSection } from "@/components/sections/guarantee-section"
import { FinalCtaSection } from "@/components/sections/final-cta-section"

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <NarrativeSection />
        <ProblemSection />
        <RevelationSection />
        <SolutionSection />
        <HowItWorksSection />
        <SocialProofSection />
        <OfferSection />
        <GuaranteeSection />
        <FinalCtaSection />
      </main>
    </>
  )
}
