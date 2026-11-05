# FlyFrame — Frontend Workflow

> Purpose: describe everything the frontend does today, so a backend architecture can be designed to fit it.
> Source of truth: the code in this repo (file paths are given next to each item).

---

## 1. What the product is

**FlyFrame** is a passport & visa photo maker. A user uploads a selfie-style photo, picks a **document type** (passport / visa) and a **country**, and the app crops, resizes, replaces the background, and checks the photo against that country's rules. The user then pays to download it (digital, or digital + printed photos delivered).

**Key design fact:** all image processing currently runs **in the browser**. The photo is never uploaded. The Privacy Policy (`components/Legal/legalContent.ts`) and the UI both promise this ("Your photo stays on your device").

There is **no backend, database, auth, payment provider, or email service yet.** The only server code is one dev helper route (see §9).

---

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | SCSS per component + Tailwind 4 + `globals.css` |
| Animation | `motion` (Framer Motion successor), `gsap` |
| Icons | `@hugeicons/react`, `iconsax-react`, `flag-icons` |
| Image AI (client-side) | `@mediapipe/tasks-vision` — face detector + selfie segmenter. WASM and `.tflite` models are self-hosted in `public/mediapipe/` |
| Image ops | HTML Canvas (crop, background fill, resize, JPEG encode) |
| State | Plain React `useState` / `useRef` — no global store, no data-fetching library |
| Hosting target | Not decided (README mentions Vercel) |

---

## 3. Routes / pages

| Route | File | What it is |
|---|---|---|
| `/` | `app/page.tsx` | Landing page: Navbar → Hero → HowItWorks → Features → PhotoTips → Pricing → Review → Faq → Footer |
| `/drop` | `app/drop/page.tsx` → `components/Drop/` | Full-page drag-and-drop / paste (Ctrl+V) upload |
| `/terms` | `app/terms/page.tsx` | Terms of Use (content in `legalContent.ts`) |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy (content in `legalContent.ts`) |
| `/manifest.webmanifest` | `app/manifest.ts` | PWA manifest |
| `POST /api/save-cutout` | `app/api/save-cutout/route.ts` | **Dev helper only** — see §9 |

The landing page itself is static marketing content. **All the real product logic lives in one component: `DocumentModal`.**

---

## 4. Ways a user enters the flow

All of these end up opening the same `DocumentModal` (`components/DocumentModal/DocumentModal.tsx`):

1. **Navbar "Upload" button** (`Nav/Navbar.tsx`) — opens the modal with no photo.
2. **Hero "Get started" button** (`DocumentModal/GetStartedButton.tsx`) — same, no photo.
3. **Pricing buttons** ("Start for free" / "Get Premium") — link to `/drop`.
4. **`/drop` page** (`Drop/DropZone.tsx`) — user drops, picks, or pastes a photo anywhere on the page; the modal opens with that file already attached (`initialFile`).
5. **Drag-and-drop inside the modal** on the first screen.

Every entry starts a fresh session (the modal is re-mounted with a new `key`).

---

## 5. The core user journey (inside `DocumentModal`)

The modal is a small state machine: `type View = "choose" | "processing" | "result" | "retake" | "checkout"`.

```
                     ┌──────────────────────────────────────────────┐
                     │                                              │
   ┌────────┐  photo  ▼                                              │
   │ choose │ ───────► processing ──► result ──► checkout ──► done   │
   └────────┘ valid       │             │  ▲        │                │
        ▲                 │             │  └────────┘ (Back)         │
        │                 └─► retake ───┘                            │
        │      (file too big/small after processing)                 │
        └─────────── "Retake photo" / error ─────────────────────────┘
```

### Step 1 — Choose (`ChooseView.tsx`, `CountrySelect.tsx`)
- User picks **Passport / Visa** and a **country** from a searchable list.
- Shows the **photo requirements** for that choice: size (mm / inches), pixel size, DPI, background colour, head height, file format and file-size range.
- Shows a sample portrait cropped to the chosen spec (live preview).
- For countries flagged `cropOnly` (AU, CA, NZ) a notice says background editing is prohibited.
- User uploads a photo (button, drag-drop, or one already attached).
- **Validation** (`photoFile.ts`): JPG / PNG / WebP only, max **15 MB**. Errors show inline.

### Step 2 — Processing (`ProcessingView.tsx`, `processPhoto.ts`)
Runs entirely client-side, cancellable (closing the modal or choosing another photo aborts it). Five steps, each shown for a minimum of ~3.8 s so progress is readable:

| # | Step | What happens |
|---|---|---|
| 1 | **Crop & align** | MediaPipe face detection → head is framed to the spec's head-height ratio, canvas drawn at the spec's aspect ratio |
| 2 | **Remove background** | MediaPipe selfie segmentation → person cut out → placed on the spec's background colour |
| 3 | **Resize** | Scaled to exact pixel size (`mm / 25.4 × dpi`) |
| 4 | **Check requirements** | Runs quality checks (below) |
| 5 | **Export** | Encodes JPEG inside the country's file-size range (quality 0.95 → binary search down to 0.70; if still too large → "retake large"; if too small even at quality 1.0 → "retake small") |

