# Zava Quality Incident Tracker fallback

**Last updated:** October 16, 2026

Use this UI starter when AI-assisted generation takes more than five minutes.

The project has the same small scope as the prompt: one incident list, one status filter, and a three-field add-incident form. It has no sample rows or in-memory persistence. It is not yet connected to your environment: the data functions explicitly report that Dataverse must be connected, and saving stays disabled.

Task 4 uses the Dataverse skill to generate your table's models and service, implement `loadIncidents` and `createIncident` in `src/data.ts`, and build the project. This environment-specific step is required; this starter is not a preconnected app.

## Prepare the project

1. In File Explorer, copy this entire folder from the downloaded workshop repository to **Documents**. Name the copy `zava-quality-fallback`.
1. Right-click the copy and select **Open in Terminal**.
1. Install the project's dependencies:

   ```powershell
   npm ci
   ```

## Return to the lab

Continue at [Task 4, Step 3: Connect to Dataverse](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/lab2.md#step-3-connect-to-dataverse). Initialize in **Dev**, then follow the lab's `/code-apps-preview:add-dataverse` request with the logical name of the table you created in Task 1.

After Copilot connects the table and prepares the build, continue to Step 4 to run through the Power Apps CLI and open **Local Play**. Add an incident, refresh, and verify that it remains in Dataverse. Then complete Tasks 5 and 6 to save the source and publish into **Zava Quality Operations**.

This project includes the workshop-tested Power Apps CLI 1.3.0 and requires Node.js 22 or later. It intentionally does not include `power.config.json`; initialization creates it for your environment.

## Questions

Ask your workshop instructor if installation, the build, or sign-in fails. Do not switch to the default environment.
