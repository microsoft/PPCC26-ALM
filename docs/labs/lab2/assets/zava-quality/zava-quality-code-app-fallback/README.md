# Zava Quality Incident Tracker prepared project

**Owner:** Marcel Ferreira · **Last updated:** 2026-10-19 · **Status:** Draft

Use this prepared project in Task 3 of Lab 2.

## Scope

- One incident list and one required **Issue** text input, limited to 100 characters.
- Only one business field. Dataverse still supplies the row ID and other system columns.
- Real Dataverse rows after the connection is configured.
- Explicit connection-required errors and disabled saving until Dataverse is connected.

In **Task 3**, Copilot connects `loadIncidents` and `createIncident` in `src/data.ts` to your generated Dataverse service. Until then, those functions report a connection-required error.

## Prepare the local project

1. Copy this entire folder from the downloaded workshop repository into **Documents** as `zava-quality-incident-tracker`.
1. Open a terminal in the copy and run `npm ci`.
1. Continue with [Task 3: Create a code app locally](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/lab2.md#task-3-create-a-code-app-locally).

Initialize in Dev and use the lab's binding request. Copilot finds the existing **Quality Incident** table by querying Dataverse metadata, resolves its logical name, and maps `{ id, issue }` to the actual generated primary-ID and primary-name columns. If several tables match, select the one you created in **Zava Quality Operations**.

After the connection and build succeed, use the CLI's Local Play URL to create an issue, reload, and independently confirm its row in Dev. Commit developer source locally. **Task 4** publishes runtime assets to the solution, then exports and imports a managed solution package into UAT.

## Validation

```powershell
npm run lint
npm run build
```

The prepared project builds and shows a connection-required error until Task 3 is complete. After connecting it, follow the lab's Local Play and UAT data checks.

This project pins the workshop-tested Power Apps CLI 1.3.0 and requires Node.js 22 or later. Initialization creates your `power.config.json`; no environment or credentials are shipped.

## Questions

Ask your workshop instructor if installation, table discovery, binding, build, or sign-in fails.
