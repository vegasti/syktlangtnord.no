import Link from "next/link";
import AvvikForm from "./AvvikForm";

export const metadata = { title: "Meld avvik" };

export default function MeldAvvikPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-12 pb-24">
      <p className="text-sm text-foreground/60 mb-6">
        <Link href="/solstrandhage/hms">← HMS</Link>
      </p>
      <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
        HMS
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Meld avvik
      </h1>
      <p className="mt-6 text-lg text-foreground/80 animate-fade-in-up [animation-delay:80ms]">
        Et avvik er en hendelse, tilstand eller mangel som kan føre til skade
        på person, miljø eller bygningsmasse. Bruk dette skjemaet for å varsle
        styret — du får et referansenummer for oppfølging. Se{" "}
        <Link href="/solstrandhage/hms#avvik">avvikshåndtering</Link> for
        hvordan styret behandler innmeldingen.
      </p>

      <div className="mt-10 animate-fade-in-up [animation-delay:160ms]">
        <AvvikForm />
      </div>
    </div>
  );
}
