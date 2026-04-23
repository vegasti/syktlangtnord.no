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
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 sm:grid-cols-3 text-sm">
          <div>
            <p className="font-serif text-base text-foreground mb-1">
              Solstrand hage sameie
            </p>
            <p className="text-foreground/60 leading-relaxed">
              Solstrandvegen 155–159, Tromsø
              <br />
              Org.nr. 920 812 376
            </p>
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">Denne siden</p>
            <p className="text-foreground/60 leading-relaxed">
              HMS, husordensregler og praktisk informasjon — åpent
              tilgjengelig.
            </p>
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">For styresaker og dialog</p>
            <ul className="space-y-1 text-foreground/60">
              <li>
                <a
                  href="https://www.bonord.no"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bonord-portalen
                </a>{" "}
                — dokumenter, betaling
              </li>
              <li>Facebook-gruppen — uformell dialog</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-8 text-xs text-foreground/50">
          © {new Date().getFullYear()} Solstrand hage sameie
        </div>
      </footer>
    </div>
  );
}
