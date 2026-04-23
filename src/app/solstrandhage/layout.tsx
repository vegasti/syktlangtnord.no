import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Solstrand hage sameie",
    template: "%s · Solstrand hage sameie",
  },
  description:
    "Informasjon, HMS og praktisk hjelp for beboere i Solstrand hage sameie.",
};

const navLinks = [
  { href: "/solstrandhage/akutt", label: "Akutt" },
  { href: "/solstrandhage/hms", label: "HMS" },
  { href: "/solstrandhage/for-beboere", label: "For beboere" },
  { href: "/solstrandhage/vedlikehold", label: "Vedlikehold" },
  { href: "/solstrandhage/skjemaer", label: "Skjemaer" },
  { href: "/solstrandhage/styret", label: "Styret" },
];

export default function SolstrandLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/solstrandhage"
            className="font-serif text-xl tracking-tight no-underline text-foreground"
          >
            Solstrand hage sameie
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 no-underline hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="mt-24 border-t border-foreground/10 bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-foreground/70 flex flex-col sm:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Solstrand hage sameie</p>
          <p>
            Forretningsfører:{" "}
            <a href="https://www.bonord.no" target="_blank" rel="noreferrer">
              Bonord
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
