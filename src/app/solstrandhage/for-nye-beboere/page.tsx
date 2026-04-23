import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "For nye beboere" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="For nye beboere"
      title="Velkommen til Solstrand hage"
      description="Samlet oversikt for nye beboere, kjøpere og meglere."
      plannedContent={[
        "Vedtekter og husordensregler",
        "Siste årsberetning",
        "Vedlikeholdshistorikk og planer",
        "Praktisk info: nøkler, post, parkering, internett",
        "Kontakt til styret og forretningsfører",
      ]}
    />
  );
}
