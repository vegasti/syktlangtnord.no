import { listRecords } from "@/lib/airtable";

export const metadata = { title: "Styret" };
export const revalidate = 600;

type StyretFields = {
  Navn?: string;
  Rolle?: "Styreleder" | "Styremedlem" | "Varamedlem" | "2. vara";
  Ansvarsområde?: string;
  "E-post"?: string;
  Vises?: boolean;
};

const ROLE_ORDER: Record<string, number> = {
  Styreleder: 0,
  Styremedlem: 1,
  Varamedlem: 2,
  "2. vara": 3,
};

async function getStyret() {
  try {
    const records = await listRecords<StyretFields>("Styret");
    return records
      .filter((r) => r.fields.Vises !== false && r.fields.Navn)
      .sort(
        (a, b) =>
          (ROLE_ORDER[a.fields.Rolle ?? ""] ?? 99) -
          (ROLE_ORDER[b.fields.Rolle ?? ""] ?? 99),
      );
  } catch (err) {
    console.error("Failed to load Styret:", err);
    return [];
  }
}

export default async function StyretPage() {
  const board = await getStyret();

  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
        Styret
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Styret i Solstrand Hage sameie
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl animate-fade-in-up [animation-delay:80ms]">
        Styret velges av årsmøtet og har det overordnede ansvaret for sameiets
        drift, vedlikehold og HMS-arbeid.
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Sammensetning
        </h2>
        {board.length === 0 ? (
          <p className="text-sm text-foreground/60 italic">
            Klarte ikke å hente styresammensetning akkurat nå.
          </p>
        ) : (
          <div className="rounded-lg border border-foreground/10 bg-surface overflow-hidden">
            {board.map((m, i) => (
              <div
                key={m.id}
                className={`grid sm:grid-cols-12 gap-1 sm:gap-4 px-5 py-4 ${
                  i > 0 ? "border-t border-foreground/10" : ""
                }`}
              >
                <div className="sm:col-span-3 text-sm text-foreground/60 sm:text-foreground/80">
                  {m.fields.Rolle}
                </div>
                <div className="sm:col-span-3 font-medium text-foreground">
                  {m.fields.Navn}
                </div>
                <div className="sm:col-span-4 text-sm text-foreground/70">
                  {m.fields.Ansvarsområde || "—"}
                </div>
                <div className="sm:col-span-2 text-sm text-right">
                  {m.fields["E-post"] && (
                    <a
                      href={`mailto:${m.fields["E-post"]}`}
                      className="no-underline hover:underline text-foreground/70"
                      aria-label={`Send e-post til ${m.fields.Navn}`}
                    >
                      (e-post)
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Hvordan melde inn saker
        </h2>
        <div className="prose prose-neutral max-w-none prose-p:text-foreground/85 prose-li:text-foreground/85 prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
          <ul>
            <li>Saker som angår fellesarealer, vedlikehold eller HMS sendes til styreleder.</li>
            <li>Avvik kan meldes via avviksskjema på <a href="/solstrandhage/skjemaer/avvik">skjemaer-siden</a>.</li>
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
