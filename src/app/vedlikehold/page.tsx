import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "Vedlikehold" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Vedlikehold"
      title="Vedlikehold og planer"
      description="Tidslinje over hva som er gjort og hva som er planlagt — slik at både beboere og kjøpere kan se status."
      plannedContent={[
        "Tidslinje med utførte tiltak (henter fra Airtable)",
        "Planlagte tiltak med tentativ år",
        "Leverandører som er brukt",
        "Lenker til større prosjekter (taklift, fasade osv.)",
      ]}
    />
  );
}
