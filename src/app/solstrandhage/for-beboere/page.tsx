import Link from "next/link";

export const metadata = { title: "For beboere" };

const documents = [
  {
    href: "/solstrandhage/for-beboere/husordensregler",
    title: "Husordensregler",
    description:
      "Ro, fellesarealer, parkering, dyrehold, brannvern og mer — det daglige som angår alle beboere.",
  },
  {
    href: "/solstrandhage/for-beboere/vedtekter",
    title: "Vedtekter",
    description:
      "Sameiets vedtekter, sist endret på årsmøtet 19.04.2018. Regulerer drift, vedlikeholdsansvar, styre og årsmøte.",
  },
];

const planlagt = [
  {
    title: "Avfall, retur og henteplan",
    description:
      "Tromsø kommunes hentekalender og praktiske tips for sortering.",
  },
  {
    title: "Parkering og gjesteparkering",
    description: "Detaljert oversikt med kart og regler for besøkende.",
  },
  {
    title: "Internett og post",
    description:
      "Leverandøravtaler, tilkoblingsguide og info om postoppsett.",
  },
  {
    title: "FAQ",
    description: "Svar på spørsmål som går igjen i Facebook-gruppen.",
  },
];

export default function ForBeboerePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
        For beboere
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Praktisk i hverdagen
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl animate-fade-in-up [animation-delay:80ms]">
        Det du trenger å vite for å bo godt i Solstrand Hage. Reglene under
        gjelder for alle beboere — både eiere og leietakere — og for besøkende.
      </p>

      <section className="mt-12 animate-fade-in-up [animation-delay:160ms]">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Dokumenter
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {documents.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="block rounded-lg border border-foreground/10 bg-surface p-5 no-underline transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-serif text-xl tracking-tight text-foreground mb-1">
                {d.title}
              </h3>
              <p className="text-sm text-foreground/70">{d.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Kommer
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {planlagt.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-foreground/10 bg-surface/40 p-5"
            >
              <h3 className="font-serif text-lg tracking-tight text-foreground/60 mb-1">
                {p.title}
              </h3>
              <p className="text-sm text-foreground/50">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 rounded-lg border border-foreground/10 bg-surface p-6 text-sm text-foreground/80">
        <p className="font-semibold text-foreground mb-2">Akutt situasjon?</p>
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
