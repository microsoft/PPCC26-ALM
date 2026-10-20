# 🧪 Lab 2: Inner-loop ALM with Zava Quality Operations

**Owner:** Marcel Ferreira · **Last updated:** 2026-10-19 · **Status:** Draft

Create a solution, author an agent, work with a local code app, then publish the app and deploy a solution package to **UAT**.

## Lab outline

Before each task, your instructor shows a **task / estimated time** slide followed by an **expected outcome** slide.

| Activity | Estimated time |
| --- | ---: |
| Introduce the solution abstraction | 3 minutes |
| Task 1: Create a solution | 10 minutes |
| Task 2: Create an agent | 8 minutes |
| Task 3: Create a code app locally | 14 minutes |
| Task 4: Add the app and deploy the solution | 10 minutes |
| **Total, excluding the workshop break** | **45 minutes** |

## Three representations of ALM assets

| Term | Meaning | Where you see it |
| --- | --- | --- |
| **Solution package** | Exported `.zip` containing component metadata and runtime assets for deployment | Export/import and deployment pipelines |
| **Solution source** | File-based solution representation for supported components | Native solution Git integration or extracted solution files |
| **Developer source** | Editable code project, dependencies, configuration, and tests where present | Local project and its own Git repository |

The maker portal shows the live **solution in Dev**. **Metadata** describes components such as table columns and agent configuration. **Runtime assets** are built content such as JavaScript, CSS, and static files. Exporting the solution creates a **solution package** (`.zip`).

In this lab, native solution Git tracks the table, agent, and skill configuration. Keep the code app's **developer source** in its own Git repository.

## Prerequisites

