import { useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Music2, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RootLayout } from "@/components/layout/RootLayout"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { Link } from "react-router-dom"

const SPOTIFY_SHOW_ID = "7JyafgYs0C5CXZTGksngVe"
const SPOTIFY_SHOW_URL = `https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`

interface Episode {
  id: string
  episodeNum: number
  title: string
  shortTitle: string
  description: string
  date: string
  duration: string
  spotifyId: string
}

const episodes: Episode[] = [
  {
    id: "ep7",
    episodeNum: 7,
    title: "PRUXIN Ep 7: Support Tickets Are Design Feedback",
    shortTitle: "Support Tickets Are Design Feedback",
    description:
      "Your support team answers the same questions every day. That's not a user problem — it's a design problem. Every support ticket is usability research delivered to your inbox for free.",
    date: "Mar 13",
    duration: "22 min",
    spotifyId: "6u95gtnMkaiC65qqnT7tXE",
  },
  {
    id: "ep6",
    episodeNum: 6,
    title: "PRUXIN Ep 6: More Features, More Problems",
    shortTitle: "More Features, More Problems",
    description:
      "Your product started simple. Users loved it. Then features piled up. Every feature you add makes your product harder to use. Here's why adding more often means delivering less.",
    date: "Mar 11",
    duration: "11 min",
    spotifyId: "3LNc4NXVDxnDrRRjGC1n1Y",
  },
  {
    id: "ep5",
    episodeNum: 5,
    title: "PRUXIN Ep 5: What Does This Button Do?",
    shortTitle: "What Does This Button Do?",
    description:
      "\"Submit\" — submit what? \"Continue\" — continue where? Vague CTAs create uncertainty. Uncertainty kills conversions. Simple label changes lift conversions 20–40%.",
    date: "Mar 11",
    duration: "12 min",
    spotifyId: "0Yw9Ke63BaqtbAnbIh3t4W",
  },
  {
    id: "ep4",
    episodeNum: 4,
    title: "PRUXIN Ep 4: Dashboards That Overwhelm",
    shortTitle: "Dashboards That Overwhelm",
    description:
      "Your dashboard shows everything. Your users see nothing. Most dashboards are data dumps, not decision tools. A simple hierarchy fix raised task completion by 40%.",
    date: "Feb 23",
    duration: "10 min",
    spotifyId: "17qeAiU3Vz8ayjeOR8kwSp",
  },
  {
    id: "ep3",
    episodeNum: 3,
    title: "PRUXIN Ep 3: Your Onboarding Is Losing Users",
    shortTitle: "Your Onboarding Is Losing Users",
    description:
      "Most products lose 40–60% of users during onboarding — not to competitors, but to confusion. The First Win framework turned 62% drop-off into 78% completion.",
    date: "Feb 19",
    duration: "14 min",
    spotifyId: "1AJJsxuynG1qEBCx5VIh1N",
  },
  {
    id: "ep2",
    episodeNum: 2,
    title: "PRUXIN Ep 2: The Paradox of Options",
    shortTitle: "The Paradox of Options",
    description:
      "More options should mean more value, right? Wrong. Too many choices lead to fewer conversions. A pricing page fix that reduced options increased conversions by 34%.",
    date: "Feb 17",
    duration: "15 min",
    spotifyId: "6MuGVglq7K8lpcWoO3UMy5",
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

function EpisodeArtwork({ episodeNum }: { episodeNum: number }) {
  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0B1020] border border-white/10 flex-shrink-0">
      {/* Show artwork — matches the real Spotify art: black bg, PRUXIN logo + tagline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3">
        <div className="text-center">
          <p className="text-white font-black text-2xl tracking-widest leading-none">PRUXIN</p>
          <div className="w-full h-px bg-white/30 my-1.5" />
          <p className="text-white/60 text-[8px] tracking-[0.2em] uppercase font-medium">Clarity in Every Click</p>
        </div>
      </div>
      {/* Episode number badge */}
      <div className="absolute bottom-2 right-2 bg-accent/20 border border-accent/30 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
        <span className="text-accent text-[10px] font-bold tracking-wide">EP {episodeNum}</span>
      </div>
    </div>
  )
}

