import { Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PodcastSection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-6">
            <Music2 className="w-3.5 h-3.5" />
            The Ruxi Podcast
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance mb-4">
            Marketplace Insights:{" "}
            <span className="gradient-text">The Ruxi Podcast</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conversations with founders, operators, and growth leaders on what
            it takes to win in 2026.
          </p>
        </div>

        {/* Spotify embed card */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 max-w-3xl mx-auto mb-10">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/show/7JyafgYs0C5CXZTGksngVe?utm_source=generator&theme=0&t=0"
            width="100%"
            height="152"
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="The Ruxi Podcast on Spotify"
          />
          <p className="text-xs text-muted-foreground mt-4 text-center">
            New episodes every week — subscribe so you never miss one.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/15 hover:border-accent/40 hover:text-accent transition-all gap-2"
            asChild
          >
            <a
              href="https://open.spotify.com/show/7JyafgYs0C5CXZTGksngVe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Music2 className="w-4 h-4" />
              Listen on Spotify
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
