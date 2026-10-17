# Zava Quality Incident Tracker prompt

**Last updated:** October 17, 2026

Copy only the text in the box into GitHub Copilot after invoking `/code-apps-preview:create-app`.

```text
Create a Power Apps code app named Zava Quality Incident Tracker in the current folder using the official React/Vite template. Include @microsoft/power-apps-cli@1.3.0 as a dev dependency.

One page: an incident list (batch ID, product, issue, status), one status filter (All statuses, Open, On hold, Closed), and an add-incident form with required batch ID, product (ZavaCore Field or ZavaCore Systems), and issue. Use simple styling and labeled fields. No dashboard, detail page, or extra UI packages.

Prepare the UI only, with a clear "Dataverse connection required" state and saving disabled until connected. Do not use sample records, in-memory persistence, or localStorage. An existing Dataverse table will be connected in the next lab step.

Install dependencies, then stop. Do not build, create tables, initialize, start a server, or publish, including a baseline deployment. I will initialize through the CLI, then use the Dataverse skill to connect and build.
```

For help, ask your workshop instructor.
