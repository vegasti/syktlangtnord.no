import type { Metadata } from "next";
import Header from "./Header";

export const metadata: Metadata = {
  title: {
    default: "Solstrand hage sameie",
    template: "%s · Solstrand hage sameie",
  },
  description:
    "Informasjon, HMS og praktisk hjelp for beboere i Solstrand hage sameie.",
};

export default function SolstrandLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />

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