- **Dev** and **UAT** from Lab 1, with Dataverse, Managed Environments, and [code apps enabled](#enable-code-apps-admin) in both. Use UAT for the test deployment.
- **Environment Maker** and **Dataverse System Administrator** access in both environments; the instructor has checked UAT dependencies and that no conflicting unmanaged Zava copy exists.
- Copilot Studio licensing and access checked for your workshop account and Dev environment, with **Microsoft Copilot harness** and **Skills > Create from blank** available. Preview or channel publishing also requires the relevant runtime capacity and permissions.
- Lab 1's Azure DevOps repository, in the same Microsoft Entra tenant as Dev, with Basic access and contribution permission.
- Workshop VM with Node.js 22 or later, Git with an author identity configured, GitHub Copilot CLI, and the Power Apps code apps plugin installed.
- A downloaded local workshop repository and the workshop Microsoft and GitHub identities. Use only the synthetic records below.

Use the prepared app in Task 3. Copilot connects it to Dataverse; you use CLI and Git commands for the remaining steps.

## Task 1: Create a solution

**Estimated time:** 10 minutes

**Expected outcome**

- The Zava publisher and preferred solution exist in Dev.
- The maker portal visualizes the solution's components.
- An empty table has **one business field: Issue**.
- Native solution Git is connected and the table schema is committed to the repository.

### Create the solution and publisher

1. Open [Power Apps](https://make.powerapps.com), select **Dev**, then **Solutions**.

   ![Power Apps environment picker with Dev selected](images/environment-list.png)

   ![Solutions in the Power Apps left navigation](images/solutions-menu.png)

1. Select **New solution**. Set **Display name** to `Zava Quality Operations`, **Name** to `ZavaQualityOperations`, and **Version** to `1.0.0.0`.
1. Select **New publisher**. Set **Display name** and **Name** to `Zava`, and **Prefix** to `zava`. If that name is used, add your initials to both names but keep the prefix. Save.

   ![New publisher form with Zava names and zava prefix](images/new-publisher.png)

1. Select the publisher, select **Set as your preferred solution**, then **Create**. Confirm the **Preferred solution** indicator.

### Create the Quality Incident table

1. Open **Zava Quality Operations**. In **Objects**, select **New** > **Table** > **Table (advanced properties)**.

   ![New menu in the solution, with Table (advanced properties) indicated by a red arrow](images/new-table-menu.png)

1. In the **New table** pane, stay on **Properties** and enter:
   - **Display name:** `Quality Incident`
   - **Plural name:** `Quality Incidents`

   ![New table Properties tab with Quality Incident and Quality Incidents](images/create-incident-table.png)

1. Select the **Primary column** tab at the top of the pane. Change its **Display name** to `Issue`. Keep the other settings at their defaults.
1. Select **Save**. Wait for the table to be created, then return to the solution's **Tables** list.

Quality Incident has **Issue** as its primary column. Dataverse supplies the row ID and other system columns. You'll add the first incident through the app in Task 3.

### Connect Git and commit the table

**Tip:** Open [your Azure DevOps organizations](https://aka.ms/azureportal-devops-orgs) to find the organization you used in Lab 1.

1. Return to **Solutions** and select **Connect to Git**.

   ![Power Apps Solutions page with Zava Quality Operations as the preferred solution and Connect to Git highlighted](images/connect-to-git.png)

1. Choose **Connection type: Solution**, your Lab 1 organization/project/repository, and **Root Git folder: PP**.

   ![Solution binding and repository settings in the Git connection dialog](images/git-connection-settings.png)

1. Select **Next**. Choose `ZavaQualityOperations`, your Lab 1 repository's `main` branch, and **Git folder** `PP/ZavaQualityOperations`.

   ![Solution, branch, and Git folder in the connection dialog](images/git-solution-folder.png)

1. Select **Connect** and wait for success.

   ![Confirmation that the solution is connected to Git](images/git-connected.png)

1. Open the solution's **Source control**. Wait for pending changes, review Quality Incident, and **Commit** with message `Add Quality Incident table`.

   ![Source control page with pending solution changes](images/solution-source-control.png)

   ![Successful commit confirmation in Power Apps](images/commit-successful.png)

1. In Azure DevOps, browse `PP/ZavaQualityOperations`. Find the table and primary-column definitions.

**Checkpoint:** The table definition is committed under `PP/ZavaQualityOperations`. Incident records are stored in Dataverse. If the Git connection or commit fails, ask your instructor for help.

## Task 2: Create an agent

**Estimated time:** 8 minutes

**Expected outcome**

- Zava Quality Guide is created with the **Microsoft Copilot harness**.
- Its `zava-quality-triage` skill contains the inspection rules and response workflow.
- You can browse the agent and skill in the solution and commit their solution source.
- You can explain **creating/saving an agent** versus **publishing it to a channel**.

### Author and inspect the agent

1. Open [Copilot Studio](https://copilotstudio.microsoft.com).
1. Open the environment picker in the lower-left corner and select **Dev**, the same environment where you created **Zava Quality Operations** in Task 1. Then, on **Home**, select the **Agent** card to create an agent powered by the **Microsoft Copilot harness**.

   ![Copilot Studio Home with arrows pointing to the environment picker in the lower-left corner and the Agent card](images/copilot-studio-environment-agent.png)

1. Set **Name** to `Zava Quality Guide`. Copy this prompt into **Instructions**:

   ```text
   You are Zava Quality Guide, an assistant for Zava's quality operations team.

   Use the zava-quality-triage skill to classify ZavaCore inspection issues and explain approved containment, escalation, and incident-closure procedures. Base policy answers on the rules in that skill.

   - Give short, practical answers using no more than five bullets.
   - State the severity level when the skill's rules provide one. Include the required containment, escalation steps, and deadlines.
   - If the skill does not cover the question, say so and direct the user to the quality lead. Never invent inspection limits, customer remedies, warranty terms, safety approvals, or legal guidance.
   - You cannot look up incident records or perform actions. Do not claim to have created, updated, closed, or deleted a record, or approved a batch release.
   - Do not include confidential, personal, or customer data.

   Use a professional, calm, and maker-friendly tone.
   ```

   Select **Save** and wait for it to finish before adding the skill.

1. In **Build** > **Skills**, select **Create from blank**. Set **Name** to `zava-quality-triage`. Paste this **Description**:

   ```text
   Classify ZavaCore inspection issues and suggest the next action. Use for questions about defects, missing traceability, quality holds, or safety concerns.
   ```

   Click inside **Instructions** and press **Ctrl+A** to select the starter text. Replace it with the complete Markdown block below:

   ```markdown
   # Zava quality triage

   Use these synthetic rules for the workshop:

   - **Severity 1 - Observation:** Minor cosmetic defect; performance, safety, and traceability unaffected. Record it and assign an owner before the shift ends.
   - **Severity 2 - Quality hold:** Missing batch or traceability record, out-of-range measurement, or misleading label. Label and isolate the batch. Notify the quality lead within four business hours. Keep it on hold until the quality lead records a disposition.
   - **Severity 3 - Critical:** Safety failure, suspected contamination, overheating, or lost traceability after leaving the controlled area. Stop work, keep people away, and notify the quality lead and site safety contact immediately.

   Choose the highest applicable severity. Ask a short question if a key detail is missing.

   Reply in up to five bullets: severity, action, who to notify, deadline, and release restriction.

   Only the assigned quality owner can close an incident. Refer questions outside these rules to the quality lead.
   ```

   Select **Create**. In **Knowledge**, remove **Search all websites** if listed, then save pending changes.

   If saving reports **access denied**, keep the editor open and ask your instructor to check Copilot Studio licensing and permissions for your account and environment. Use **Retry save** after the issue is resolved.

   ![Zava Quality Guide Build tab showing the zava-quality-triage skill and an arrow pointing to Save](images/copilot-harness-build.png)

1. Return to Power Apps > **Zava Quality Operations**, refresh, and browse **Zava Quality Guide** and its related components. The preferred solution routes these solution-aware components into this container.
1. If missing, use **Add existing** > **Agent** > **Agent**, select it, and include required objects. Ask your instructor if the agent is unavailable in the list.
1. Under **Objects** > **Agents**, open the agent's **More commands** > **Advanced** > **Add required objects**, then select **OK**. Open **Agent components** and confirm `zava-quality-triage` is included. The current maker portal may label its type **Topic**.
1. Open **Source control**, review the agent and skill changes, and **Commit** with message `Add Zava Quality Guide and triage skill`. Inspect their configuration in Azure DevOps.

If runtime capacity is available, open **Preview** and paste this question:

```text
A ZavaCore Field batch is missing its traceability record. What should I do?
```

The answer should identify **Severity 2: Quality hold**, the containment steps, notification to the quality lead **within four business hours**, and the release restriction. If capacity is unavailable, record the Preview test as **not run**.

### Creating and publishing an agent

| Action | What it does | This task |
| --- | --- | --- |
| Create / save | Stores authoring configuration and solution components | Required |
| Preview | Tests the draft in the authoring experience; requires runtime capacity | Run when available |
| Publish agent | Makes a published version available to configured channels, subject to access, licensing, and channel setup | Explain; not required here |

The skill packages the inspection rules and triage workflow as agent configuration. The code app handles incident records.

## Task 3: Create a code app locally

**Estimated time:** 14 minutes

**Expected outcome**

- Developer source exists on your machine and is committed in its own local Git repository.
- The app lists incidents and creates one using only **Issue**, backed by real Dataverse rows.
- The app runs locally, with developer source in Git and incident records in Dataverse. You'll add the app to the solution in Task 4.

### Copy and initialize the prepared project

1. From your downloaded workshop repository, copy the entire folder `docs/labs/lab2/assets/zava-quality/zava-quality-code-app-fallback` into **Documents**. Name the copy `zava-quality-incident-tracker`.
1. Right-click the copy and select **Open in Terminal**. Run:

   ```powershell
   npm ci
   npx --no-install pa app init
   ```

1. Sign in with the workshop Microsoft identity, choose **Dev**, and enter `Zava Quality Incident Tracker`. Initialization records your Dev environment in `power.config.json`.

If browser sign-in stalls, press **Ctrl+C**, run `npx --no-install pa auth login --device-code --non-interactive`, complete sign-in, and retry initialization in Dev.

![Prepared code app with one Issue field and an explicit connection-required state](images/zava-code-app.png)

The prepared app shows this screen until its Dataverse connection is configured.

### Connect once with Copilot

Start `copilot`, invoke `/code-apps-preview:add-dataverse`, and paste this request:

```text
Connect this prepared code app to the existing Quality Incident table in the Zava Quality Operations solution in this project's initialized Dev environment. Discover the table's actual logical name from Dataverse metadata, then pass it to the Power Apps CLI to generate its models and service. If more than one table matches, ask me which one to use. If discovery fails or no table matches, stop and report the error. Reuse the existing table and keep its schema unchanged.

Implement loadIncidents and createIncident in src/data.ts using that generated service. The app contract is Incident { id: string, issue: string } and NewIncident { issue: string }. Read the generated schema to map id to the actual primary ID and issue to the primary-name column displayed as Issue. Keep the existing one-field UI.

Use generated services for application data access. Read and create real rows, handle service errors explicitly, and report save success only after Dataverse confirms it. Retain loading, empty, saving, and error states. Do not use mock data, localStorage, or direct fetch/axios calls in the app. Run npm run build, then stop. Do not start a server, publish, or change Git history.
```

When the build succeeds, enter `/exit`. If table discovery, connection, or build fails, share the error with your instructor.

### Prove local data persistence

1. Run `npx --no-install pa app run` and open its **Local Play** URL, not bare localhost. Use the workshop browser profile; allow local network access if asked.
1. Confirm an empty list without a data error. Enter **Issue** `ZAVA-DEV-01: Missing traceability record` and select **Create incident**.
1. Reload. Confirm the same issue remains.
1. In the maker portal, open **Quality Incident** data in **Dev** and independently confirm that row.
1. In the solution's **Apps**, confirm the code app is not listed yet. Connecting to Dataverse and running locally are not publishing.
1. Stop the local server with **Ctrl+C**.

### Save developer source without AI

Open the copied project in Visual Studio Code. Inspect `src`, the package manifests, `power.config.json`, and generated data-source files. Then run:

```powershell
git init
git add .
git diff --cached --stat
git commit -m "Create Zava Quality Incident Tracker"
```

Review the staged files before committing. Keep required generated models/services/schemas; exclude dependencies, `dist`, caches, and secrets. A local commit is enough; no remote setup is required.

**Checkpoint:** Your local Git repository contains the developer project, and the Dev table contains the incident you created.

## Task 4: Add the app and deploy the solution

**Estimated time:** 10 minutes

**Expected outcome**

- The Dev solution contains the code app's **registration metadata + runtime assets**.
- The original developer project remains in Git.
- A managed **solution package** is exported from Dev and imported into **UAT**.
- The UAT app saves and reloads its own incident records, separately from Dev.

### Publish the app into Dev

1. Confirm **Zava Quality Operations** is still the preferred solution in **Dev**. The local server should remain stopped.
1. From the app folder, run:

   ```powershell
   npm run build
   npx --no-install pa app push
   ```

1. Wait for success and the hosted play URL. First publish uses the preferred solution automatically; refresh **Solutions** > **Zava Quality Operations** > **Apps** and confirm the app is listed.
1. Play the hosted app, read `ZAVA-DEV-01`, create `ZAVA-LIVE-01: Hosted persistence check`, then reload. Confirm the new row persists.
1. Commit the first-publish registration change:

   ```powershell
   git add power.config.json
   git commit -m "Save published app registration"
   ```

Publishing adds the app's registration metadata and built JavaScript, CSS, and static assets to the Dev solution. Keep the original React/TypeScript project in Git; the solution package cannot reliably restore it. Make future code changes in the project, then rebuild and publish.

If publishing fails with `CodeAppOperationNotAllowedInEnvironment`, follow the admin setting below. If hosted Play is blank or shows a data error, ask your instructor to investigate before exporting.

### Export a solution package and deploy to UAT

1. In **Dev**, select **Zava Quality Operations** > **Export**.
1. Select **Publish all changes**, then **Next**. Resolve reported missing required components with the instructor before continuing.
1. Confirm version `1.0.0.0`, choose **Managed**, and **Export**. Download the resulting solution `.zip`.
1. Switch Power Apps to **UAT**. Confirm the environment label before importing.
1. Select **Solutions** > **Import solution**, browse to that same managed `.zip`, and continue.
1. If prompted for connection references or environment variables, select the **UAT** connections and values. Ask your instructor about any missing dependencies.
1. Select **Import** and wait for completion. Open the imported managed solution and locate the table, agent components, and code app. Confirm `zava-quality-triage` is included, then open **Zava Quality Guide** in UAT and check its **Skills** list.
1. Play the **UAT** code app. A fresh UAT table should be empty: neither Dev test issue should have traveled. If rows already exist, verify that the two Dev markers are absent.
1. Create `ZAVA-UAT-01: UAT persistence check`, reload, and verify it in the **UAT** maker table. Confirm it does not appear in Dev. If the app shows Dev rows or the new UAT row appears in Dev, stop: the target connection is wrong.
1. Return the maker portal to **Dev** for the next lab.

**Publish all changes** prepares solution customizations for export. Channel setup and agent publication are handled separately in Copilot Studio.

**Checkpoint:** The managed solution is imported into UAT, and the UAT app can create and reload its own records. Resolve any import, dependency, or connection errors before continuing. You'll configure automated pipelines in the deployment lab.

## Enable code apps (admin)

Before the lab, an environment or Power Platform admin must check **Dev and UAT** in the [Power Platform admin center](https://admin.powerplatform.microsoft.com): **Manage** > **Environments** > environment > **Settings** > **Product** > **Features** > **Power Apps code apps** > **Enable code apps** > **Save**.

If already on, leave it unchanged. If locked or overridden, ask the instructor to check the environment-group rule.

## References

- [Microsoft Copilot harness agents](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/overview)
- [Create a skill from blank](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-create#create-a-skill-from-blank)
- [Code app ALM and solution targeting](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/alm)
- [Code apps architecture](https://learn.microsoft.com/power-apps/developer/code-apps/architecture)
- [Export solutions](https://learn.microsoft.com/power-apps/maker/data-platform/export-solutions)
- [Import solutions](https://learn.microsoft.com/power-apps/maker/data-platform/import-update-export-solutions)
- [Connect a solution to Azure DevOps](https://learn.microsoft.com/power-platform/alm/git-integration/connecting-to-azure-devops)

## Questions

Ask your workshop instructor if a step differs from your environment, access is missing, or a command fails.
