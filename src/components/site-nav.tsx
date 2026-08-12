import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/horoscope", label: "Horoscope" },
  { to: "/birth-chart", label: "Birth Chart" },
  { to: "/", hash: "explore", label: "Explore" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "glass-panel border-b" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="min-w-0 font-display text-lg tracking-[0.32em] text-foreground uppercase">
          ASTRO SHASTRI
        </Link>

        <div className="hidden justify-center gap-9 text-sm tracking-wide text-muted-foreground lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              {...("hash" in l ? { hash: l.hash } : {})}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <button aria-label="Search" className="text-muted-foreground transition-colors hover:text-gold">
            <Search className="h-4 w-4" />
          </button>
          <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">Login</button>
          <Link
            to="/birth-chart"
            className="rounded-full border border-gold/50 px-5 py-2 text-xs tracking-[0.18em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Get Your Free Chart
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 justify-self-end text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-panel border-t px-5 pb-8 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 font-display text-2xl text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/birth-chart"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-gold px-6 py-3 text-center text-xs tracking-[0.18em] text-primary-foreground uppercase"
          >
            Get Your Free Chart
          </Link>
          <button className="mt-4 w-full text-center text-sm text-muted-foreground">Login</button>
        </div>
      )}
    </header>
  );
}
