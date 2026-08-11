import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import chartWheel from "@/assets/birth-chart-wheel.jpg";
import { BirthChartForm, type BirthDetails } from "@/components/birth-chart-form";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/birth-chart")({
  head: () => ({
    meta: [
      { title: "Free Birth Chart — Discover Your Cosmic Blueprint" },
      {
        name: "description",
        content:
          "Enter your birth details to explore your unique astrology chart — sun sign, moon sign and ascendant in one calm view.",
      },
      { property: "og:title", content: "Discover Your Cosmic Blueprint" },
      {
        property: "og:description",
        content: "Enter your birth details to explore your unique astrology chart.",
      },
    ],
  }),
  component: BirthChartPage,
});

/** Placeholder chart summary. Swap for a real calculation API response later. */
type ChartResult = {
  sun: string;
  moon: string;
  ascendant: string;
};

function BirthChartPage() {
  const [details, setDetails] = useState<BirthDetails | null>(null);
  const result: ChartResult | null = details
    ? { sun: "Awaiting calculation", moon: "Awaiting calculation", ascendant: "Awaiting calculation" }
    : null;

  return (
    <div className="night-gradient">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Free Birth Chart</p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.1] sm:text-6xl">
            Discover Your Cosmic Blueprint
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Enter your birth details to explore your unique astrology chart.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-start">
          <Reveal>
            <BirthChartForm submitLabel="Generate My Chart" onSubmit={setDetails} />
          </Reveal>

          <Reveal delay={120}>
            {result ? (
              <div className="rounded-xl border border-border bg-surface/50 p-7 sm:p-9">
                <p className="eyebrow">Your Chart</p>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                  {details?.name ? `${details.name}, your` : "Your"} birth chart is ready to be
                  explored.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {details?.date} · {details?.time} · {details?.place}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Sun Sign", result.sun],
                    ["Moon Sign", result.moon],
                    ["Ascendant", result.ascendant],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-border bg-background/40 p-5">
                      <p className="text-[0.65rem] tracking-[0.2em] text-gold uppercase">{label}</p>
                      <p className="mt-3 font-display text-xl text-muted-foreground">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg border border-border bg-background/30 p-6">
                  <p className="text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                    Birth Chart Visualization
                  </p>
                  <img
                    src={chartWheel}
                    alt="Placeholder illustration of a natal chart wheel"
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="mx-auto mt-6 w-full max-w-sm opacity-80"
                  />
                </div>

                <p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">
                  This is a placeholder layout. Positions are not calculated yet — a real astrology
                  calculation service will populate these panels.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-9 text-center">
                <p className="font-display text-2xl text-muted-foreground">
                  Your chart will appear here.
                </p>
                <p className="mt-3 text-sm text-muted-foreground/70">
                  Sun sign, moon sign, ascendant and your chart wheel — all in one quiet view.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
