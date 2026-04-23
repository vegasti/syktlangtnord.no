export const metadata = { title: "Styret" };

const board = [
  {
    role: "Styreleder",
    name: "Daniel Sierra Polanco",
    responsibility: "Overordnet HMS-ansvar, årlig gjennomgang",
  },
  {
    role: "Styremedlem",
    name: "Vegard Stien",
    responsibility: "[Fylles inn]",
  },
  {
    role: "Styremedlem",
    name: "Kristina Torbergsen",
    responsibility: "[Fylles inn]",
  },
  {
    role: "Varamedlem",
    name: "Simen Kristoffersen",
    responsibility: "[Fylles inn]",
  },
  {
    role: "2. vara",
    name: "Marvin Halle Johnsen",
    responsibility: "[Fylles inn]",
  },
];

export default function StyretPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4">
        Styret
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground">
        Styret i Solstrand Hage sameie
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
        Styret velges av årsmøtet og har det overordnede ansvaret for sameiets
        drift, vedlikehold og HMS-arbeid.
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Sammensetning
        </h2>
        <div className="rounded-lg border border-foreground/10 bg-surface overflow-hidden">
          {board.map((m, i) => (
            <div
              key={m.name}
              className={`grid sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-4 ${
                i > 0 ? "border-t border-foreground/10" : ""
              }`}
            >
              <div className="text-sm text-foreground/60 sm:text-foreground/80">
                {m.role}
              </div>
              <div className="font-medium text-foreground">{m.name}</div>
              <div className="text-sm text-foreground/70">
                {m.responsibility}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Hvordan melde inn saker
        </h2>
        <div className="prose prose-neutral max-w-none prose-p:text-foreground/85 prose-li:text-foreground/85 prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          <ul>
            <li>Saker som angår fellesarealer, vedlikehold eller HMS sendes til styreleder.</li>
            <li>Avvik kan meldes via avviksskjema på <a href="/solstrandhage/skjemaer">skjemaer-siden</a>.</li>
            <li>Større saker som ønskes behandlet på årsmøtet meldes minst 14 dager før møtet.</li>
            <li>Styremøter holdes ca. én gang i måneden. HMS er fast punkt på dagsordenen.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-foreground/10 bg-surface p-6">
        <h2 className="font-serif text-xl tracking-tight text-foreground mb-3">
          Sameiets grunnopplysninger
        </h2>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div className="sm:contents">
            <dt className="text-foreground/60">Juridisk navn</dt>
            <dd className="text-foreground">Solstrand Hage sameie</dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Organisasjonsnummer</dt>
            <dd className="text-foreground tabular-nums">920 812 376</dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Stiftet</dt>
            <dd className="text-foreground">19.04.2018</dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Type</dt>
            <dd className="text-foreground">Eierseksjonssameie</dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Antall seksjoner</dt>
            <dd className="text-foreground">10</dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Adresser</dt>
            <dd className="text-foreground">
              Solstrandvegen 155 A–D, 157 A–D, 159 A–B, Tromsø
            </dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Forretningsfører</dt>
            <dd className="text-foreground">
              <a href="https://www.bonord.no" target="_blank" rel="noreferrer">
                Bonord
              </a>
            </dd>
          </div>
          <div className="sm:contents">
            <dt className="text-foreground/60">Forsikring</dt>
            <dd className="text-foreground">
              Fremtind Forsikring AS (hovedpolise 31835764)
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
