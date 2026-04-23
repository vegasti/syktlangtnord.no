import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "Skjemaer" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Skjemaer"
      title="Digitale skjemaer"
      description="Send inn til styret uten å lete etter e-postadresser. Innsendingene logges og styret får e-post."
      plannedContent={[
        "Skademelding (vannskade, hærverk, fellesareal)",
        "Nøkkelbestilling",
        "Gjesteparkering",
        "Varsel om oppussing",
        "Innmelding av sak til styret",
      ]}
    />
  );
}
