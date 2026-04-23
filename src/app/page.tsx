import Link from "next/link";

const quickLinks = [
  {
    href: "/akutt",
    title: "Akutt og beredskap",
    description:
      "Hovedstoppekran, sikringsskap, telefon til vaktselskap og rørlegger. Hva du gjør ved brann, vannlekkasje eller strømbrudd.",
    emphasis: true,
  },
  {
    href: "/hms",
    title: "HMS",
    description:
      "Internkontroll, risikovurdering, branninstruks og rutiner for sameiet.",
  },
  {
    href: "/for-beboere",
    title: "For beboere",
    description:
      "Husordensregler, vedtekter, parkering, avfall og praktisk info i hverdagen.",
  },
  {
    href: "/vedlikehold",
    title: "Vedlikehold",
    description: "Hva som er gjort, hva som planlegges, og når.",
  },
  {
    href: "/skjemaer",
    title: "Skjemaer",
    description:
      "Skademelding, nøkkelbestilling, gjesteparkering og varsel om oppussing.",
  },
  {
    href: "/styret",
    title: "Styret",
    description: "Hvem sitter i styret, og hvordan melde inn saker.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <p className="text-sm uppercase tracking-widest text-accent mb-4">
          Velkommen
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl leading-tight tracking-tight text-foreground max-w-3xl">
          Praktisk informasjon for beboere i Solstrand hage sameie.
        </h1>
        <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
          Denne siden samler HMS, husordensregler og praktisk informasjon på
          ett sted — åpent tilgjengelig, uten innlogging. For styresaker,
          dokumenter og betaling, bruk{" "}
          <a href="https://www.bonord.no" target="_blank" rel="noreferrer">
            Bonord-portalen
          </a>
          .
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group block rounded-lg border p-6 no-underline transition-colors ${
                link.emphasis
                  ? "border-accent bg-accent text-white hover:bg-accent-deep"
                  : "border-foreground/10 bg-surface text-foreground hover:border-accent"
              }`}
            >
              <h2
                className={`font-serif text-2xl tracking-tight mb-2 ${
                  link.emphasis ? "text-white" : "text-foreground"
                }`}
              >
                {link.title}
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  link.emphasis ? "text-white/90" : "text-foreground/70"
                }`}
              >
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