**Checks produced** (each is `passed` / `failed` / `skipped`):
face recognised · only one face · minimum dimension · correct proportions · even lighting (left/right brightness) · background colour · file size.

If a model fails to load, that step falls back (centred crop / original background) and the related checks are reported as `skipped` rather than faked.

### Step 3a — Result (`ResultView.tsx`)
- Shows the finished photo with rulers (width × height) and a head-height marker.
- Lists every check with a pass/fail/skipped pill.
- **"Retake photo"** → back to Choose and reopens the file picker.
- **"Download photo"** → goes to Checkout (does **not** download directly).

### Step 3b — Retake (`RetakeView.tsx`)
Shown instead of Result when the file size can't be met without wrecking quality. Shows the file's size vs the required range plus five photo-taking tips, and a "Retake photo" button.

### Step 4 — Checkout (`CheckoutView.tsx`) — 3 sub-steps + done
Left panel: order summary (thumbnail, document name, size, line items, total).

| Sub-step | Content |
|---|---|
| **1. Photo option** | `Digital photo` ($22.99) or `Digital photo + prints` ($25.99, "2–3 business days" delivery) |
| **2. Extras** (optional, skippable) | `Expert review` (+$7.99) — a specialist double-checks the photo; `Light retouching` (+$4.99) — blemish / stray-hair touch-ups |
| **3. Contact & payment** | Email (regex-validated), **delivery address only if prints chosen** (name, street, apt, city, region, postal code, country, phone), "I agree to Terms & Privacy" checkbox, payment method (**Card / PayPal / Google Pay**), Pay button |
| **Done** | "Your photo is ready" + **Download photo** link (`<a href={blobUrl} download>`) |

Prices are **placeholders** (comment in the code: "Replace them with the real price list before launch").
The Pay handler is a **stub** — `setTimeout` of 1.2 s then success (`// TODO: hand off to the payment provider`).

### Closing behaviour
Clicking outside / Esc: closes immediately on an empty first screen, otherwise asks "Discard your changes?" (the photo and checks are lost).

---

## 6. Data the frontend works with

### Static reference data — `DocumentModal/specs.ts` (hard-coded today)
```ts
PhotoSpec {
  widthMm, heightMm, imperial?, dpi,
  background, backgroundColor,        // e.g. "White", "#ffffff"
  headMm?: [min, max],                // chin-to-crown
  format: "JPEG",
  fileKb: [min, max]
}
CountrySpecs {
  code, country,
  passport?: PhotoSpec, visa?: PhotoSpec,
  cropOnly?: boolean                  // no background editing allowed
}
```
- ~28 countries / regions (incl. "SCH" Schengen visa), per-country file-size overrides in `FILE_LIMITS`.
- Comment in code: *"Authorities update these, so the interface tells people to confirm against the official source."* → this data will change over time.

### Per-session data (lives only in React state, lost on refresh)
```ts
Job            { file, originalUrl, type, entry, spec, documentName }
ProcessResult  { blob, url, width, height, checks[], passed, sizeKb,
                 quality, retake: "large"|"small"|null, head, headMm }
Check          { id, label, status: passed|failed|skipped, detail? }
```

### Order data collected at checkout (currently never sent anywhere)
```ts
{
  option: "digital" | "prints",
  extras: ("review" | "retouch")[],
  email,
  address?: { name, line1, line2?, city, region?, zip, country, phone? },  // prints only
  agreedToTerms: boolean,
  paymentMethod: "card" | "paypal" | "gpay",
  total (cents),
  // implied by the flow but not yet captured:
  documentType, countryCode, the photo itself
}
```

---

## 7. Things the frontend already does vs. things that are faked

| Capability | Status |
|---|---|
| Spec lookup per country / document | ✅ Works (hard-coded) |
| Face detection, crop, background removal, resize, JPEG fit, quality checks | ✅ Works, in-browser |
| Upload validation | ✅ Works |
| Checkout UI + form validation | ✅ Works |
| **Payment** | ❌ Stub (`setTimeout`) |
| **Order creation / storage** | ❌ Nothing |
| **Confirmation email** | ❌ UI says "We'll send your order confirmation here" — nothing sends it |
| **Gated download** | ❌ The final image is a client-side `blob:` URL and is already visible un-watermarked on the Result screen, so payment does not actually protect it |
| **Printed photo delivery** | ❌ Address is collected and dropped |
| **Expert review / light retouching** | ❌ Sold as extras, but no one receives the photo or does the work |
| **Free plan** | ❌ Pricing page advertises "Free — basic cropping", but the modal charges for every download |
| **User accounts / order history** | ❌ None (and the UI has no login) |
| **Analytics / error logging** | ❌ None (privacy page says no tracking cookies) |

