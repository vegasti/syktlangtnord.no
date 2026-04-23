import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = { title: "For beboere" };

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="For beboere"
      title="Praktisk i hverdagen"
      description="Det du trenger å vite for å bo godt i Solstrand hage."
      plannedContent={[
        "Husordensregler",
        "Vedtekter",
        "Avfall, retur og henteplan",
        "Parkering og gjesteparkering",
        "Post, nøkler og dørtelefon",
        "FAQ — gjengangere fra Facebook-gruppen",
      ]}
    />
  );
}