export function PodcastsPage() {
  const mainRef = useRef<HTMLElement | null>(null)
  const [activeEpisodeId, setActiveEpisodeId] = useState<string | null>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  const activeEpisode = episodes.find(e => e.spotifyId === activeEpisodeId) ?? null

  const embedSrc = activeEpisode
    ? `https://open.spotify.com/embed/episode/${activeEpisode.spotifyId}?utm_source=generator&theme=0&autoplay=1`
    : `https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator&theme=0&t=0`

  function handlePlay(ep: Episode) {
    setActiveEpisodeId(ep.spotifyId)
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }

  return (
    <RootLayout mainRef={mainRef}>
      {/* ── Hero ── */}
      <section aria-labelledby="podcast-hero-heading" className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8">
            <Music2 aria-hidden="true" className="w-3.5 h-3.5" />
            The PRUXIN Podcast
          </div>
          <h1 id="podcast-hero-heading" className="text-5xl sm:text-6xl font-bold tracking-tight text-balance mb-6">
            Clarity in Every Click
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
            Why digital products confuse users — and how to fix it.
            One UX problem, one episode at a time, by Pranav Raval.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent gap-2"
            asChild
          >
            <a href={SPOTIFY_SHOW_URL} target="_blank" rel="noopener noreferrer">
              <Music2 aria-hidden="true" className="w-4 h-4" />
              Follow on Spotify
              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 opacity-60" />
            </a>
          </Button>
        </div>
      </section>

      {/* ── Featured player ── */}
      <section aria-label={activeEpisode ? `Now playing: ${activeEpisode.shortTitle}` : "Latest show"} className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div ref={playerRef} className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
              {activeEpisode ? `Now playing · Ep ${activeEpisode.episodeNum}` : "Latest show"}
            </p>
            {activeEpisode && (
              <p className="text-sm font-medium text-foreground mb-4 leading-snug">
                {activeEpisode.shortTitle}
              </p>
            )}
            <iframe
              key={activeEpisodeId ?? "show"}
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src={embedSrc}
              width="100%"
              height="152"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={activeEpisode ? activeEpisode.title : "Clarity in Every Click on Spotify"}
            />
          </div>
        </div>
      </section>

      {/* ── Episode grid ── */}
      <section aria-labelledby="episodes-heading" className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 id="episodes-heading" className="text-2xl font-bold tracking-tight">All Episodes</h2>
            <a
              href={SPOTIFY_SHOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
            >
              View on Spotify
              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
            </a>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {episodes.map((ep) => {
              const isActive = activeEpisodeId === ep.spotifyId
              return (
                <motion.article
                  key={ep.id}
                  variants={cardVariants}
                  className={`glass-card rounded-2xl border transition-all duration-200 p-5 flex flex-col gap-4 group ${
                    isActive
                      ? "border-accent/40 glow-cyan"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Artwork */}
                  <EpisodeArtwork episodeNum={ep.episodeNum} />

                  {/* Meta */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{ep.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ep.duration}</span>
                    </div>
                    <h3 className={`text-sm font-semibold leading-snug transition-colors ${isActive ? "text-accent" : "text-foreground group-hover:text-accent"}`}>
                      {ep.shortTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {ep.description}
                    </p>
                  </div>

                  {/* Play button */}
                  <button
                    type="button"
                    onClick={() => handlePlay(ep)}
                    aria-label={isActive ? `Now playing: ${ep.shortTitle}` : `Play episode: ${ep.shortTitle}`}
                    aria-pressed={isActive}
                    className={`w-full rounded-full py-2.5 text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-2 ${
                      isActive
                        ? "bg-accent/15 border-accent/40 text-accent"
                        : "glass-card border-white/15 text-muted-foreground hover:border-accent/40 hover:text-accent"
                    }`}
                  >
                    <svg aria-hidden="true" className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
                      <path d="M3 2.5a.5.5 0 0 1 .5-.5h0a.5.5 0 0 1 .25.068l9 5.5a.5.5 0 0 1 0 .864l-9 5.5A.5.5 0 0 1 3 13.5v-11z" />
                    </svg>
                    {isActive ? "Playing" : "Play episode"}
                  </button>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="pb-16" aria-labelledby="podcast-cta-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-2xl border border-white/10 p-10 text-center">
            <h2 id="podcast-cta-heading" className="text-2xl font-bold mb-3 gradient-text">
              Ready to stop missing calls?
            </h2>
            <p className="text-muted-foreground mb-6">
              Build your Ruxi in 10 minutes. No credit card required.
            </p>
            <Button size="lg" className="rounded-full glow-blue gap-2" asChild>
              <Link to="/onboarding">
                Build my Ruxi now
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
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
