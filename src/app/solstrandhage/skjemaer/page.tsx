import Link from "next/link";

export const metadata = { title: "Skjemaer" };

const forms = [
  {
    href: "/solstrandhage/skjemaer/avvik",
    title: "Meld avvik",
    description:
      "Hendelse, tilstand eller mangel som kan føre til skade. Du får et referansenummer for oppfølging.",
    available: true,
  },
  {
    href: "/solstrandhage/skjemaer/skademelding",
    title: "Skademelding",
    description: "Vannskade, hærverk eller skade på fellesareal.",
    available: false,
  },
  {
    href: "/solstrandhage/skjemaer/nokkelbestilling",
    title: "Nøkkelbestilling",
    description: "Bestill ekstra nøkler eller meld om mistet nøkkel.",
    available: false,
  },
  {
    href: "/solstrandhage/skjemaer/gjesteparkering",
    title: "Gjesteparkering",
    description: "Søk om gjesteparkering for besøkende.",
    available: false,
  },
  {
    href: "/solstrandhage/skjemaer/varsel-oppussing",
    title: "Varsel om oppussing",
    description:
      "Informer naboer og styret om planlagt oppussingsarbeid.",
    available: false,
  },
];

export default function SkjemaerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
        Skjemaer
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Digitale skjemaer
      </h1>
      <p className="mt-6 text-lg text-foreground/80 animate-fade-in-up [animation-delay:80ms]">
        Send inn til styret uten å lete etter e-postadresser. Innsendingene
        logges, og styret får varsel.
      </p>

      <div className="mt-10 grid gap-3 animate-fade-in-up [animation-delay:160ms]">
        {forms.map((f) =>
          f.available ? (
            <Link
              key={f.href}
              href={f.href}
              className="block rounded-lg border border-foreground/10 bg-surface p-5 no-underline transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-serif text-xl tracking-tight text-foreground mb-1">
                {f.title}
              </h2>
              <p className="text-sm text-foreground/70">{f.description}</p>
            </Link>
          ) : (
            <div
              key={f.href}
              className="rounded-lg border border-foreground/10 bg-surface/40 p-5"
            >
              <h2 className="font-serif text-xl tracking-tight text-foreground/60 mb-1">
                {f.title}{" "}
                <span className="text-xs font-sans uppercase tracking-widest text-foreground/50">
                  · kommer
                </span>
              </h2>
              <p className="text-sm text-foreground/50">{f.description}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
