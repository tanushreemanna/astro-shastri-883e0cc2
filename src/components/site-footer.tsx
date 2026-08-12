import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-lg tracking-[0.32em] uppercase">ASTRO SHASTRI</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A calm, modern place to read the sky — birth charts, horoscopes and the beginnings of a
            personal astrology practice.
          </p>
        </div>
        <div className="flex gap-14 text-sm">
          <div className="space-y-3">
            <p className="eyebrow">Explore</p>
            <Link to="/horoscope" className="block text-muted-foreground hover:text-foreground">
              Horoscope
            </Link>
            <Link to="/birth-chart" className="block text-muted-foreground hover:text-foreground">
              Birth Chart
            </Link>
          </div>
          <div className="space-y-3">
            <p className="eyebrow">Soon</p>
            <span className="block text-muted-foreground/60">Astrologers</span>
            <span className="block text-muted-foreground/60">Astrology Store</span>
          </div>
        </div>
        <p className="self-end text-xs leading-relaxed text-muted-foreground/70">
          Chart and horoscope content shown here is illustrative placeholder content for this early
          version, not a calculated astrological reading.
        </p>
      </div>
    </footer>
  );
}