---

## 8. Constraints & decisions the backend must respect or consciously change

1. **"Your photo stays on your device."** This is a stated promise in the UI, the Terms, and the Privacy Policy. Three features need the photo (or the final image) on a server: **printing, expert review, retouching** — and arguably **paid-download gating**. The backend design must either (a) keep photos on-device and send only order data, or (b) upload photos only for those paid features and **update the Privacy Policy/Terms/UI copy first**.
2. **Payment gating of the download.** Today the clean image is shown before payment. Decide how it is protected (e.g. watermarked preview until paid; or upload the final image after payment and release it by signed URL; or accept client-side honour system).
3. **Per-country rules change.** Specs (size, background, file KB, `cropOnly`) are hard-coded and will need updating without a redeploy.
4. **`cropOnly` is only a notice.** AU / CA / NZ show a warning, but `processPhoto` still runs background removal for them. This is a frontend gap to fix regardless of backend.
5. **Prices and delivery time are placeholders** and appear in two places that disagree (Pricing page "$25.99/photo" vs checkout $22.99 / $25.99 / extras). They should come from one source.
6. **Supported payment methods in UI:** Card, PayPal, Google Pay.
7. **Printed photos:** a physical fulfilment partner/process is implied (2–3 business days, any country typed as free text).
8. **International audience:** many countries, USD only today.
9. **Legal:** order data (email, address, phone) is personal data → retention and deletion rules are already described in `/privacy` ("only as long as we need it… then delete").

---

## 9. Existing server code — `app/api/save-cutout/route.ts`

- `POST /api/save-cutout` receives a WebP data-URL and **writes it to `public/images/sample/sample-cutout.webp`** with `fs.writeFileSync`.
- It is called from `getSampleCutout()` in `processPhoto.ts` every time the Choose screen opens (fire-and-forget).
- It was clearly a one-off helper to generate the sample image. **It should not ship**: it is unauthenticated, writes to the project folder, will fail on read-only/serverless hosting, and makes every visitor's browser POST to it. Remove it and the `fetch` call (the generated file is already committed).

---

## 10. Backend capabilities the frontend implies

Derived directly from the flow above — this is the list to design the architecture around:

1. **Orders** — create/read an order: option, extras, document type, country, email, optional address, total, status (`created → paid → fulfilled / refunded`).
2. **Payments** — Card, PayPal, Google Pay (Stripe covers all three; PayPal may be separate). Create payment session/intent, confirm via **webhook**, never trust the client's "paid".
3. **Pricing / catalog** — options, extras, currency, delivery estimates served from one source.
4. **Photo spec data** — countries, documents, sizes, colours, file limits, `cropOnly`; editable without redeploy; versioned.
5. **Asset delivery after payment** — secure, expiring download of the final JPEG (needs the image on a server, or a client-side unlock mechanism).
6. **Transactional email** — order confirmation, download link, shipping notice.
7. **Print fulfilment** — send photo + address to a print/shipping partner; track status; handle failures.
8. **Expert review / retouch queue** — internal tool or vendor workflow: receive photo, do the work, return the result, notify the customer.
9. **Storage + retention** — short-lived object storage for any uploaded photo; automatic deletion on a schedule that matches `/privacy`.
10. **Abuse & reliability** — rate limiting, webhook idempotency, refunds, order lookup for support.
11. **Optional / later** — accounts or magic-link order lookup, analytics (consent-based), admin dashboard, error monitoring.

---

## 11. Open questions to answer before/while designing the backend

1. Do photos ever leave the device? Only for prints/review/retouch, or always (so the server can gate downloads)?
2. Should the free tier exist? If yes, what exactly is free (crop only, watermarked result)?
3. Accounts, or guest checkout with email-based order lookup only?
4. Which payment stack — Stripe (cards + Google Pay + PayPal wallet) or separate PayPal integration?
5. Which print/shipping partner, and which countries are shippable?
6. Who performs expert review & retouching — in-house staff, contractors, or an automated service?
7. Single currency (USD) or multi-currency/tax (VAT/GST)?
8. Where is it hosted (Vercel + managed services, or own infrastructure)? This decides whether the backend lives in Next.js route handlers or a separate service.
9. Refund policy and how long orders/photos are retained.
10. Who maintains country spec data, and how often?

---

## 12. Ready-to-use prompt for the backend step

> I have a Next.js 16 (App Router, TypeScript) front-end called FlyFrame for creating passport and visa photos. Read `docs/FRONTEND_WORKFLOW.md` for the full frontend workflow. Photo processing is client-side (MediaPipe + Canvas) today. Design a backend architecture covering the capabilities in §10, respecting the constraints in §8, and recommend answers to the open questions in §11. Include: services and hosting, database schema, API endpoints, the payment/webhook flow, how the paid download is secured, photo storage and retention, email and print fulfilment, and a phased build order (MVP first).
