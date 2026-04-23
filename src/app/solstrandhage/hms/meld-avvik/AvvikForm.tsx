"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitAvvik,
  type AvvikFormState,
  type AvvikValues,
} from "./actions";

const initialState: AvvikFormState = { status: "idle" };

const inputClass =
  "w-full rounded-md border border-foreground/15 bg-surface px-3 py-2 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass = "block text-sm font-medium text-foreground mb-1.5";

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-accent px-6 py-3 text-white font-medium transition-colors hover:bg-accent-deep disabled:opacity-60 disabled:cursor-wait"
    >
      {pending ? "Sender …" : "Send avviksmelding"}
    </button>
  );
}

export default function AvvikForm() {
  const [state, action] = useActionState(submitAvvik, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-accent bg-accent/5 p-6">
        <h2 className="font-serif text-2xl tracking-tight text-foreground mb-2">
          Takk! Avviket er registrert.
        </h2>
        <p className="text-foreground/80 mb-4">
          Referansenummer:{" "}
          <span className="font-mono text-accent font-semibold">
            {state.reference}
          </span>
        </p>
        <p className="text-sm text-foreground/70">
          Styret blir varslet og tar kontakt om nødvendig. Ta vare på
          referansenummeret hvis du vil etterspørre status senere.
        </p>
      </div>
    );
  }

  const v: AvvikValues = state.status === "error" ? state.values : {};
  const errorMsg = state.status === "error" ? state.message : null;

  return (
    <form action={action} className="space-y-5" noValidate>
      {errorMsg && (
        <div className="rounded-md border border-alert/40 bg-alert/5 px-4 py-3 text-sm text-alert">
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="dato" className={labelClass}>
          Dato for avvik <span className="text-alert">*</span>
        </label>
        <input
          id="dato"
          name="dato"
          type="date"
          required
          defaultValue={v.dato || todayIso()}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="sted" className={labelClass}>
          Sted <span className="text-alert">*</span>
        </label>
        <input
          id="sted"
          name="sted"
          type="text"
          required
          defaultValue={v.sted}
          placeholder="Eks: Carport Solstrandvegen 157, lekeplass, fellesgang"
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="navn" className={labelClass}>
            Ditt navn <span className="text-alert">*</span>
          </label>
          <input
            id="navn"
            name="navn"
            type="text"
            required
            defaultValue={v.navn}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="kontakt" className={labelClass}>
            Kontakt (telefon eller e-post){" "}
            <span className="text-alert">*</span>
          </label>
          <input
            id="kontakt"
            name="kontakt"
            type="text"
            required
            defaultValue={v.kontakt}
            className={inputClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>
          Alvorlighetsgrad <span className="text-alert">*</span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(["Lav", "Middels", "Høy", "Akutt"] as const).map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 rounded-md border border-foreground/15 bg-surface px-3 py-2 cursor-pointer hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/5"
            >
              <input
                type="radio"
                name="alvorlighet"
                value={level}
                required
                defaultChecked={(v.alvorlighet || "Middels") === level}
                className="accent-accent"
              />
              <span className="text-sm text-foreground">{level}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="beskrivelse" className={labelClass}>
          Beskrivelse av avviket <span className="text-alert">*</span>
        </label>
        <textarea
          id="beskrivelse"
          name="beskrivelse"
          required
          rows={5}
          minLength={10}
          defaultValue={v.beskrivelse}
          placeholder="Hva er observert? Når? Andre detaljer som er relevante."
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="strakstiltak" className={labelClass}>
          Strakstiltak utført (hvis aktuelt)
        </label>
        <textarea
          id="strakstiltak"
          name="strakstiltak"
          rows={3}
          defaultValue={v.strakstiltak}
          placeholder="Eks: Sperret av området, varslet beboere, koblet ut sikring."
          className={inputClass}
        />
      </div>

      <p className="text-xs text-foreground/60">
        Felter merket med <span className="text-alert">*</span> er påkrevd. Ved
        akutt fare: ring nødetater (110/112/113) før du melder avvik her.
      </p>

      <Submit />
    </form>
  );
}
