import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, ExternalLink, CalendarDays, TriangleAlert as AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { legalSections } from "@/data/legalContent"
import { cn } from "@/lib/utils"

// ─── Placeholder content blocks ─────────────────────────────────────────────

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <p className="leading-7 text-muted-foreground">
        This document sets out the legally binding terms governing your use of the PRUXIN platform,
        associated services, and any related software provided by PRUXIN Ltd, a company registered
        in England and Wales.
      </p>
      <p className="leading-7 text-muted-foreground">
        By accessing or using PRUXIN you agree to be bound by the terms described herein. If you
        do not agree to all terms, you must not use the service. PRUXIN reserves the right to
        update these terms at any time; continued use of the service following notification of
        changes constitutes acceptance.
      </p>
      <div className="glass-card rounded-xl border border-white/10 p-5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Full document in preparation</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The complete {title} is currently being finalised by our legal team. It will be
            published here before PRUXIN enters general availability. If you require this document
            in advance — for procurement or compliance purposes — contact{" "}
            <a
              href="mailto:pranav@pruxin.com"
              className="text-accent hover:underline underline-offset-4"
            >
              pranav@pruxin.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Terms of Use ────────────────────────────────────────────────────────────

function TermsContent() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="leading-7 text-muted-foreground">
          These Terms of Use ("Terms") govern your access to and use of the PRUXIN platform,
          associated services, and any related software provided by PRUXIN Ltd ("PRUXIN", "we",
          "our"), a company registered in England and Wales. By accessing or using PRUXIN you
          agree to be bound by these Terms.
        </p>
        <p className="leading-7 text-muted-foreground">
          PRUXIN reserves the right to update these Terms at any time. Continued use of the service
          following notification of changes constitutes acceptance of the revised Terms.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          1. Permitted Use
        </h3>
        <p className="leading-7 text-muted-foreground">
          You may use the PRUXIN platform solely for lawful business purposes in connection with
          managing inbound telephone communications. You must not use the platform for any unlawful
          purpose, to transmit harmful content, or in violation of any applicable regulation
          including UK GDPR, PECR, or the Communications Act 2003.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          2. AI-Generated Responses — Accuracy Disclaimer
        </h3>
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-accent">AI Hallucination Disclaimer</span>
          </div>
          <p className="text-sm text-muted-foreground leading-[1.8]">
            Ruxi's spoken responses are generated in real time by large language model (LLM)
            infrastructure. While PRUXIN takes reasonable steps to configure and constrain the AI
            within a defined knowledge base, AI-generated responses may on occasion be inaccurate,
            incomplete, or inconsistent with the subscribing business's intent.
          </p>
          <p className="text-sm text-muted-foreground leading-[1.8]">
            <strong className="text-foreground">PRUXIN does not warrant the accuracy of any AI-generated
            response.</strong> Subscribing businesses are solely responsible for reviewing their
            configured knowledge base and for any commitments or representations made by Ruxi to
            callers. PRUXIN's liability in connection with AI-generated content is limited to the
            fees paid in the preceding 30-day billing period.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          3. Prepaid Wallet &amp; Billing
        </h3>
        <p className="leading-7 text-muted-foreground">
          PRUXIN operates on a prepaid credit model. Credits are purchased in advance and consumed
          as calls are handled by the platform.
        </p>
        <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground text-sm leading-7">
          <li>
            <strong className="text-foreground">Non-refundable:</strong> Prepaid credits are
            non-refundable once consumed. Unconsumed credits may be refunded at PRUXIN's sole
            discretion within 14 days of purchase if no calls have been processed.
          </li>
          <li>
            <strong className="text-foreground">Expiry:</strong> Prepaid credits expire 12 months
            from the date of purchase. Expired credits are forfeited with no refund or rollover.
          </li>
          <li>
            <strong className="text-foreground">Top-ups:</strong> Auto top-up rules, minimum balance
            thresholds, and notifications can be configured in your PRUXIN dashboard.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          4. Limitation of Liability
        </h3>
        <p className="leading-7 text-muted-foreground">
          To the fullest extent permitted by applicable law, PRUXIN's total liability to you for
          any claim arising under or in connection with these Terms shall not exceed the total fees
          paid by you in the 90 days preceding the claim. PRUXIN shall not be liable for any
          indirect, consequential, or special damages, loss of profits, or loss of business.
        </p>
      </div>

      <div className="glass-card rounded-xl border border-white/10 p-5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Full Terms in preparation</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The complete Terms of Use are being finalised by our legal team. For procurement or
            compliance purposes contact{" "}
            <a
              href="mailto:pranav@pruxin.com"
              className="text-accent hover:underline underline-offset-4"
            >
              pranav@pruxin.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Privacy Notice ──────────────────────────────────────────────────────────

