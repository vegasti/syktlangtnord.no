import Link from "next/link";
import { listRecords } from "@/lib/airtable";

export const metadata = { title: "Akutt og beredskap" };
export const revalidate = 600;

type KontaktFields = {
  Navn?: string;
  Telefon?: string;
  Beskrivelse?: string;
  Kategori?: "Sameiet" | "Leverandør" | "Forsikring";
  Sortering?: number;
  Vises?: boolean;
};

const emergencyContacts = [
  { label: "Brann", number: "110" },
  { label: "Politi", number: "112" },
  { label: "Ambulanse / medisinsk nødhjelp", number: "113" },
  { label: "Legevakt Tromsø", number: "116 117" },
];

const incidents = [
  {
    title: "Brann",
    summary:
      "Varsle alle, ring 110, redde personer ut, lukk dører, møt brannvesenet på gjesteparkeringen.",
    href: "/solstrandhage/hms/branninstruks",
  },
  {
    title: "Vannlekkasje",
    summary:
      "Steng hovedstoppekran til seksjonen, kontakt rørlegger, varsle styret. Hovedstoppekran for hele bygget er i [plassering — fylles inn].",
  },
  {
    title: "Strømbrudd",
    summary:
      "Sjekk sikringer i egen seksjon. Hvis hele bygget er mørklagt: kontakt nettleverandør (Arva). Sikringsskap for fellesanlegg er i [plassering — fylles inn].",
  },
  {
    title: "Innbrudd",
    summary:
      "Ring 112. Ikke rør åstedet. Varsle styret etter at politiet er kontaktet.",
  },
  {
    title: "Snø- eller israsfare fra tak",
    summary:
      "Stenge av rasutsatt sone, varsle beboere, kontakt takfagmann om nødvendig.",
  },
];

async function getKontakter() {
  try {
    const records = await listRecords<KontaktFields>("Kontakter");
    return records
      .filter((r) => r.fields.Vises !== false && r.fields.Navn)
      .sort(
        (a, b) =>
          (a.fields.Sortering ?? 999) - (b.fields.Sortering ?? 999),
      );
  } catch (err) {
    console.error("Failed to load Kontakter:", err);
    return [];
  }
}

export default async function AkuttPage() {
  const kontakter = await getKontakter();

  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
      <p className="text-sm uppercase tracking-widest text-alert mb-4 animate-fade-in">
        Akutt
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Akutt og beredskap
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl animate-fade-in-up [animation-delay:80ms]">
        Telefonnumre og praktisk hjelp ved akutte situasjoner — uten innlogging.
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Nødnumre
        </h2>
        <div className="rounded-lg border border-foreground/10 bg-surface overflow-hidden">
          {emergencyContacts.map((c, i) => (
            <div
              key={c.label}
              className={`flex items-center justify-between px-5 py-4 ${
                i > 0 ? "border-t border-foreground/10" : ""
              }`}
            >
              <span className="text-foreground/80">{c.label}</span>
              <a
                href={`tel:${c.number.replace(/\s/g, "")}`}
                className="font-serif text-2xl text-accent no-underline tabular-nums"
              >
                {c.number}
              </a>
            </div>
          ))}
        </div>
      </section>

      {kontakter.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
            Sameiet og leverandører
          </h2>
          <div className="rounded-lg border border-foreground/10 bg-surface overflow-hidden">
            {kontakter.map((k, i) => (
              <div
                key={k.id}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4 ${
                  i > 0 ? "border-t border-foreground/10" : ""
                }`}
              >
                <div>
                  <p className="text-foreground/80">{k.fields.Navn}</p>
                  {k.fields.Beskrivelse && (
                    <p className="text-sm text-foreground/60">
                      {k.fields.Beskrivelse}
                    </p>
                  )}
                </div>
                <span className="text-foreground font-mono text-sm tabular-nums">
                  {k.fields.Telefon || "—"}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-foreground/50">
            Kontakter hentes fra Airtable. Styret kan oppdatere dem direkte
            der — endringer vises på siden i løpet av 10 minutter.
          </p>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Hva gjør du ved …
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {incidents.map((i) => (
            <div
              key={i.title}
              className="rounded-lg border border-foreground/10 bg-surface p-5 transition-all duration-300 hover:border-accent hover:shadow-sm"
            >
              <h3 className="font-serif text-lg tracking-tight text-foreground mb-2">
                {i.title}
              </h3>
              <p className="text-sm text-foreground/75">{i.summary}</p>
              {i.href && (
                <p className="mt-3 text-sm">
                  <Link href={i.href}>Full instruks →</Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-foreground/10 bg-surface p-6">
        <h2 className="font-serif text-xl tracking-tight text-foreground mb-3">
          Plantegninger
        </h2>
        <p className="text-sm text-foreground/75">
          Plantegninger med markering av hovedstoppekran, sikringsskap og
          brannslukkere kommer.
        </p>
      </section>
    </div>
  );
}
