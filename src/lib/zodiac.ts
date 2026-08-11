export type Period = "today" | "tomorrow" | "week";

export type ZodiacSign = {
  slug: string;
  name: string;
  symbol: string;
  dates: string;
  element: string;
  preview: string;
  readings: Record<
    Period,
    {
      general: string;
      love: string;
      career: string;
      money: string;
      mood: string;
      luckyNumber: string;
      luckyColour: string;
    }
  >;
};

/**
 * Placeholder editorial content for the MVP.
 * Replace `readings` with a real horoscope/astrology API response later —
 * the shape is intentionally stable so only the data source needs to change.
 */
const reading = (
  general: string,
  love: string,
  career: string,
  money: string,
  mood: string,
  luckyNumber: string,
  luckyColour: string,
) => ({ general, love, career, money, mood, luckyNumber, luckyColour });

const makeReadings = (
  name: string,
  theme: string,
): ZodiacSign["readings"] => ({
  today: reading(
    `A quieter rhythm suits ${name} today. ${theme} Let the first half of the day be for listening, and the evening for deciding.`,
    "A small gesture lands more warmly than a grand one.",
    "Finish something half-started rather than beginning anew.",
    "A steady choice today protects a larger plan later.",
    "Composed",
    "7",
    "Champagne",
  ),
  tomorrow: reading(
    `Momentum returns for ${name}. ${theme} Conversations open doors that felt closed only a day ago.`,
    "Say the honest thing gently; it will be received well.",
    "Someone notices consistency you thought went unseen.",
    "Review a recurring expense before committing further.",
    "Optimistic",
    "3",
    "Indigo",
  ),
  week: reading(
    `The week asks ${name} for pacing rather than pressure. ${theme} By the weekend a decision that felt heavy becomes simple.`,
    "Shared plans deepen when you make room for silence too.",
    "A longer arc of work begins to show its shape midweek.",
    "Small, repeated discipline outperforms one bold move.",
    "Grounded",
    "12",
    "Lavender",
  ),
});

export const ZODIAC: ZodiacSign[] = [
  ["aries", "Aries", "♈", "Mar 21 – Apr 19", "Fire", "Your restlessness is information, not impatience."],
  ["taurus", "Taurus", "♉", "Apr 20 – May 20", "Earth", "Comfort and progress are not opposites this cycle."],
  ["gemini", "Gemini", "♊", "May 21 – Jun 20", "Air", "One clear idea outweighs a dozen half-formed ones."],
  ["cancer", "Cancer", "♋", "Jun 21 – Jul 22", "Water", "Tend to your own shore before rescuing anyone else's."],
  ["leo", "Leo", "♌", "Jul 23 – Aug 22", "Fire", "Warmth, offered quietly, carries the furthest."],
  ["virgo", "Virgo", "♍", "Aug 23 – Sep 22", "Earth", "Precision serves you best when it is kind."],
  ["libra", "Libra", "♎", "Sep 23 – Oct 22", "Air", "Balance is a decision, not a permanent state."],
  ["scorpio", "Scorpio", "♏", "Oct 23 – Nov 21", "Water", "Depth is welcome; secrecy is optional."],
  ["sagittarius", "Sagittarius", "♐", "Nov 22 – Dec 21", "Fire", "The horizon moves, and so may your plans."],
  ["capricorn", "Capricorn", "♑", "Dec 22 – Jan 19", "Earth", "Ambition softens when you let it rest."],
  ["aquarius", "Aquarius", "♒", "Jan 20 – Feb 18", "Air", "Your difference is the point, not the problem."],
  ["pisces", "Pisces", "♓", "Feb 19 – Mar 20", "Water", "Intuition arrives early; evidence catches up."],
].map(([slug, name, symbol, dates, element, preview]) => ({
  slug,
  name,
  symbol,
  dates,
  element,
  preview,
  readings: makeReadings(name, preview),
}));

export const PERIODS: { key: Period; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "tomorrow", label: "Tomorrow" },
  { key: "week", label: "This Week" },
];
