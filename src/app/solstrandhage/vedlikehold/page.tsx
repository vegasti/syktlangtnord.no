import Link from "next/link";
import { listRecords } from "@/lib/airtable";

export const metadata = { title: "Vedlikehold" };
export const revalidate = 600;

type VedlikeholdFields = {
  Tittel?: string;
  År?: number;
  Status?: "Planlagt" | "Pågående" | "Utført";
  Kategori?: "Bygg" | "Uteområde" | "El" | "Brann" | "Lekeplass" | "Annet";
  Beskrivelse?: string;
  Leverandør?: string;
  Vises?: boolean;
};

const STATUS_ORDER: Record<string, number> = {
  Pågående: 0,
  Planlagt: 1,
  Utført: 2,
};

const STATUS_BADGE: Record<string, string> = {
  Pågående: "bg-blue-100 text-blue-800",
  Planlagt: "bg-amber-100 text-amber-800",
  Utført: "bg-green-100 text-green-800",
};

async function getVedlikehold() {
  try {
    const records = await listRecords<VedlikeholdFields>("Vedlikehold");
    return records
      .filter((r) => r.fields.Vises !== false && r.fields.Tittel)
      .sort((a, b) => {
        const sa = STATUS_ORDER[a.fields.Status ?? "Planlagt"] ?? 9;
        const sb = STATUS_ORDER[b.fields.Status ?? "Planlagt"] ?? 9;
        if (sa !== sb) return sa - sb;
        const ya = a.fields.År ?? 0;
        const yb = b.fields.År ?? 0;
        return yb - ya;
      });
  } catch (err) {
    console.error("Failed to load Vedlikehold:", err);
    return [];
  }
}

export default async function VedlikeholdPage() {
  const items = await getVedlikehold();

  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      <p className="text-sm uppercase tracking-widest text-accent mb-4 animate-fade-in">
        Vedlikehold
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight text-foreground animate-fade-in-up">
        Vedlikehold og planer
      </h1>
      <p className="mt-6 text-lg text-foreground/80 max-w-2xl animate-fade-in-up [animation-delay:80ms]">
        Historikk og planer for større vedlikeholdstiltak. Brukes når styret
        har konkrete tiltak å rapportere — for de tilbakevendende oppgavene,
        se{" "}
        <Link href="/solstrandhage/hms#arshjul">årshjulet på HMS-siden</Link>.
      </p>

      <section className="mt-12">
        {items.length === 0 ? (
          <div className="rounded-lg border border-foreground/10 bg-surface p-8 text-center">
            <p className="text-foreground/70">
              Ingen registrerte vedlikeholdsoppgaver ennå.
            </p>
            <p className="mt-2 text-sm text-foreground/60">
              Styret legger inn både utførte og planlagte tiltak etter hvert.
              Inntil videre, se{" "}
              <Link href="/solstrandhage/hms/arshjul">
                årshjulet på HMS-siden
              </Link>{" "}
              for de tilbakevendende oppgavene.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-foreground/10 bg-surface overflow-hidden">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`px-5 py-4 ${
                  i > 0 ? "border-t border-foreground/10" : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg tracking-tight text-foreground">
                        {item.fields.Tittel}
                      </h3>
                      {item.fields.Status && (
                        <span
                          className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded ${STATUS_BADGE[item.fields.Status] || "bg-gray-100 text-gray-800"}`}
                        >
                          {item.fields.Status}
                        </span>
                      )}
                      {item.fields.Kategori && (
                        <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-foreground/10 text-foreground/70">
                          {item.fields.Kategori}
                        </span>
                      )}
                    </div>
                    {item.fields.Beskrivelse && (
                      <p className="text-sm text-foreground/75 mt-2">
                        {item.fields.Beskrivelse}
                      </p>
                    )}
                    {item.fields.Leverandør && (
                      <p className="text-xs text-foreground/55 mt-2">
                        Leverandør: {item.fields.Leverandør}
                      </p>
                    )}
                  </div>
                  {item.fields.År && (
                    <div className="font-serif text-2xl text-foreground/60 tabular-nums">
                      {item.fields.År}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="mt-8 text-xs text-foreground/50">
        Tidslinjen hentes fra Airtable. Styret kan oppdatere direkte der —
        endringer vises på siden i løpet av 10 minutter.
      </p>
    </div>
  );
}
