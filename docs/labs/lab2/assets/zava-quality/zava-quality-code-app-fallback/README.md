# Zava Quality Incident Tracker fallback

Use this project only when AI-assisted generation does not produce a runnable project within the Lab 2 time box.

The project contains local synthetic data and has no connector, database, backend, authentication code, or environment-specific configuration.

## Run locally

Copy this folder to a working folder outside the workshop repository, then run:

```powershell
npm install
npm run lint
npm run build
npm run dev
```

Open the local URL printed by Vite. Stop the server with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

## Publish

The project intentionally does not include `power.config.json`. Return to Task 6 in the lab to initialize it against the attendee's **Dev** environment and publish it to the **Zava Quality Operations** solution.

The fallback was validated with Node.js 22 and `@microsoft/power-apps-cli` 1.3.0.
