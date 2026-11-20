# Hecto – React Native (Expo) UI

Hecto design package එකෙන් හදපු Expo Router project එක.

## Run
```bash
npm install
npx expo start      # then press i / a, or scan with Expo Go
```

## Structure
- `src/theme.ts` – colours, Manrope text helper (design tokens)
- `src/components/` – Button, IconButton, Seg, StyleCard, ListRow, ToggleRow, BeforeAfter slider, Sheet, etc.
- `app/` – screens (expo-router): welcome, `onboarding/*`, `(tabs)` Create / Try On / Stencils / Profile, result, generating, print, paywall, ideas, assistant, retouch, overlay, tryon-photo, tryon-real, and sheets (tips, language, customize, consent)

## Still UI-only (backend/native work needed)
- Stencil generation, Real View (Gemini), Ideas, Assistant replies are simulated with timers / static data
- Paywall does not use real IAP (add RevenueCat / StoreKit) – review placeholders must be replaced
- 3D Try On shows body images, not a real 3D model (add `expo-gl` + three.js)
- Printing, Retouch brush drawing and Overlay filters are visual only
- Consent screen retention-policy text is a placeholder from the design
