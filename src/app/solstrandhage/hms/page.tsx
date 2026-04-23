import Link from "next/link";

import Ansvar from "./(chapters)/ansvar/page.mdx";
import Lover from "./(chapters)/lover/page.mdx";
import Risikovurdering from "./(chapters)/risikovurdering/page.mdx";
import Rutiner from "./(chapters)/rutiner/page.mdx";
import Arshjul from "./(chapters)/arshjul/page.mdx";
import Avvik from "./(chapters)/avvik/page.mdx";
import Branninstruks from "./(chapters)/branninstruks/page.mdx";
import Vernerunde from "./(chapters)/vernerunde/page.mdx";
import Dokumentasjon from "./(chapters)/dokumentasjon/page.mdx";

export const metadata = { title: "HMS" };

const chapters = [
  { id: "ansvar", title: "Ansvar og organisering", Component: Ansvar },
  { id: "lover", title: "Lover og forskrifter", Component: Lover },
  { id: "risikovurdering", title: "Risikovurdering og tiltak", Component: Risikovurdering },
  { id: "rutiner", title: "Rutiner", Component: Rutiner },
  { id: "arshjul", title: "Årshjul", Component: Arshjul },
  { id: "avvik", title: "Avvikshåndtering", Component: Avvik },
  { id: "branninstruks", title: "Branninstruks", Component: Branninstruks },
  { id: "vernerunde", title: "Sjekkliste for vernerunde", Component: Vernerunde },
  { id: "dokumentasjon", title: "Dokumentasjonsoversikt", Component: Dokumentasjon },
];

export default function HmsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
        HMS
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Helse, miljø og sikkerhet
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl animate-fade-in-up [animation-delay:80ms]">
        Solstrand Hage sameie er pålagt å ha et internkontrollsystem etter
        internkontrollforskriften. Dette er sameiets HMS-plan — verktøyet for
        systematisk arbeid med helse, miljø og sikkerhet.
      </p>
      <p className="mt-4 text-sm text-foreground/60 animate-fade-in-up [animation-delay:120ms]">
        Versjon 1.0 · Vedtatt av styret: <em>kommer</em> · Neste revisjon: <em>kommer</em>
      </p>

      <nav
        aria-label="Innhold"
        className="mt-10 rounded-lg border border-foreground/10 bg-surface p-6 animate-fade-in-up [animation-delay:160ms]"
      >
        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">
          Innhold
        </p>
        <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2 list-decimal list-inside marker:text-foreground/40 marker:text-sm">
          {chapters.map((c) => (
            <li key={c.id} className="text-foreground/85">
              <a
                href={`#${c.id}`}
                className="no-underline hover:underline hover:text-accent transition-colors"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Link
        href="/solstrandhage/hms/meld-avvik"
        className="group mt-4 flex items-center justify-between gap-4 rounded-lg border border-accent/30 bg-accent/5 p-5 no-underline transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-md animate-fade-in-up [animation-delay:200ms]"
      >
        <div>
          <p className="font-serif text-lg tracking-tight text-foreground">
            Meld avvik
          </p>
          <p className="text-sm text-foreground/70">
            Hendelse, mangel eller skade — du får referansenummer for oppfølging.
          </p>
        </div>
        <span
          className="text-accent text-2xl transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </Link>

      <div
        className="mt-16 prose prose-neutral max-w-none
        prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
        prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:leading-tight prose-h1:mt-0 prose-h1:mb-6
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-8
        prose-p:text-foreground/85
        prose-li:text-foreground/85
        prose-strong:text-foreground
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-table:text-sm
        prose-th:text-left prose-th:text-foreground prose-th:font-semibold
        prose-td:align-top
        prose-hr:border-foreground/10
        prose-hr:my-12"
      >
        {chapters.map((c, i) => {
          const Chapter = c.Component;
          return (
            <section key={c.id} id={c.id} className={i > 0 ? "mt-16 pt-16 border-t border-foreground/10" : ""}>
              <Chapter />
              <p className="mt-8 text-sm">
                <Link href="#" className="no-underline hover:underline">
                  ↑ Tilbake til innhold
                </Link>
              </p>
            </section>
          );
        })}
      </div>

      <div className="mt-16 rounded-lg border border-foreground/10 bg-surface p-6 text-sm text-foreground/80 animate-fade-in-up">
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
