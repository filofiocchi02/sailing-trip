# Youth Sailing

Youth Sailing is a React/Vinext trip-planning site for organising a shared
sailing trip in Croatia. It is deployed as a static site on Firebase Hosting.

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The app uses the Firebase browser SDK when the `VITE_FIREBASE_*` values in
`.env.local` are present. Copy `.env.example` to `.env.local` and add the
Firebase web-app configuration for local authentication and Firestore use.

## Build and deploy

```bash
npm run build
firebase deploy --only hosting:youth-sailing --project apollo-duck
```

Firebase Hosting serves the generated files from `dist/client`. The static
build includes pages for `/`, `/login`, `/apply`, `/waitlist`, `/dashboard`,
and `/admin`.

## Project structure

- `src/app/` — React pages, shared styles, and Firebase helpers
- `public/` — favicon, photos, and the Croatia coastline asset
- `firebase.json` — Firebase Hosting configuration
- `.firebaserc` — Firebase project selection
- `tests/` — build/render smoke tests

Authentication and payment flows are currently mockable/demo-ready. Firebase
Authentication and Firestore integration are present for the waitlist flow;
payment processing and server-enforced admin permissions will be added later.