function PrivacyContent() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="leading-7 text-muted-foreground">
          PRUXIN Ltd ("PRUXIN", "we", "our") is the data controller for personal data collected
          through this website and the PRUXIN platform. This Privacy Notice explains how we collect,
          use, store, and protect your personal data in accordance with the UK GDPR and the Data
          Protection Act 2018.
        </p>
        <p className="leading-7 text-muted-foreground">
          Our registered Data Protection Officer can be contacted at{" "}
          <a href="mailto:dpo@pruxin.co.uk" className="text-accent hover:underline underline-offset-4">
            dpo@pruxin.co.uk
          </a>
          . Our ICO registration reference is <span className="font-mono text-foreground">ZB######</span>.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          1. What Data We Collect
        </h3>
        <p className="leading-7 text-muted-foreground">
          We collect data you provide directly (name, email, business details during onboarding),
          data generated through your use of the platform (call logs, usage analytics, configuration
          preferences), and technical data (IP address, device type, browser) via cookies and server
          logs.
        </p>
        <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground text-sm leading-7">
          <li>Account and identity data: name, email address, job title</li>
          <li>Business data: company name, phone number, industry vertical</li>
          <li>Call metadata: timestamp, duration, outcome classification</li>
          <li>Voice data: audio recordings and AI-generated transcripts (see Section 5)</li>
          <li>Technical data: log data, cookies, analytics identifiers</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          2. Legal Basis for Processing
        </h3>
        <p className="leading-7 text-muted-foreground">
          We process your data under the following lawful bases: contract performance (to deliver
          the PRUXIN service), legitimate interests (fraud prevention, service improvement, security),
          legal obligation (tax records, regulatory compliance), and consent (marketing emails,
          optional analytics).
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          3. Retention
        </h3>
        <p className="leading-7 text-muted-foreground">
          Account data is retained for the duration of your subscription plus 12 months for audit
          purposes. Call metadata is retained for 24 months. Voice recordings and transcripts are
          subject to the retention rules described in Section 5.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          4. Your Rights
        </h3>
        <p className="leading-7 text-muted-foreground">
          You have the right to access, rectify, erase, restrict, port, and object to processing of
          your personal data. To exercise any right, submit a request to{" "}
          <a href="mailto:privacy@pruxin.co.uk" className="text-accent hover:underline underline-offset-4">
            privacy@pruxin.co.uk
          </a>
          . We will respond within 30 days. You also have the right to lodge a complaint with the
          ICO at{" "}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline underline-offset-4 inline-flex items-center gap-1"
          >
            ico.org.uk <ExternalLink className="w-3 h-3" />
          </a>
          .
        </p>
      </div>

      {/* 2026 AI Update callout */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <Badge
            variant="outline"
            className="border-accent/40 text-accent bg-accent/10 text-xs font-semibold tracking-wider uppercase"
          >
            2026 AI Update
          </Badge>
        </div>

        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          Section 5 — Voice Data & Dual AI Processing
        </h3>
        <p className="text-sm text-muted-foreground leading-[1.8]">
          As of 1 January 2026, PRUXIN processes caller voice data using large language model (LLM)
          infrastructure to deliver its AI receptionist service. This section is provided as a
          supplementary disclosure to address specific data protection obligations arising from
          AI-assisted voice processing.
        </p>

        <div className="space-y-5">
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              5.1 — Real-Time Voice Transcription
            </h4>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              When a caller contacts a PRUXIN-enabled business number, their voice is streamed in
              real time to PRUXIN's AI inference pipeline. Audio is converted to text via an
              automatic speech recognition (ASR) model. The resulting transcript is processed by a
              conversational AI model to generate a spoken response and capture caller intent.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              Audio recordings are retained for a maximum of <strong className="text-foreground">30 days</strong>{" "}
              unless the subscribing business has configured a shorter retention window in their
              PRUXIN dashboard. Transcripts are retained for <strong className="text-foreground">90 days</strong>{" "}
              by default and may be extended to 12 months by the subscribing business for audit
              and compliance purposes. Callers may request deletion of their recording at any time
              (see Section 5.3).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              5.2 — Dual-Processing Architecture
            </h4>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              PRUXIN operates as a <strong className="text-foreground">data processor</strong> under
              Article 28 UK GDPR. The subscribing business (e.g., the law firm, garage, or clinic
              using PRUXIN) is the <strong className="text-foreground">data controller</strong> and
              bears primary responsibility for informing callers that their call may be handled by
              an AI system.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              The AI intent classification layer assigns structured outcomes to each call (e.g.,
              "booking request", "enquiry", "complaint"). These classifications are derived solely
              from the content of the call and are not used to build persistent profiles about
              individual callers. Classification outputs are provided to the subscribing business
              via the PRUXIN dashboard and webhook notifications.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              PRUXIN does not sell, licence, or share call data or transcripts with third parties
              for any purpose other than providing the contracted service. Sub-processors (cloud
              infrastructure, ASR providers) are bound by equivalent data processing terms.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              5.3 — Caller Rights: Voice Record Deletion
            </h4>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              Callers who have interacted with a PRUXIN-powered number have the right to request
              deletion of their voice recording and associated transcript. Requests must be submitted
              to the subscribing business (the data controller), who is obligated to forward verifiable
              deletion requests to PRUXIN within 5 business days.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              Where a caller cannot identify the subscribing business, they may contact PRUXIN
              directly at{" "}
              <a href="mailto:pranav@pruxin.com" className="text-accent hover:underline underline-offset-4">
                pranav@pruxin.com
              </a>
              . PRUXIN will action confirmed deletion requests within <strong className="text-foreground">72 hours</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              5.4 — AI Model Disclosure
            </h4>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              PRUXIN's conversational AI and intent classification pipeline currently uses{" "}
              <strong className="text-foreground">GPT-4.1-mini</strong> (OpenAI) for natural language
              understanding and response generation, and{" "}
              <strong className="text-foreground">Deepgram</strong> for automatic speech recognition
              (ASR). Both providers act as sub-processors under contractual data processing terms
              consistent with UK GDPR Article 28 obligations.
            </p>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              Caller voice data, transcripts, and call metadata are used exclusively for inference —
              that is, to deliver the AI receptionist service in real time.{" "}
              <strong className="text-foreground">
                No caller data is used to train, fine-tune, or otherwise improve any AI model,
                including the models listed above.
              </strong>{" "}
              PRUXIN maintains contractual prohibitions against training use with all AI sub-processors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── DPA Content ─────────────────────────────────────────────────────────────

function DPAContent() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="leading-7 text-muted-foreground">
          This Data Processing Agreement ("DPA") forms part of the contract for services between
          PRUXIN Ltd ("PRUXIN", the <strong className="text-foreground">data processor</strong>) and
          each subscribing business (the <strong className="text-foreground">data controller</strong>).
          It governs the processing of personal data by PRUXIN on behalf of the controller in
          connection with the PRUXIN platform, in accordance with UK GDPR Article 28.
        </p>
        <p className="leading-7 text-muted-foreground">
          By activating a PRUXIN subscription the data controller confirms acceptance of this DPA.
          The most recent version of this DPA is always available at{" "}
          <Link to="/legal/dpa" className="text-accent hover:underline underline-offset-4">
            pruxin.io/legal/dpa
          </Link>
          .
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          1. Sub-Processors
        </h3>
        <p className="leading-7 text-muted-foreground">
          PRUXIN engages the following sub-processors to deliver the platform. Each sub-processor is
          bound by data processing terms that provide equivalent protections to this DPA.
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/3">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Sub-Processor</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Data Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/8">
                <td className="px-4 py-3 text-foreground font-medium">Vapi</td>
                <td className="px-4 py-3 text-muted-foreground">Voice orchestration — manages AI call flows, ASR routing, and real-time response synthesis</td>
                <td className="px-4 py-3 text-muted-foreground">US (AWS us-east-1)</td>
              </tr>
              <tr className="border-b border-white/8">
                <td className="px-4 py-3 text-foreground font-medium">Twilio</td>
                <td className="px-4 py-3 text-muted-foreground">PSTN/SIP telephony — inbound call termination and number provisioning for UK business numbers</td>
                <td className="px-4 py-3 text-muted-foreground">UK / EU</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground font-medium">Telnyx</td>
                <td className="px-4 py-3 text-muted-foreground">SIP trunking — fallback carrier for call routing redundancy and number portability</td>
                <td className="px-4 py-3 text-muted-foreground">UK / EU</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          PRUXIN will provide at least 14 days' notice of any material change to this sub-processor
          list by updating this page and notifying active subscribers by email.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
          2. Security Breach Notification
        </h3>
        <p className="leading-7 text-muted-foreground">
          In the event that PRUXIN becomes aware of a confirmed personal data breach affecting data
          processed under this DPA, PRUXIN will notify the relevant data controller{" "}
          <strong className="text-foreground">within 72 hours</strong> of discovery. Notification will
          be sent to the primary account email address and will include, to the extent known at the
          time: the nature of the breach, categories and approximate number of data subjects affected,
          likely consequences, and measures taken or proposed to address the breach.
        </p>
        <p className="leading-7 text-muted-foreground">
          The data controller retains responsibility for notifying the ICO and affected individuals
          as required under UK GDPR Articles 33 and 34. PRUXIN will provide reasonable assistance in
          meeting those obligations.
        </p>
      </div>

      <div className="glass-card rounded-xl border border-white/10 p-5 flex items-start gap-3">
        <span className="text-muted-foreground mt-0.5 shrink-0 text-lg">⚖</span>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Full DPA in preparation</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The complete, clause-by-clause Data Processing Agreement including Standard Contractual
            Clauses is being finalised. For procurement or compliance purposes contact{" "}
            <a
              href="mailto:pranav@pruxin.com"
              className="text-accent hover:underline underline-offset-4"
            >
              pranav@pruxin.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Cookie Policy ───────────────────────────────────────────────────────────

function CookieContent() {
  return <PlaceholderContent title="Cookie Policy" />
}

// ─── AI Transparency Disclosure ──────────────────────────────────────────────

function AITransparencyContent() {
  return <PlaceholderContent title="AI Transparency Disclosure" />
}

// ─── Content router ──────────────────────────────────────────────────────────

function SectionContent({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "terms":          return <TermsContent />
    case "privacy":        return <PrivacyContent />
    case "dpa":            return <DPAContent />
    case "cookies":        return <CookieContent />
    case "ai-transparency": return <AITransparencyContent />
    default:               return <PrivacyContent />
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function LegalPage() {
  const { section } = useParams<{ section?: string }>()
  const navigate = useNavigate()

  const validIds = legalSections.map((s) => s.id)
  const resolvedId = section && validIds.includes(section) ? section : "privacy"
  const [activeId, setActiveId] = useState(resolvedId)

  // Keep URL in sync when switching tabs
  const handleSelect = (id: string) => {
    setActiveId(id)
    navigate(`/legal/${id}`, { replace: true })
  }

  // Sync if URL changes externally (e.g., back/forward)
  useEffect(() => {
    if (section && validIds.includes(section)) {
      setActiveId(section)
    }
  }, [section])

  const activeSection = legalSections.find((s) => s.id === activeId)!

  return (
    <>
      <Helmet>
        <title>Legal — PRUXIN</title>
        <meta
          name="description"
          content="PRUXIN legal documents: Terms of Use, Privacy Notice, DPA, Cookie Policy, and AI Transparency Disclosure."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-0">
          {/* Page header */}
          <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
            {/* Trust Header */}
            <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge
                    variant="outline"
                    className="border-accent/40 text-accent bg-accent/10 text-xs font-semibold tracking-wider uppercase"
                  >
                    Verified Compliance
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/15 text-muted-foreground bg-white/5 text-xs"
                  >
                    UK GDPR
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/15 text-muted-foreground bg-white/5 text-xs"
                  >
                    ICO Registered
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/15 text-muted-foreground bg-white/5 text-xs"
                  >
                    PECR
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  PRUXIN Ltd is registered with the Information Commissioner's Office.{" "}
                  <span className="font-mono text-foreground/70">ICO Ref: ZB######</span>
                  {" "}— Registered in England &amp; Wales.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Documents reviewed May 2026</span>
              </div>
            </div>

            {/* Mobile nav — horizontal scrolling pill strip */}
            <div className="lg:hidden flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-hide">
              {legalSections.map((s) => {
                const Icon = s.icon
                const isActive = s.id === activeId
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-200 shrink-0",
                      isActive
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {s.label}
                  </button>
                )
              })}
            </div>

            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8 items-start">

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block sticky top-24 self-start">
                <div className="glass-card rounded-2xl border border-white/10 p-3">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase px-3 pt-1 pb-3">
                    Legal Documents
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {legalSections.map((s) => {
                      const Icon = s.icon
                      const isActive = s.id === activeId
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSelect(s.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left",
                            isActive
                              ? "bg-accent/10 text-accent border-l-2 border-accent pl-[10px]"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-l-2 border-transparent pl-[10px]"
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="leading-snug">{s.label}</span>
                        </button>
                      )
                    })}
                  </nav>

                  <Separator className="my-3 bg-white/8" />

                  <div className="px-3 pb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <CalendarDays className="w-3 h-3" />
                    <span>Last reviewed: May 2026</span>
                  </div>
                </div>
              </aside>

              {/* Content pane */}
              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeId}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      opacity: { duration: 0.2 },
                    }}
                    className="max-w-3xl"
                  >
                    {/* Section header */}
                    <div className="mb-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                          {(() => {
                            const Icon = activeSection.icon
                            return <Icon className="w-4.5 h-4.5 text-accent" />
                          })()}
                        </div>
                        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight text-foreground">
                          {activeSection.label}
                        </h1>
                        {activeSection.placeholder && (
                          <Badge
                            variant="outline"
                            className="border-white/15 text-muted-foreground bg-white/5 text-xs"
                          >
                            Draft
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Last reviewed: {activeSection.lastReviewed}</span>
                        {activeSection.id === "privacy" && (
                          <>
                            <span className="text-white/20">·</span>
                            <span className="text-accent font-medium">Includes 2026 AI Update</span>
                          </>
                        )}
                      </div>
                      <Separator className="mt-5 bg-white/8" />
                    </div>

                    {/* Document body */}
                    <SectionContent sectionId={activeId} />

                    {/* Contact footer */}
                    <div className="mt-12 pt-8 border-t border-white/8">
                      <p className="text-sm text-muted-foreground">
                        Questions about this document?{" "}
                        <a
                          href="mailto:pranav@pruxin.com"
                          className="text-accent hover:underline underline-offset-4"
                        >
                          pranav@pruxin.com
                        </a>
                        {" "}or{" "}
                        <Link
                          to="/legal/dpa"
                          className="text-accent hover:underline underline-offset-4"
                          onClick={() => handleSelect("dpa")}
                        >
                          review our DPA
                        </Link>
                        .
                      </p>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
