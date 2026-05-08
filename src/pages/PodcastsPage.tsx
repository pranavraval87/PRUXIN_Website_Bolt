import { useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Music2, Play, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"

const SPOTIFY_SHOW_ID = "7JyafgYs0C5CXZTGksngVe"
const SPOTIFY_SHOW_URL = `https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`

const episodes = [
  {
    id: 1,
    title: "How UK SMEs Are Losing £30k+ a Year to Voicemail",
    description:
      "We break down the missed-call crisis hitting UK small businesses and the simple systems that eliminate it.",
    duration: "34 min",
    date: "May 2026",
    spotifyEpisodeId: null,
  },
  {
    id: 2,
    title: "The AI Receptionist Playbook: What Actually Works",
    description:
      "Real operators share exactly how they deployed AI voice agents without losing the human touch.",
    duration: "41 min",
    date: "Apr 2026",
    spotifyEpisodeId: null,
  },
  {
    id: 3,
    title: "GDPR, AI, and the Phone: What Every UK Business Must Know",
    description:
      "A plain-English guide to the legal side of AI voice — ICO registration, consent, and data retention.",
    duration: "28 min",
    date: "Apr 2026",
    spotifyEpisodeId: null,
  },
  {
    id: 4,
    title: "From First Call to Loyal Customer: Booking Automation Deep Dive",
    description:
      "How to wire Ruxi to your calendar, CRM, and payment stack so every call converts.",
    duration: "38 min",
    date: "Mar 2026",
    spotifyEpisodeId: null,
  },
  {
    id: 5,
    title: "Building a One-Man Empire: The OEM Framework Explained",
    description:
      "The philosophy behind PRUXIN — simplicity as a strategic moat for solo operators and small teams.",
    duration: "52 min",
    date: "Mar 2026",
    spotifyEpisodeId: null,
  },
  {
    id: 6,
    title: "Outbound AI: The New Rules of Cold Calling",
    description:
      "What changed with the FCA and ICO regulations, and how compliant AI outbound still drives pipeline.",
    duration: "45 min",
    date: "Feb 2026",
    spotifyEpisodeId: null,
  },
]

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function PodcastsPage() {
  const mainRef = useRef<HTMLElement | null>(null)
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null)

  const embedSrc = activeEpisode
    ? `https://open.spotify.com/embed/episode/${activeEpisode}?utm_source=generator&theme=0`
    : `https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator&theme=0&t=0`

  return (
    <RootLayout mainRef={mainRef}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <Music2 className="w-3.5 h-3.5" />
            The Ruxi Podcast
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6">
            Marketplace Insights:{" "}
            <span className="gradient-text">The Ruxi Podcast</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Conversations with founders, operators, and growth leaders on what it
            takes to win in 2026. New episodes every week.
          </p>
          <Button variant="outline" size="lg" className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2" asChild>
            <a href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer">
              <Music2 className="w-4 h-4" />
              Follow on Spotify
            </a>
          </Button>
        </div>
      </section>

      {/* Featured player */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
              {activeEpisode ? "Now playing" : "Latest show"}
            </p>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src={embedSrc}
              width="100%"
              height="152"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="The Ruxi Podcast on Spotify"
            />
          </div>
        </div>
      </section>

      {/* Episode grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Recent Episodes</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {episodes.map((ep) => (
              <motion.article
                key={ep.id}
                variants={cardVariants}
                className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col gap-4 group"
              >
                {/* Thumbnail placeholder */}
                <div className="w-full aspect-video rounded-xl bg-white/5 border border-white/8 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
                  <Music2 className="w-8 h-8 text-accent/40 relative z-10" />
                  <span className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ep.duration}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-2">{ep.date}</p>
                  <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
                    {ep.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {ep.description}
                  </p>
                </div>

                {/* CTA */}
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2 self-start text-xs"
                  onClick={() =>
                    ep.spotifyEpisodeId
                      ? setActiveEpisode(ep.spotifyEpisodeId as unknown as number)
                      : window.open(SPOTIFY_SHOW_URL, "_blank")
                  }
                >
                  <Play className="w-3 h-3" />
                  Listen Now
                </Button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA back to homepage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl border border-white/10 p-10 text-center">
            <h2 className="text-2xl font-bold mb-3 gradient-text">Ready to stop missing calls?</h2>
            <p className="text-muted-foreground mb-6">Build your Ruxi in 10 minutes. No credit card required.</p>
            <Button size="lg" className="rounded-full glow-blue gap-2" asChild>
              <a href="/">
                Build my Ruxi now
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ErrorBoundary section="FinalCTA" inline>
        <FinalCTA />
      </ErrorBoundary>
    </RootLayout>
  )
}
