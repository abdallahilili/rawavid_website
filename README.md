# Rawafid - حلول رقمية متكاملة

Migré de **Next.js 14** vers **Vite + React + TypeScript + TailwindCSS**.

## Stack

- **Vite** 5 - bundler ultra-rapide
- **React** 18 + **TypeScript** 5
- **TailwindCSS** 3 - utility-first CSS
- **i18n maison** - Arabe (RTL) / Anglais (LTR), sans dépendance externe

## Démarrage

```bash
npm install
npm run dev
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement sur http://localhost:5173 |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualiser le build de production |

## Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Stats.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── i18n/
│   ├── index.tsx   # Context + hook useI18n
│   ├── ar.ts       # Traductions arabes
│   └── en.ts       # Traductions anglaises
├── App.tsx
├── main.tsx
└── index.css
```

## i18n

Le système i18n remplace `next-intl`. La langue est sauvegardée dans `localStorage`.

```tsx
import { useI18n } from '../i18n';

function MyComponent() {
  const { t, locale, setLocale, isRTL } = useI18n();
  return <h1>{t.hero.title}</h1>;
}
```
# rawavid_website
