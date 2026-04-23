import Link from "next/link";
import { listRecords } from "@/lib/airtable";

export const revalidate = 600;

type HendelseFields = {
  Tittel?: string;
  Dato?: string;
  Tidspunkt?: string;
  Type?: "Årsmøte" | "Styremøte" | "Dugnad" | "Brannøvelse" | "Vernerunde" | "Annet";
  Sted?: string;
  Beskrivelse?: string;
  Vises?: boolean;
};

const TYPE_BADGE: Record<string, string> = {
  Årsmøte: "bg-blue-100 text-blue-800",
  Styremøte: "bg-purple-100 text-purple-800",
  Dugnad: "bg-green-100 text-green-800",
  Brannøvelse: "bg-red-100 text-red-800",
  Vernerunde: "bg-amber-100 text-amber-800",
  Annet: "bg-gray-100 text-gray-800",
};

const quickLinks = [
  {
    href: "/solstrandhage/hms",
    title: "HMS",
    description:
      "Internkontroll, risikovurdering, branninstruks og rutiner.",
  },
  {
    href: "/solstrandhage/for-beboere",
    title: "For beboere",
    description:
      "Husordensregler, vedtekter og praktisk info i hverdagen.",
  },
  {
    href: "/solstrandhage/vedlikehold",
    title: "Vedlikehold",
    description: "Hva som er gjort, og hva som planlegges.",
  },
  {
    href: "/solstrandhage/skjemaer",
    title: "Skjemaer",
    description:
      "Meld avvik. Flere skjemaer kommer.",
  },
  {
    href: "/solstrandhage/styret",
    title: "Styret",
    description: "Hvem sitter i styret, og hvordan melde inn saker.",
  },
];

const NORWEGIAN_MONTHS = [
  "jan", "feb", "mar", "apr", "mai", "jun",
  "jul", "aug", "sep", "okt", "nov", "des",
];

function formatDato(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getDate()}. ${NORWEGIAN_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

async function getKommendeHendelser() {
  try {
    const records = await listRecords<HendelseFields>("Hendelser");
    const today = new Date().toISOString().slice(0, 10);
    return records
      .filter(
        (r) =>
          r.fields.Vises !== false &&
          r.fields.Tittel &&
          r.fields.Dato &&
          r.fields.Dato >= today,
      )
      .sort((a, b) => (a.fields.Dato ?? "").localeCompare(b.fields.Dato ?? ""))
      .slice(0, 4);
  } catch (err) {
    console.error("Failed to load Hendelser:", err);
    return [];
  }
}

export default async function Home() {
  const hendelser = await getKommendeHendelser();

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
          Velkommen
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl leading-tight tracking-tight text-foreground max-w-3xl animate-fade-in-up">
          Praktisk informasjon for beboere i Solstrand hage sameie.
        </h1>
        <p className="mt-6 text-lg text-foreground/80 max-w-2xl animate-fade-in-up [animation-delay:80ms]">
          Denne siden samler HMS, husordensregler og praktisk informasjon på
          ett sted — åpent tilgjengelig, uten innlogging. For styresaker,
          dokumenter og betaling, bruk{" "}
          <a href="https://www.bonord.no" target="_blank" rel="noreferrer">
            Bonord-portalen
          </a>
          .
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 mb-12 animate-fade-in-up [animation-delay:120ms]">
        <Link
          href="/solstrandhage/akutt"
          className="group flex items-center gap-4 rounded-lg border border-alert/30 bg-alert/5 p-5 no-underline transition-all duration-300 hover:border-alert hover:bg-alert/10 hover:shadow-md"
        >
          <span
            className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-alert text-white font-serif text-xl"
            aria-hidden="true"
          >
            !
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-serif text-xl tracking-tight text-foreground">
              Akutt og beredskap
            </p>
            <p className="text-sm text-foreground/70">
              Telefonnumre til vaktselskap, rørlegger, elektriker. Hva du gjør ved brann, vannlekkasje, strømbrudd.
            </p>
          </div>
          <span className="text-alert text-2xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      {hendelser.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 mb-16 animate-fade-in-up [animation-delay:200ms]">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif text-2xl tracking-tight text-foreground">
              Kommende hendelser
            </h2>
            <span className="text-xs uppercase tracking-widest text-foreground/50">
              Oppdateres av styret
            </span>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {hendelser.map((h, i) => (
              <li
                key={h.id}
                className="rounded-lg border border-foreground/10 bg-surface p-5 transition-all duration-300 hover:border-accent hover:shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${240 + i * 60}ms` }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  {h.fields.Type && (
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded ${TYPE_BADGE[h.fields.Type] || "bg-gray-100 text-gray-800"}`}
                    >
                      {h.fields.Type}
                    </span>
                  )}
                  <span className="text-sm text-foreground/70 tabular-nums">
                    {formatDato(h.fields.Dato!)}
                    {h.fields.Tidspunkt ? ` · ${h.fields.Tidspunkt}` : ""}
                  </span>
                </div>
                <h3 className="font-serif text-lg tracking-tight text-foreground mb-1">
                  {h.fields.Tittel}
                </h3>
                {h.fields.Sted && (
                  <p className="text-sm text-foreground/60 mb-2">
                    {h.fields.Sted}
                  </p>
                )}
                {h.fields.Beskrivelse && (
                  <p className="text-sm text-foreground/75">
                    {h.fields.Beskrivelse}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="sr-only">Snarveier</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block rounded-lg border border-foreground/10 bg-surface p-6 no-underline transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${320 + i * 60}ms` }}
            >
              <h3 className="font-serif text-2xl tracking-tight mb-2 text-foreground">
                {link.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
