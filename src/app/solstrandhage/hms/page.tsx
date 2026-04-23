import Link from "next/link";

export const metadata = { title: "HMS" };

const chapters = [
  {
    href: "/solstrandhage/hms/ansvar",
    title: "Ansvar og organisering",
    description: "Hva styret har ansvar for, og hva beboerne har ansvar for.",
  },
  {
    href: "/solstrandhage/hms/lover",
    title: "Lover og forskrifter",
    description: "Sentrale lover og forskrifter sameiet er omfattet av.",
  },
  {
    href: "/solstrandhage/hms/risikovurdering",
    title: "Risikovurdering og tiltak",
    description:
      "Risikomatrise og tiltak for brann, el, lekeplass, vinter, dugnad m.m.",
  },
  {
    href: "/solstrandhage/hms/rutiner",
    title: "Rutiner",
    description: "Styremøter, vernerunde, brannøvelse, kommunikasjon.",
  },
  {
    href: "/solstrandhage/hms/arshjul",
    title: "Årshjul",
    description: "Måned for måned: hva som skal gjøres, og hvem som har ansvar.",
  },
  {
    href: "/solstrandhage/hms/avvik",
    title: "Avvikshåndtering",
    description: "Slik melder du avvik, og slik behandler styret dem.",
  },
  {
    href: "/solstrandhage/hms/branninstruks",
    title: "Branninstruks",
    description: "Varsle, redde, slokke, møt brannvesenet.",
  },
  {
    href: "/solstrandhage/hms/vernerunde",
    title: "Sjekkliste for vernerunde",
    description: "Punktene som gjennomgås på den årlige vernerunden.",
  },
  {
    href: "/solstrandhage/hms/dokumentasjon",
    title: "Dokumentasjonsoversikt",
    description: "Hvilke dokumenter sameiet skal ha tilgjengelig og oppdatert.",
  },
];

export default function HmsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4">
        HMS
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground">
        Helse, miljø og sikkerhet
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
        Solstrand Hage sameie er pålagt å ha et internkontrollsystem etter
        internkontrollforskriften. Dette er sameiets HMS-plan — verktøyet for
        systematisk arbeid med helse, miljø og sikkerhet.
      </p>
      <p className="mt-4 text-sm text-foreground/60">
        Versjon 1.0 · Vedtatt av styret: [dato] · Neste revisjon: [dato]
      </p>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {chapters.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-lg border border-foreground/10 bg-surface p-5 no-underline transition-colors hover:border-accent"
          >
            <h2 className="font-serif text-xl tracking-tight text-foreground mb-1">
              {c.title}
            </h2>
            <p className="text-sm text-foreground/70">{c.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-foreground/10 bg-surface p-6 text-sm text-foreground/80">
        <p className="font-semibold text-foreground mb-2">
          Akutt situasjon?
        </p>
        <p>
          Ring 110 (brann), 112 (politi) eller 113 (medisinsk nødhjelp).{" "}
          <Link href="/solstrandhage/akutt">
            Se akutt-siden for telefonnumre til vaktselskap, rørlegger og elektriker.
          </Link>
        </p>
      </div>
    </div>
  );
}
