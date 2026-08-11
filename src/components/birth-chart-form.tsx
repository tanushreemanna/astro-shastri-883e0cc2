import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export type BirthDetails = {
  name: string;
  date: string;
  time: string;
  place: string;
};

/**
 * Collects birth details only. No astrological computation happens here.
 * A real ephemeris / astrology calculation API can be called from `onSubmit`
 * with these exact fields.
 */
export function BirthChartForm({
  onSubmit,
  showName = true,
  submitLabel = "Reveal My Chart",
  className,
}: {
  onSubmit?: (details: BirthDetails) => void;
  showName?: boolean;
  submitLabel?: string;
  className?: string;
}) {
  const [details, setDetails] = useState<BirthDetails>({ name: "", date: "", time: "", place: "" });

  const set = (key: keyof BirthDetails) => (e: { target: { value: string } }) =>
    setDetails((d) => ({ ...d, [key]: e.target.value }));

  const handle = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(details);
  };

  const field =
    "w-full rounded-md border border-input bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/70 focus:ring-2 focus:ring-ring";
  const label = "mb-2 block text-[0.7rem] tracking-[0.22em] text-muted-foreground uppercase";

  return (
    <form onSubmit={handle} className={cn("glass-panel rounded-xl p-6 sm:p-8", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        {showName && (
          <div className="sm:col-span-2">
            <label className={label} htmlFor="bc-name">
              Name <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span>
            </label>
            <input id="bc-name" className={field} placeholder="How should we address you?" value={details.name} onChange={set("name")} />
          </div>
        )}
        <div>
          <label className={label} htmlFor="bc-date">Date of Birth</label>
          <input id="bc-date" type="date" required className={field} value={details.date} onChange={set("date")} />
        </div>
        <div>
          <label className={label} htmlFor="bc-time">Time of Birth</label>
          <input id="bc-time" type="time" required className={field} value={details.time} onChange={set("time")} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="bc-place">Place of Birth</label>
          <input id="bc-place" required className={field} placeholder="City, country" value={details.place} onChange={set("place")} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-gold px-8 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-[1.01] hover:brightness-110"
      >
        {submitLabel}
      </button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground/70">
        Early version — chart readings are illustrative placeholders until a calculation service is
        connected.
      </p>
    </form>
  );
}
