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

1. On your own Windows machine or the optional workshop VM, open PowerShell from Start. Check Node.js 22 or later, npm, and Git. Use a current VS Code version with access to GitHub Copilot Chat; the lab includes plugin installation.
1. Run the lab's workspace commands one at a time: `cd C:\`, `md repo\ppcc26-alm`, then `cd repo\ppcc26-alm`. Use a fresh workspace, not an existing Git repository. If the folder already exists or a command fails, stop and ask your instructor for a fresh writable workspace.
1. Use the lab's `degit` command to retrieve this prepared app from the public workshop repository's **main** branch as `zava-quality-incident-tracker`. No prior workshop clone or preloaded code is required. Use a fresh destination.
1. Run `cd zava-quality-incident-tracker`, then `code .` to open the app folder in VS Code. If `code` is not recognized, open VS Code from Start and use **File** > **Open Folder** to open the app folder.
1. Open a new integrated terminal, run `npm ci`, then check `npx --no-install pa --version`. The project pins Power Apps CLI **1.3.0**; no global installation is needed.
1. Run `npx --no-install pa app init`, sign in with the workshop Microsoft identity, and initialize in **Dev**. Check `environmentId` in `power.config.json`.
1. Follow [Install the code apps plugin in VS Code](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/lab2.md#install-the-code-apps-plugin-in-vs-code): enable agent plugins, add the Microsoft `power-platform-skills` marketplace in VS Code user settings, and install **code-apps-preview** from the `@agentPlugins` view. `npm ci` does not install these skills; GitHub Copilot CLI is not required.
1. Open a new Copilot Chat session in **Agent** mode and confirm **add-dataverse** appears in the `/` completions. Select it and paste the lab's binding request. Use your workshop GitHub Copilot identity for Chat. If the skill is missing after reloading VS Code, stop and ask your instructor.

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
