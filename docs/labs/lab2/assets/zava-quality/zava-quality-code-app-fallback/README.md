# Zava Quality Incident Tracker prepared project

**Owner:** Marcel Ferreira · **Last updated:** 2026-10-20 · **Status:** Draft

Use this prepared project in Task 3 of Lab 2.

## Scope

- One incident list and one required **Issue** text input, limited to 100 characters.
- Only one business field. Dataverse still supplies the row ID and other system columns.
- Real Dataverse rows after the connection is configured.
- Explicit connection-required errors and disabled saving until Dataverse is connected.

In **Task 3**, Copilot connects `loadIncidents` and `createIncident` in `src/data.ts` to your generated Dataverse service. Until then, those functions report a connection-required error.

## Prepare the local project

Follow [Task 3: Create a code app locally](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/lab2.md#task-3-create-a-code-app-locally) for the copyable commands.

1. In File Explorer on your own Windows machine or the optional workshop VM, create `C:\repo\ppcc26-alm` (create `C:\repo` first if needed). Use an empty workspace folder, not an existing Git repository; choose a different workspace folder if that path is already in use.
1. Open the workspace folder in VS Code and open an integrated PowerShell terminal. Check Node.js 22 or later, npm, and Git. Enable Copilot Chat and the Power Apps code apps plugin.
1. Use the lab's `degit` command to retrieve this prepared app from the public workshop repository's **main** branch as `zava-quality-incident-tracker`. No prior workshop clone or preloaded code is required. Use a fresh destination.
1. Use **File** > **Open Folder** to open `zava-quality-incident-tracker` in VS Code.
1. Open a new integrated terminal, run `npm ci`, then check `npx --no-install pa --version`. The project pins Power Apps CLI **1.3.0**; no global installation is needed.
1. Run `npx --no-install pa app init`, sign in with the workshop Microsoft identity, and initialize in **Dev**. Check `environmentId` in `power.config.json`.
1. Open Copilot Chat in **Agent** mode, select the code-apps **add-dataverse** skill from the `/` completions, and paste the lab's binding request. Use your workshop GitHub Copilot identity for Chat.

Copilot finds the existing **Quality Incident** table by querying Dataverse metadata, resolves its logical name, and maps `{ id, issue }` to the actual generated primary-ID and primary-name columns. Use **native Dataverse** (`--connector dataverse`) and generated typed services, not `shared_commondataserviceforapps`. If several tables match, select the one you created in **Zava Quality Operations**. Review requested edits and commands, and confirm the build succeeds before continuing.

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
