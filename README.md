# syktlangtnord.no

Umbrella-prosjekt for siden på `syktlangtnord.no`. Inneholder for øyeblikket én seksjon:

- **`/solstrandhage`** — offentlig informasjonsside for Solstrand hage sameie (HMS, husordensregler, praktisk info)

Tanken er at andre prosjekter senere kan legges som egne seksjoner under samme domene.

## Stack

- **Next.js 16** (App Router, Turbopack) — TypeScript
- **Tailwind CSS 4** — palette og typografi i `src/app/globals.css`
- **Vercel** — hosting og serverless funksjoner
- **Airtable** — lett CMS for innhold styret skal kunne endre uten kode (kontakter, FAQ, vedlikeholdslogg, styremedlemmer, avvik)

## Sidestruktur

```
/                                  ← syktlangtnord.no landing
/solstrandhage                     ← Solstrand-forside
/solstrandhage/akutt               (statisk + Airtable)
/solstrandhage/hms                 (statisk MDX, 9 underkapitler)
/solstrandhage/for-beboere         (statisk)
/solstrandhage/vedlikehold         (Airtable)
/solstrandhage/skjemaer            (statisk + serverless actions)
/solstrandhage/skjemaer/avvik      (avvikskjema, skriver til Airtable)
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
npm run dev      # http://localhost:3002
npm run build
npm run start
```

## Deployment

Pushes til `main` på GitHub deployer automatisk til Vercel. Domene `syktlangtnord.no` peker dit via DNS hos Domeneshop (A-record på apex, CNAME på www).

## Environment variables

Settes i Vercel → Project Settings → Environment Variables (alle environments: Production, Preview, Development), og lokalt i `.env.local`.

| Variabel | Beskrivelse | Eksempel |
| --- | --- | --- |
| `AIRTABLE_API_KEY` | Personal Access Token fra airtable.com/create/tokens | `pat...` |
| `AIRTABLE_BASE_ID` | Base-ID, hentes fra URL-en til Airtable-basen (starter med `app`) | `appXXXXXXXXXXXXXX` |
| `AIRTABLE_TABLE_AVVIK` | Navnet på avvikstabellen (default: `Avvik`) | `Avvik` |

## Airtable-skjema

### Base: Solstrand hage

#### Tabell: Avvik

Brukes av avvikskjemaet på `/solstrandhage/skjemaer/avvik`.

| Felt | Type | Notat |
| --- | --- | --- |
| Referanse | Single line text | **Primary**. Auto-generert (`AVK-yymmdd-XXXX`) |
| Dato | Date | Dato for hendelsen |
| Sted | Single line text | Hvor i sameiet |
| Meldt av | Single line text | Navn |
| Kontakt | Single line text | Telefon eller e-post |
| Beskrivelse | Long text | Detaljer om hendelsen |
| Alvorlighetsgrad | Single select | `Lav`, `Middels`, `Høy`, `Akutt` |
| Strakstiltak | Long text | Hva ble gjort umiddelbart (kan være tom) |
| Status | Single select | `Ny`, `Under behandling`, `Lukket` (default `Ny`) |

PAT-en trenger scope `data.records:write` på denne basen.

#### (Valgfritt) Airtable-automatisering for varsling

I Airtable: **Automations** → **Create automation**:

- Trigger: `When record created` på Avvik-tabellen
- Action: `Send email`
  - To: styreleder@... (eller fellespostkasse)
  - Subject: `Nytt avvik: {Referanse} ({Alvorlighetsgrad})`
  - Body: Inkluder alle felt — bruk dynamiske referanser

Alternativt: send Slack/Teams-melding, eller flere parallelle e-poster ved `Akutt`-grad.

## Veien videre

1. ~~Scaffold + designgrunnlag~~ ✅
2. ~~Restrukturer til sub-path under syktlangtnord.no~~ ✅
3. ~~Push til GitHub + koble Vercel + sette opp DNS hos Domeneshop~~ ✅
4. ~~HMS-plan som MDX-sider, akutt og styret med data~~ ✅
5. ~~Avvikskjema som server action mot Airtable~~ ✅
6. Husordensregler + vedtekter på `/for-beboere`
7. Flere skjemaer (skademelding, nøkkelbestilling, gjesteparkering, varsel om oppussing)
8. Airtable-integrasjon for `/akutt`-kontakter, `/styret`-medlemmer og `/vedlikehold`-tidslinje (ISR)
9. QR-koder for fysisk utrulling i oppganger
