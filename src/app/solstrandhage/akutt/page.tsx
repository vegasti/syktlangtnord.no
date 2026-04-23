import Link from "next/link";

export const metadata = { title: "Akutt og beredskap" };

const emergencyContacts = [
  { label: "Brann", number: "110" },
  { label: "Politi", number: "112" },
  { label: "Ambulanse / medisinsk nødhjelp", number: "113" },
  { label: "Legevakt Tromsø", number: "116 117" },
];

const otherContacts = [
  {
    label: "Styreleder",
    name: "Daniel Sierra Polanco",
    number: "[telefon — fylles inn]",
  },
  {
    label: "Forretningsfører (Bonord) — kundesenter",
    number: "[fylles inn]",
  },
  {
    label: "Fremtind Forsikring — skademelding",
    number: "915 03 100",
  },
  {
    label: "Brøytefirma",
    number: "[fylles inn]",
  },
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

export default function AkuttPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
      <p className="text-sm uppercase tracking-widest text-alert mb-4">
        Akutt
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground">
        Akutt og beredskap
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
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

      <section className="mt-10">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Sameiet og leverandører
        </h2>
        <div className="rounded-lg border border-foreground/10 bg-surface overflow-hidden">
          {otherContacts.map((c, i) => (
            <div
              key={c.label}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4 ${
                i > 0 ? "border-t border-foreground/10" : ""
              }`}
            >
              <div>
                <p className="text-foreground/80">{c.label}</p>
                {c.name && (
                  <p className="text-sm text-foreground/60">{c.name}</p>
                )}
              </div>
              <span className="text-foreground font-mono text-sm tabular-nums">
                {c.number}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-foreground/50">
          Ved publisering: telefonnumre fylles inn av styret. Kontaktene blir på
          sikt hentet automatisk fra Airtable så de alltid stemmer.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">
          Hva gjør du ved …
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {incidents.map((i) => (
            <div
              key={i.title}
              className="rounded-lg border border-foreground/10 bg-surface p-5"
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
