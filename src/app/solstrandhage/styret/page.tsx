import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "Styret" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Styret"
      title="Styret i Solstrand hage"
      description="Hvem sitter i styret, og hvordan tar du kontakt."
      plannedContent={[
        "Liste over styremedlemmer med roller (henter fra Airtable)",
        "Kontaktform til styret",
        "Hvordan melde inn saker til styremøtet",
        "Møtedatoer",
      ]}
    />
  );
}
