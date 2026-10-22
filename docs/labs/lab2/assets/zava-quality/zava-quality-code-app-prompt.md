# Zava Quality Incident Tracker prompt

The main lab uses the prepared project, not AI-generated UI. Use this optional prompt only for an instructor demonstration outside the core task timing. Copy the box into GitHub Copilot after invoking `/code-apps-preview:create-app`.

```text
Create a Power Apps code app named Zava Quality Incident Tracker in the current folder using the official React/Vite template. Include @microsoft/power-apps-cli@1.3.0 as a dev dependency.

One page: an incident list displaying only Issue and a form with one required Issue text input, maximum 100 characters. The app contract is Incident { id: string, issue: string } and NewIncident { issue: string }. Use simple styling and a labeled field. No Batch ID, Product, status column, status filter, dashboard, detail page, or extra UI packages.

Prepare the UI only, with an explicit "Dataverse connection required" error and saving disabled until connected. Expose loadIncidents and createIncident in src/data.ts with that contract. Do not use sample records, in-memory persistence, or localStorage. The existing table has only the primary-name Issue business field plus Dataverse system columns; it will be connected in Task 3.

Install dependencies, then stop. Do not build, create tables, initialize, start a server, or publish, including a baseline deployment. I will initialize through the CLI, then use the Dataverse skill to connect and build.
```

For help, ask your workshop instructor.
