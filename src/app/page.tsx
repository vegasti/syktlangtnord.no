import Link from "next/link";

const sections = [
  {
    href: "/solstrandhage",
    title: "Solstrand hage sameie",
    description:
      "HMS, husordensregler og praktisk informasjon for beboere.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4">
        syktlangtnord.no
      </p>
      <h1 className="font-serif text-5xl sm:text-6xl leading-tight tracking-tight text-foreground">
        Sykt langt nord.
      </h1>
      <p className="mt-6 text-lg text-foreground/80">
        Et hjørne av nettet for prosjekter som tilfeldigvis bor her.
      </p>

      <div className="mt-12 grid gap-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block rounded-lg border border-foreground/10 bg-surface p-6 no-underline transition-colors hover:border-accent"
          >
            <h2 className="font-serif text-2xl tracking-tight text-foreground mb-1">
              {section.title}
            </h2>
            <p className="text-sm text-foreground/70">{section.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
