import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "Akutt og beredskap" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Akutt"
      title="Akutt og beredskap"
      description="Telefonnumre og praktisk hjelp ved akutte situasjoner — uten innlogging."
      plannedContent={[
        "Telefon til vaktselskap, rørlegger og elektriker (henter fra Airtable)",
        "Hva gjør du ved brann, vannlekkasje, strømbrudd og innbrudd",
        "Plantegninger med hovedstoppekran, sikringsskap og brannslukkere",
        "Kontaktinformasjon til styreleder",
      ]}
    />
  );
}
