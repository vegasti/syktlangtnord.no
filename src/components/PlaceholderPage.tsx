import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  plannedContent: string[];
};

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  plannedContent,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4">
        {eyebrow}
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-6 text-lg text-foreground/80">{description}</p>

      <div className="mt-10 rounded-lg border border-foreground/10 bg-surface p-6">
        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-3">
          Kommer snart
        </p>
        <ul className="space-y-2 text-foreground/80">
          {plannedContent.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-accent">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 text-sm text-foreground/60">
        <Link href="/solstrandhage">← Tilbake til forsiden</Link>
      </p>
    </div>
  );
}
