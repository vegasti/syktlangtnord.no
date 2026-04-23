import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "HMS" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="HMS"
      title="Helse, miljø og sikkerhet"
      description="Sameiet er pålagt internkontroll. Her samler vi rutiner, risikovurderinger og dokumentasjon."
      plannedContent={[
        "Internkontroll og HMS-håndbok",
        "Risikovurdering",
        "Branninstruks og rutiner",
        "Sjekklister for dugnad og fellesarealer",
        "Avviksregistrering",
      ]}
    />
  );
}
