# Zava Quality Incident Tracker prepared project

**Owner:** Marcel Ferreira · **Last updated:** 2026-10-19 · **Status:** Draft

This is the default project for the four-task lab. The folder keeps its legacy `fallback` name so existing links remain valid; AI-generated UI is no longer required.

## Scope

- One incident list and one required **Issue** text input, limited to 100 characters.
- Only one business field. Dataverse still supplies the row ID and other system columns.
- No Batch ID, Product, incident-status column, or status filter.
- No sample rows, localStorage, or in-memory persistence in the application.
- Explicit connection-required errors and disabled saving until Dataverse is connected.

`src/data.ts` deliberately throws until **Task 3** wires `loadIncidents` and `createIncident` to your generated Dataverse service. This is not a preconnected app. One bounded Copilot request performs that environment-specific binding; no AI is needed to generate the UI, create the table, commit Git changes, or publish.

## Prepare the local project

1. Copy this entire folder from the downloaded workshop repository into **Documents** as `zava-quality-incident-tracker`.
1. Open a terminal in the copy and run `npm ci`.
1. Continue with [Task 3: Create a code app locally](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/lab2.md#task-3-create-a-code-app-locally).

Initialize in Dev, connect the existing table, and map `{ id, issue }` to the actual generated primary-ID and primary-name columns. The display name **Issue** does not guarantee a logical name of `zava_issue`. Do not create additional columns to fit an older version of the app.

After the connection and build succeed, use the CLI's Local Play URL to create an issue, reload, and independently confirm its row in Dev. Commit developer source locally. **Task 4** publishes runtime assets to the solution, then exports and imports a managed solution package into UAT.

## Validation

```powershell
npm run lint
npm run build
```

The unconnected starter should build but display a connection error, never a fake empty-data or save-success state. A successful build alone does not prove Dataverse or UAT runtime behavior.

This project pins the workshop-tested Power Apps CLI 1.3.0 and requires Node.js 22 or later. Initialization creates your `power.config.json`; no environment or credentials are shipped.

## Questions

Ask your workshop instructor if installation, binding, build, or sign-in fails. Do not switch environments or replace Dataverse with mock data.
