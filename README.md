# SpotifyPlayer

## Development server

Run `npx nx serve spotify-player` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Tech Stack

- React/Nextjs with Redux Toolkit
- Cypress for DOM testing
- Nx to manage the repo
- Hosting on Vercel

## Limitation & Pref optimisation & Améliorations

- L'appel API est fait client-side (pour simplifier l'hydratation du store). Mais il serait plus performant de le faire en SSR
- La mise en page de réagi pas très bien sur les formats d'écran mobile
- Utilisation de bootstrap 5.3 en alpha pour utiliser le dark mode. Attendre la version stable pour passer en prod
- La couverture des tests est minimal, par faute de temps
