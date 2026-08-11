import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PERIODS, ZODIAC, type Period } from "@/lib/zodiac";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Search = { sign?: string };

export const Route = createFileRoute("/horoscope")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    sign: typeof search["sign"] === "string" ? search["sign"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Today's Horoscope — All 12 Zodiac Signs" },
      {
        name: "description",
        content:
          "Read today's, tomorrow's and this week's horoscope for every zodiac sign, with love, career, money and lucky details.",
      },
      { property: "og:title", content: "Today's Horoscope" },
      {
        property: "og:description",
        content: "Daily and weekly guidance for all twelve zodiac signs.",
      },
    ],
  }),
  component: HoroscopePage,
});

function HoroscopePage() {
  const { sign: signParam } = Route.useSearch();
  const [selected, setSelected] = useState(
    ZODIAC.find((s) => s.slug === signParam)?.slug ?? ZODIAC[0]!.slug,
  );
  const [period, setPeriod] = useState<Period>("today");

  const sign = ZODIAC.find((s) => s.slug === selected) ?? ZODIAC[0]!;
  const reading = sign.readings[period];

  return (
    <div className="night-gradient">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Horoscope</p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.1] sm:text-6xl">Today's Horoscope</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Choose your sign and read the sky for today, tomorrow or the week ahead.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {ZODIAC.map((s) => (
              <button
                key={s.slug}
                onClick={() => setSelected(s.slug)}
                className={cn(
                  "rounded-lg border px-3 py-4 text-center transition-colors",
                  s.slug === selected
                    ? "border-gold bg-gold/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground",
                )}
              >
                <span className={cn("block font-display text-2xl", s.slug === selected && "text-gold")}>
                  {s.symbol}
                </span>
                <span className="mt-1 block text-xs tracking-[0.14em] uppercase">{s.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 rounded-xl border border-border bg-surface/50 p-7 sm:p-10">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5 sm:flex sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span className="shrink-0 font-display text-5xl text-gold">{sign.symbol}</span>
              <div className="min-w-0">
                <h2 className="truncate font-display text-3xl sm:text-4xl">{sign.name}</h2>
                <p className="mt-1 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  {sign.dates}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex gap-1 rounded-full border border-border p-1">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={cn(
                    "flex-1 rounded-full px-4 py-2 text-[0.68rem] tracking-[0.14em] uppercase transition-colors sm:flex-none",
                    period === p.key
                      ? "bg-gold text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-9 max-w-3xl font-display text-xl leading-relaxed text-foreground/90 sm:text-2xl">
            {reading.general}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Love", reading.love],
              ["Career", reading.career],
              ["Money", reading.money],
              ["Mood", reading.mood],
              ["Lucky Number", reading.luckyNumber],
              ["Lucky Colour", reading.luckyColour],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-background/40 p-5">
                <p className="text-[0.65rem] tracking-[0.2em] text-gold uppercase">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground/70">
            Placeholder editorial content for this early version — not a calculated reading.
          </p>
        </div>
      </section>
    </div>
  );
}
