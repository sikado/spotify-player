# SpotifyPlayer

## Development server

Run `npx nx serve spotify-player` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Tech Stack

- React/Nextjs with Apollo-Client & Redux Toolkit
- Jest for unit tests without DOM
- Cypress for DOM testing
- Playwright for E2E (run on checklyHQ)
- Nx to manage the repo
- Hosting on Vercel

## ToDo

- Tests Cypress cpn
- Test state
- Review structure
- Handle loading states
- Fix responsivness

## Notes

- Utilisation de bootstrap 5.3 en alpha pour utiliser le dark mode (attendre la version stable pour passer en prod!)

## Limitation & Pref optimisation

- L'appel API est fait client-side (pour simplifier l'hydratation du store). Mais il serait plus performant de le faire en SSR

## Unhandled edge cases

-
