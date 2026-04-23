# Solstrand hage sameie

Offentlig informasjonsside for Solstrand hage sameie. Hovedformål: HMS, husordensregler og praktisk informasjon — uten innlogging.

Komplementær til:

- **Bonord-portalen** — styresaker, dokumenter, betaling (innlogget)
- **Facebook-gruppe** — uformell kommunikasjon mellom beboere

## Stack

- **Next.js 16** (App Router, Turbopack) — TypeScript
- **Tailwind CSS 4** — palette og typografi i `src/app/globals.css`
- **Vercel** — hosting og serverless funksjoner
- **Airtable** — lett CMS for innhold styret skal kunne endre uten kode (kontakter, FAQ, vedlikeholdslogg, styremedlemmer)
- **Resend** — transaksjonell e-post fra skjemainnsendinger (ikke implementert ennå)

## Sidestruktur

| Rute               | Type                | Innhold                                      |
| ------------------ | ------------------- | -------------------------------------------- |
| `/`                | Statisk             | Forside med snarveier                        |
| `/akutt`           | Statisk + Airtable  | Beredskap, kontakter, plantegninger          |
| `/hms`             | Statisk             | Internkontroll, risiko, branninstruks        |
| `/for-beboere`     | Statisk             | Husordensregler, vedtekter, FAQ              |
| `/vedlikehold`     | Airtable            | Tidslinje for vedlikehold                    |
| `/skjemaer`        | Statisk + serverless | Skademelding, nøkler, gjesteparkering        |
| `/styret`          | Airtable            | Styremedlemmer og kontakt                    |
| `/for-nye-beboere` | Statisk             | Meglerpakke / velkomstpakke                  |

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
- **Fraunces** — overskrifter (serif med personlighet, men ikke pyntete)

## Utvikling

```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Deployment

Pushes til `main` på GitHub deployer automatisk til Vercel (når koblet opp).

## Veien videre

1. ~~Scaffold + designgrunnlag~~ ✅
2. Push til GitHub + koble Vercel + sette opp domene
3. Skrive faktisk innhold på de statiske sidene (HMS-dokumenter, husordensregler, vedtekter)
4. Sette opp Airtable-base med tabellene: Kontakter, Styret, FAQ, Vedlikehold, Innsendinger
5. Integrere Airtable-data via ISR
6. Bygge skjema-flyt (serverless function → Airtable + Resend-mail)
7. QR-koder for fysisk utrulling i oppganger
