"use server";

import { createRecord } from "@/lib/airtable";
import { generateReference } from "@/lib/reference";

const ALVORLIGHET = ["Lav", "Middels", "Høy", "Akutt"] as const;
type Alvorlighet = (typeof ALVORLIGHET)[number];

export type AvvikValues = {
  dato?: string;
  sted?: string;
  navn?: string;
  kontakt?: string;
  beskrivelse?: string;
  alvorlighet?: string;
  strakstiltak?: string;
};

export type AvvikFormState =
  | { status: "idle" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; values: AvvikValues };

export async function submitAvvik(
  _prev: AvvikFormState,
  formData: FormData,
): Promise<AvvikFormState> {
  const values: AvvikValues = {
    dato: String(formData.get("dato") ?? "").trim(),
    sted: String(formData.get("sted") ?? "").trim(),
    navn: String(formData.get("navn") ?? "").trim(),
    kontakt: String(formData.get("kontakt") ?? "").trim(),
    beskrivelse: String(formData.get("beskrivelse") ?? "").trim(),
    alvorlighet: String(formData.get("alvorlighet") ?? ""),
    strakstiltak: String(formData.get("strakstiltak") ?? "").trim(),
  };

  if (
    !values.dato ||
    !values.sted ||
    !values.navn ||
    !values.kontakt ||
    !values.beskrivelse
  ) {
    return {
      status: "error",
      message: "Fyll inn alle påkrevde felter.",
      values,
    };
  }

  if (values.beskrivelse.length < 10) {
    return {
      status: "error",
      message: "Beskrivelsen må være minst 10 tegn.",
      values,
    };
  }

  if (!ALVORLIGHET.includes(values.alvorlighet as Alvorlighet)) {
    return {
      status: "error",
      message: "Velg alvorlighetsgrad.",
      values,
    };
  }

  const reference = generateReference("AVK");
  const tableName = process.env.AIRTABLE_TABLE_AVVIK || "Avvik";

  try {
    await createRecord(tableName, {
      Referanse: reference,
      Dato: values.dato,
      Sted: values.sted,
      "Meldt av": values.navn,
      Kontakt: values.kontakt,
      Beskrivelse: values.beskrivelse,
      Alvorlighetsgrad: values.alvorlighet,
      Strakstiltak: values.strakstiltak,
      Status: "Ny",
    });
  } catch (err) {
    console.error("Avvik submission failed:", err);
    return {
      status: "error",
      message:
        "Vi klarte ikke å lagre avviket akkurat nå. Prøv igjen om litt, eller send e-post til styreleder direkte.",
      values,
    };
  }

  return { status: "success", reference };
}
