import AvvikForm from "./AvvikForm";

export const metadata = { title: "Meld avvik" };

export default function AvvikPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-12 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4">
        Skjema
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground">
        Meld avvik
      </h1>
      <p className="mt-6 text-lg text-foreground/80">
        Et avvik er en hendelse, tilstand eller mangel som kan føre til skade på
        person, miljø eller bygningsmasse. Bruk dette skjemaet for å varsle
        styret. Du får et referansenummer for oppfølging.
      </p>

      <div className="mt-10">
        <AvvikForm />
      </div>
    </div>
  );
}
