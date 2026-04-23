import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solstrand hage sameie",
    template: "%s · Solstrand hage sameie",
  },
  description:
    "Informasjon, HMS og praktisk hjelp for beboere i Solstrand hage sameie.",
};

const navLinks = [
  { href: "/akutt", label: "Akutt" },
  { href: "/hms", label: "HMS" },
  { href: "/for-beboere", label: "For beboere" },
  { href: "/vedlikehold", label: "Vedlikehold" },
  { href: "/skjemaer", label: "Skjemaer" },
  { href: "/styret", label: "Styret" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-foreground/10 bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="font-serif text-xl tracking-tight no-underline text-foreground">
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

        <main className="flex-1">{children}</main>

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
      </body>
    </html>
  );
}
