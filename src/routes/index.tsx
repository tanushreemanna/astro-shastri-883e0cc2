import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroCelestial from "@/assets/hero-celestial.jpg";
import chartWheel from "@/assets/birth-chart-wheel.jpg";
import { Reveal } from "@/components/reveal";
import { BirthChartForm } from "@/components/birth-chart-form";
import { PERIODS, ZODIAC, type Period } from "@/lib/zodiac";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The stars have a story — Free Birth Chart & Horoscope" },
      {
        name: "description",
        content:
          "Explore your horoscope, discover your birth chart and begin your journey into astrology with a calm, modern reading of the sky.",
      },
      { property: "og:title", content: "The stars have a story. Discover yours." },
      {
        property: "og:description",
        content: "Free birth chart and daily horoscopes in a calm, modern astrology experience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <BeginWithYou />
      <FreeChartSection />
      <HoroscopeSection />
      <ExploreSection />
      <FinalCta />
    </>
  );
}

function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="night-gradient relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120vw,880px)] w-[min(120vw,880px)]"
        style={{
          transform: `translate(-50%, calc(-50% + ${offset * 0.08}px)) rotate(${offset * 0.015}deg)`,
        }}
      >
        <img
          src={heroCelestial}
          alt="Illustrated zodiac wheel with constellation lines and a crescent moon"
          width={1408}
          height={1408}
          className="h-full w-full object-cover opacity-70 mix-blend-screen"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,transparent,var(--background)_88%)]" />

      <div className="relative mx-auto w-full max-w-3xl px-6 py-32 text-center">
        <Reveal>
          <p className="eyebrow">Astrology, quietly modern</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.08] sm:text-6xl lg:text-7xl">
            The stars have a story.
            <span className="block italic text-gold">Discover yours.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore your horoscope, discover your birth chart and begin your journey into astrology.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/birth-chart"
              className="w-full rounded-full bg-gold px-8 py-4 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              Discover My Chart
            </Link>
            <Link
              to="/horoscope"
              className="w-full rounded-full border border-border px-8 py-4 text-xs tracking-[0.22em] text-foreground uppercase transition-colors hover:border-gold/60 hover:text-gold sm:w-auto"
            >
              Today's Horoscope
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BeginWithYou() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Chapter One</p>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">Begin With You</h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Astrology begins with the moment you were born. Your date, time and place create a unique
            celestial map — a snapshot of the sky at the beginning of your story.
          </p>
          <Link
            to="/birth-chart"
            className="mt-9 inline-block rounded-full border border-gold/50 px-8 py-3.5 text-xs tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Create My Free Birth Chart
          </Link>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="animate-soft-float mx-auto max-w-md">
            <img
              src={chartWheel}
              alt="Minimal illustrated natal chart wheel with aspect lines"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full rounded-full opacity-90 [box-shadow:var(--shadow-elegant)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FreeChartSection() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-center">
        <Reveal>
          <p className="eyebrow">Free Birth Chart</p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            What Were the Stars Saying When You Were Born?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Three quiet details — when, what time, and where. That is all it takes to begin mapping
            your chart.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <BirthChartForm />
        </Reveal>
      </div>
    </section>
  );
}

function HoroscopeSection() {
  const [period, setPeriod] = useState<Period>("today");

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Daily Guidance</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              What Do the Stars Have in Store Today?
            </h2>
          </div>
          <div className="flex gap-1 self-start rounded-full border border-border p-1 md:self-end">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={cn(
                  "rounded-full px-5 py-2 text-xs tracking-[0.16em] uppercase transition-colors",
                  period === p.key
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p.key === "week" ? "Weekly" : p.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-12">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-auto md:max-w-7xl md:grid md:grid-cols-3 md:overflow-visible md:px-8 lg:grid-cols-4">
          {ZODIAC.map((sign) => (
            <Link
              key={sign.slug}
              to="/horoscope"
              search={{ sign: sign.slug }}
              className="group w-[76vw] shrink-0 snap-start rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-gold/40 sm:w-[46vw] md:w-auto"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl text-gold">{sign.symbol}</span>
                <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {sign.element}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl">{sign.name}</h3>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground">{sign.dates}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {sign.readings[period].general}
              </p>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12 text-center">
        <Link
          to="/horoscope"
          className="inline-block rounded-full border border-gold/50 px-8 py-3.5 text-xs tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground"
        >
          Read My Horoscope
        </Link>
      </Reveal>
    </section>
  );
}

const exploreCards = [
  { title: "Birth Charts", copy: "Understand your unique celestial blueprint.", to: "/birth-chart" as const },
  { title: "Horoscopes", copy: "Daily and weekly guidance based on your zodiac sign.", to: "/horoscope" as const },
  { title: "Astrologers", copy: "Connect with experienced astrologers for personal guidance." },
  { title: "Astrology Store", copy: "Explore gemstones, spiritual products and astrology-inspired items." },
];

function ExploreSection() {
  return (
    <section id="explore" className="border-y border-border bg-surface/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal>
          <p className="eyebrow">Explore Astrology</p>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">There Is More to Explore</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exploreCards.map((card, i) => {
            const inner = (
              <>
                <h3 className="font-display text-2xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.copy}</p>
                {!card.to && (
                  <span className="mt-6 inline-block rounded-full border border-border px-3 py-1 text-[0.6rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
                    Coming Soon
                  </span>
                )}
              </>
            );
            return (
              <Reveal key={card.title} delay={i * 80}>
                {card.to ? (
                  <Link
                    to={card.to}
                    className="block h-full rounded-xl border border-border bg-background/40 p-7 transition-colors hover:border-gold/40"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="h-full rounded-xl border border-dashed border-border bg-background/20 p-7 opacity-70">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="night-gradient py-28 md:py-40">
      <Reveal className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">
          Your Story Is Written in the Stars.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Start with your free birth chart and discover a new way to understand yourself.
        </p>
        <Link
          to="/birth-chart"
          className="mt-10 inline-block rounded-full bg-gold px-9 py-4 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-[1.02]"
        >
          Create My Free Birth Chart
        </Link>
      </Reveal>
    </section>
  );
}
