# syktlangtnord.no

Umbrella-prosjekt for siden på `syktlangtnord.no`. Inneholder for øyeblikket én seksjon:

- **`/solstrandhage`** — offentlig informasjonsside for Solstrand hage sameie (HMS, husordensregler, praktisk info)

Tanken er at andre prosjekter senere kan legges som egne seksjoner under samme domene.

## Stack

- **Next.js 16** (App Router, Turbopack) — TypeScript
- **Tailwind CSS 4** — palette og typografi i `src/app/globals.css`
- **Vercel** — hosting og serverless funksjoner
- **Airtable** — lett CMS for innhold styret skal kunne endre uten kode (kontakter, FAQ, vedlikeholdslogg, styremedlemmer)
- **Resend** — transaksjonell e-post fra skjemainnsendinger (planlagt)

## Sidestruktur

```
/                                  ← syktlangtnord.no landing
/solstrandhage                     ← Solstrand-forside
/solstrandhage/akutt               (statisk + Airtable)
/solstrandhage/hms                 (statisk)
/solstrandhage/for-beboere         (statisk)
/solstrandhage/vedlikehold         (Airtable)
/solstrandhage/skjemaer            (statisk + serverless)
/solstrandhage/styret              (Airtable)
/solstrandhage/for-nye-beboere     (statisk)
```

Hver seksjon har sin egen `layout.tsx` med eget header/footer. Root-layouten er minimal slik at seksjoner kan ha helt ulik visuell identitet hvis nødvendig.

## Designgrunnlag

Palett (CSS-variabler i `globals.css`):

- `--color-cream` `#eae1da` — bakgrunn
- `--color-white` `#ffffff` — flater
- `--color-grey` `#bfbfbf` — borders, sekundær
- `--color-ink` `#2a2a2b` — tekst
- `--color-forest` `#325f4e` — primær aksent
- `--color-forest-deep` `#234538` — hover

Typografi:

- **Inter** — body
- **Fraunces** — overskrifter

## Utvikling

```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Deployment

Pushes til `main` på GitHub deployer automatisk til Vercel (når koblet opp). Domene `syktlangtnord.no` peker dit via DNS hos Domeneshop.

## Veien videre

1. ~~Scaffold + designgrunnlag~~ ✅
2. ~~Restrukturer til sub-path under syktlangtnord.no~~ ✅
3. Push til GitHub + koble Vercel + sette opp DNS hos Domeneshop
4. Skrive faktisk innhold på de statiske sidene fra HMS-plan
5. Sette opp Airtable-base med tabellene: Kontakter, Styret, FAQ, Vedlikehold, Innsendinger
6. Integrere Airtable-data via ISR
7. Bygge skjema-flyt (serverless function → Airtable + Resend-mail)
8. QR-koder for fysisk utrulling i oppganger
