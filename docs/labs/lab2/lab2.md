# 🧪 Lab 2: Inner-loop ALM with Zava Quality Operations

Build a policy-guidance agent and a Dataverse-backed code app, then save and publish their components with the **Zava Quality Operations** solution.

## ⏱️ Lab outline

| Activity | Time |
| --- | ---: |
| Frame the solution abstraction | 3 minutes |
| Create the solution, table, and first Git commit | 10 minutes |
| Create and test the agent | 8 minutes |
| Inspect the agent in the solution | 2 minutes |
| Vibe-code, connect, and run the code app | 14 minutes |
| Find and save the code-app source | 2 minutes |
| Publish the app into the solution | 4 minutes |
| Compare the two ALM models | 2 minutes |
| **Total** | **45 minutes** |

## 📋 Prerequisites

- Workshop **Dev** environment with Dataverse, Managed Environments, and [code apps enabled](#enable-code-apps-admin).
- Copilot Studio's GitHub Copilot harness and uploaded-file knowledge available in **Dev**.
- **Environment Maker** and **Dataverse System Administrator** access.
- Azure DevOps repository from Lab 1, in the same Microsoft Entra tenant as **Dev**, with Basic access and permission to contribute.
- Workshop Microsoft account and a GitHub account with GitHub Copilot access.
- Workshop VM with Node.js 22 or later, Git, GitHub Copilot CLI, and the Power Apps code apps plugin installed.

---

## 📦 Task 1: Create the solution, table, and first Git commit

Use only the synthetic workshop data shown below.

Some screenshots are reused from last year's workshop and show **Contoso Real Estate**. Use the **Zava** names and your own workshop organization and repository in the steps below.

### Step 1: Create the solution

1. Go to [Power Apps](https://make.powerapps.com).
1. Switch to your **Dev** environment.

   ![Power Apps environment picker with Dev selected](images/environment-list.png)

1. Select **Solutions**.

   ![Solutions in the Power Apps left navigation](images/solutions-menu.png)

1. Select **New solution** and enter these values:
   - **Display name**: `Zava Quality Operations`
   - **Name**: `ZavaQualityOperations`
   - **Publisher**: Select **New publisher**. Enter **Display name** `Zava`, **Name** `Zava`, and **Prefix** `zava`. If the name is already used, add your initials to both names and keep the prefix `zava`. Leave the other settings unchanged and select **Save**.
   - **Version**: `1.0.0.0`

   ![New publisher form with Zava as the display name and name, and zava as the prefix](images/new-publisher.png)

1. Select your new publisher, select **Set as your preferred solution**, then select **Create**.
1. Return to **Solutions**.
1. Confirm that the solution shows the **Preferred solution** indicator.

### Step 2: Create the incident table

1. Open **Zava Quality Operations** and select **Objects**.
1. Select **New** > **Table** > **Table (advanced properties)**. If **New** is hidden, open **More commands**.
1. Enter **Display name** `Quality Incident` and **Plural name** `Quality Incidents`.

   ![New table Properties tab with Quality Incident as the display name and Quality Incidents as the plural name](images/create-incident-table.png)

1. Select the **Primary column** tab, change **Display name** to `Issue`, and select **Save**. Leave the other settings unchanged.
1. Open **Columns** > **New column**. Add `Batch ID`, `Product`, and `Incident status`, using **Single line of text** for each. Save each column.
1. Return to the table overview. In **Properties** > **Advanced options**, copy the table's **Logical name** for Task 4.
Leave the table empty. You will create the first incident through the app in Task 4.

Use the custom **Incident status** text column, not Dataverse's built-in **Status**. Only the code app uses this table; you do not need to configure table search or indexing for this lab.

### Step 3: Connect the solution to Git

1. In **Solutions**, select **Connect to Git**.

   ![Connect to Git on the Solutions command bar](images/connect-to-git.png)

1. In the connection dialog, select:
   - **Connection type**: **Solution**
   - **Organization**, **Project**, and **Repository**: The ones prepared in Lab 1
   - **Root Git folder**: `PP`

   ![Git connection dialog showing solution binding and repository settings](images/git-connection-settings.png)

1. Select **Next**, then select:
   - **Solution**: `ZavaQualityOperations`
   - **Branch**: The repository's existing `main` branch
   - **Git folder**: `PP/ZavaQualityOperations`

   ![Git connection dialog showing the solution, branch, and Git folder](images/git-solution-folder.png)

1. Select **Connect** and wait for the success message.

   ![Success message confirming that the solution is connected to Git](images/git-connected.png)

If no organization is available, ask your workshop instructor for help. Do not create another organization or use one from a different tenant.

### Step 4: Commit and inspect the table schema

1. Open **Zava Quality Operations** and select **Source control**.

   ![Source control page with the Commit command and pending solution changes](images/solution-source-control.png)

1. Wait for the pending changes to finish processing. Review the changes for **Quality Incident**, then select **Commit**.
1. Enter `Add Quality Incident table` as the commit message and confirm the commit.

   ![Successful commit confirmation in Power Apps](images/commit-successful.png)

1. Open the repository in Azure DevOps. Under `PP/ZavaQualityOperations`, inspect the committed table and column definitions.
1. Find the definitions for **Issue**, **Batch ID**, **Product**, and **Incident status**.

The commit contains the table schema, not business rows. The incidents you create in Task 4 stay in Dev; they are not transported by the solution.

If the commit reports an error, ask your workshop instructor for help before continuing.

> **Expected result:** The solution is preferred and connected to Git. The empty Quality Incident table has its schema committed before you create the agent.

---

## 🤖 Task 2: Create the Zava Quality Guide

The Zava Quality Guide explains approved inspection procedures from the supplied policy file. It does not look up or change incident records.

### Step 1: Create the agent

1. Open [Microsoft Copilot Studio](https://copilotstudio.microsoft.com).
1. Confirm that you are in the same **Dev** environment.
1. Create an agent powered by the **GitHub Copilot harness**.
1. Set **Name** to `Zava Quality Guide`.
1. Paste only the text in the [Zava Quality Guide prompt](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/assets/zava-quality/zava-quality-agent-prompt.md) box into **Instructions**.

   ![Example of the Build tab with agent instructions and the components panel](images/copilot-harness-build.png)

   This example is from [Microsoft Learn](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/overview). Your agent will be named **Zava Quality Guide**.

1. In **Build**, remove **Search all websites** if it is listed. The inspection guide must be the only knowledge source.
1. Download the [ZavaCore Quality Inspection Guide](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/assets/zava-quality/zava-quality-inspection-guide.md) using **Download raw file** in GitHub.
1. In **Build**, select **Knowledge** in the components panel and upload the guide. If prompted, select **Add** or **Save**. Wait until the source shows **Ready**.
1. Save any pending agent changes.

If file upload is unavailable or the source does not become ready, ask your workshop instructor for help.

### Step 2: Test a supported question

In **Preview**, ask:

> A ZavaCore Field batch is missing its traceability record. What should I do?

The agent should:

- Classify the issue as a quality hold.
- Tell you to stop movement and isolate the batch.
- Ask you to record the batch ID and evidence.
- Direct you to notify the quality lead within four business hours.

### Step 3: Test the agent's boundary

Ask:

> What customer discount should I offer for this issue?

The inspection guide does not define customer discounts. The agent should say that the answer is not in its approved source and direct you to the appropriate owner instead of inventing a policy.

> **Expected result:** The agent answers the inspection-policy question from the guide and declines to invent an answer about customer discounts.

---

## 🔍 Task 3: Inspect and save the agent in Git

1. Return to [Power Apps](https://make.powerapps.com).
1. Open **Zava Quality Operations**.
1. Refresh the solution and locate **Zava Quality Guide** in the solution objects.
   - If it is not listed, select **Add existing** > **Agent** > **Agent**, select **Zava Quality Guide**, and select **Add**. Include the required objects when prompted.
   - If the agent is not available to add, ask your workshop instructor for help before continuing.
1. Review the related components and dependencies shown for the agent.
1. Select **Source control**, as you did for the table in Task 1.
1. Wait for the pending changes to finish processing, then select **Commit**.
1. Enter `Add Zava Quality Guide` as the commit message and confirm the commit.
1. Open the repository in Azure DevOps and look in `PP/ZavaQualityOperations` for the committed solution files.

The solution contains the agent configuration required for ALM. The Copilot Studio authoring experience can include instructions, knowledge, tools, skills, and other capabilities. Do not assume that every authoring concept always maps to one separately editable file in an unpacked solution.

> **Expected result:** The agent configuration is saved in a second commit, separate from the table-schema commit.

---

## 💻 Task 4: Vibe-code the Zava Quality Incident Tracker

The workshop uses GitHub Copilot CLI with the official Power Apps code apps plugin. Visual Studio Code remains available for viewing and editing the generated project.

### Enable code apps (admin)

An environment or Power Platform admin must confirm this setting before the lab:

1. Open the [Power Platform admin center](https://admin.powerplatform.microsoft.com) and select **Manage** > **Environments** > your workshop **Dev** environment.
1. Open **Settings** > **Product** > **Features**.
1. Under **Power Apps code apps**, turn on **Enable code apps** and select **Save**.

If it is already on, leave it unchanged. If the setting is locked, ask your instructor to check the environment-group rule.

### Step 1: Confirm the code apps plugin

The code apps plugin should already be installed. Confirm it from PowerShell:

```powershell
copilot plugin list
```

If `code-apps-preview@power-platform-skills` is not listed, start GitHub Copilot CLI:

```powershell
copilot
```

In the Copilot session, run:

```text
/plugin marketplace add microsoft/power-platform-skills
/plugin install code-apps-preview@power-platform-skills
```

Close and reopen the terminal after installation.

### Step 2: Create the app

1. In File Explorer, create an empty folder named `zava-quality-incident-tracker` in **Documents**, outside the workshop content repository.
1. Right-click the folder and select **Open in Terminal**.
1. Start GitHub Copilot CLI:

   ```powershell
   copilot
   ```

1. Invoke the code-app creation skill:

   ```text
   /code-apps-preview:create-app
   ```

1. Open the [Zava Quality Incident Tracker prompt](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/assets/zava-quality/zava-quality-code-app-prompt.md) and paste only the text in its prompt box.
1. Review the proposed plan before approving it.
1. Approve the local-only plan. Copilot creates the app and installs its dependencies. It must not create tables, initialize, start a server, or deploy yet.
1. When the project is ready, enter `/exit` to return to PowerShell. Stay in the app folder.

If generation takes more than five minutes, use the prepared [fallback UI project](https://github.com/microsoft/PPCC26-ALM/blob/main/docs/labs/lab2/assets/zava-quality/zava-quality-code-app-fallback/README.md), then continue with Step 3 below. Both paths connect to your table in the next step.

### Step 3: Connect to Dataverse

Initialize the app from PowerShell in the app folder:

```powershell
npx --no-install pa app init
```

Complete the browser sign-in with your workshop Microsoft identity. Follow the prompts to select **Dev** and enter `Zava Quality Incident Tracker` as the display name. The CLI creates `power.config.json`, which records the app's environment and publishing settings.

If browser sign-in waits without completing, press **Ctrl+C** and run:

```powershell
npx --no-install pa auth login --device-code --non-interactive
```

Complete the device-code sign-in with your workshop Microsoft identity, then run `npx --no-install pa app init` again.

Start `copilot` again and invoke the Dataverse skill:

```text
/code-apps-preview:add-dataverse
```

Paste this request, replacing `<table-logical-name>` with the logical name you noted in Task 1:

```text
Connect this initialized code app to the existing Dataverse table <table-logical-name>. Do not create tables. Use the Power Apps CLI to add the data source and its generated service to list and create incidents. Map Issue (primary name), Batch ID, Product, and Incident status from the actual generated schema. If this is the fallback project, implement loadIncidents and createIncident in src/data.ts.

New incidents have Incident status Open. Start with the table's real rows, including an empty table; do not seed sample rows or use in-memory/localStorage substitutes. Keep the existing list, status filter, and three-field form. Show loading, empty, saving, and error states; report success only after Dataverse saves. Prepare one production build, then stop. Do not start a server or publish.
```

The documented connection command is `npx --no-install pa app add data-source --connector dataverse --table <table-logical-name>`. Copilot runs it and uses the generated models and services; you do not need to write API calls or configure a separate Azure subscription for this Dataverse connection.

When Copilot reports that the connection and build succeeded, enter `/exit`. If the table is not found or access is denied, check the selected environment and table logical name with your instructor. Do not substitute mock data.

### Step 4: Validate the local app

Run the app through the Power Apps CLI:

```powershell
npx --no-install pa app run
```

Open the URL labeled **Local Play**, not the plain Vite localhost URL. Use the same browser profile that is signed in to your workshop Power Platform tenant. If the browser asks to allow local network access, allow it for this local test.

1. Confirm that the new table shows an empty incident list without an error. An error loading data is not an empty list.
1. Add an incident with batch ID `ZAVA-TEST-01`, product **ZavaCore Field**, and issue `Missing traceability record`. It should appear with status **Open**. Clear the status filter if needed.
1. Select **Closed** to hide the Open incident, then **All statuses** to show it again.
1. Refresh the page. Confirm that the incident is still present.
1. In Power Apps, open **Zava Quality Operations** > **Tables** > **Quality Incident** and view its data. Confirm that the same batch ID and issue are stored in Dataverse.

![Prepared Zava code-app UI with a status filter and a new-incident form, before its environment-specific Dataverse connection](images/zava-code-app.png)

Your generated design may differ from this prepared example. The list, filter, and add-incident behavior should be the same.

Stop the local server with **Ctrl+C** when you finish.

If sign-in fails or **Dev** is not available, ask your workshop instructor for help. Do not select the default environment as a substitute.

> **Expected result:** The app runs through Power Apps Local Play, saves a synthetic incident to Dataverse, and retrieves it after a refresh.

---

## 🌿 Task 5: Find and save the code-app source

The code-app project is separate from the solution files you committed through Power Apps in Task 3.

1. Open the app folder in Visual Studio Code using **File** > **Open Folder**.
1. In **Explorer**, locate:
   - **src**: The editable app code.
   - **package.json** and **package-lock.json**: The project's dependencies and build commands.
   - **power.config.json**: The Power Apps configuration created in Task 4.
   - Generated data-source models, services, and schema files required by the app.
1. Return to PowerShell in the app folder and start `copilot`. Ask:

   ```text
   Save this code-app project in a local Git repository. Commit the source, project configuration, and required generated data-source models, services, and schema files with the message "Create Zava Quality Incident Tracker". Exclude node_modules, dist, local caches, and secrets. Do not push to a remote repository.
   ```

1. Confirm that Copilot reports a successful commit, then enter `/exit`.

For this lab, a local commit is enough. In a team, push this project to a shared repository and review changes before publishing.

> **Expected result:** The editable code-app source is saved in Git. You did not edit generated files in **dist** or copy the project into the solution's Git folder.

---

## 🚀 Task 6: Publish the code app into the solution

The app was already built in Task 4. You have not changed its code since then, so you can publish that build.

1. In Power Apps, confirm that **Zava Quality Operations** is still your preferred solution in **Dev**.
1. From PowerShell in the app folder, publish the app:

   ```powershell
   npx --no-install pa app push
   ```

1. Wait for the CLI to report success and a Power Apps play URL.
1. First publish saves the app ID in **power.config.json**. Start `copilot` in the app folder and ask:

   ```text
   Review and commit the first-publish change in power.config.json with the message "Save published app registration". Do not include unrelated changes or secrets. Do not change app source, rebuild, or push to a remote repository.
   ```

1. Confirm that Copilot reports a successful commit, then enter `/exit`.
1. Return to **Solutions** > **Zava Quality Operations**, refresh, and select **Apps**.
1. Confirm that **Zava Quality Incident Tracker** appears, then play it. With the local server still stopped, check that **ZAVA-TEST-01**, saved in Task 4, is visible.
1. Add an incident with batch ID `ZAVA-LIVE-01`, product **ZavaCore Field**, and issue `Missing traceability record`.
1. Refresh the published app and confirm that **ZAVA-LIVE-01** is still visible.

On the first publish, the CLI uses your preferred solution automatically. You do not need to copy an environment or solution ID from a URL.

If you changed the app code after Task 4, ask Copilot to prepare a new production build before running the publish command.

If publishing fails or the app is missing from the solution, ask your workshop instructor for help. Do not publish to another environment.

If Play stays blank or reports a data error, ask your instructor for help. A successful publish alone does not prove the app works.

For `CodeAppOperationNotAllowedInEnvironment`, ask your instructor to follow the [Enable code apps (admin)](#enable-code-apps-admin) steps above.

> **Expected result:** The code app is deployed as part of Zava Quality Operations, its registration change is saved in Git, and the published app reads and saves real Dataverse incidents that survive a refresh.

---

## 🧭 Task 7: Compare the source and deployment models

The same code app now exists in two forms:

| Location | What it contains | How to use it |
| --- | --- | --- |
| Code-app Git repository | React or TypeScript source, tests, package manifests, lockfile, and build configuration | Edit, review, branch, merge, test, and rebuild |
| Power Platform solution | App registration metadata and built runtime artifacts such as bundled JavaScript, CSS, and static assets | Export, import, deploy, and govern |

The solution does not contain the authoritative original React or TypeScript project. Unpacking the solution cannot reliably restore the original modules, comments, tests, or project structure.

Power Apps code apps also do not currently support Power Platform Git Integration as a source-code integration mechanism. Keep the editable project in a normal Git repository and build it before publishing its runtime output to the solution.

> **Do not edit generated bundle files.** Change the source project, rebuild it, and publish the new output.

### Recommended Zava ALM strategy

| Component or artifact | Source of truth | Promotion path |
| --- | --- | --- |
| Zava Quality Guide | Copilot Studio authoring configuration | Power Platform solution |
| Zava Quality Incident Tracker source | External Git repository | Build and publish into the development solution |
| Code-app runtime payload | Generated from the tagged source revision | Power Platform solution |
| Quality Incident table schema | Dataverse table and column definitions, saved through solution Git integration | Power Platform solution |
| Zava Quality Operations release | Exported solution artifact | Power Platform Pipelines through Dev, Test, and Production |

The solution transports the table schema, not the incident rows. Test and Production need their own data; the synthetic Dev incident does not automatically travel with a solution import.

The complete flow is:

```text
Copilot Studio authoring ───────────────────────────────┐
                                                       v
Code-app Git source -> build -> compiled runtime -> Zava Quality Operations solution
                                                       |
                                                       v
                                            Test -> Production
```

> **Expected outcome:** You created an agent and code app in one solution and can explain why their editable sources follow different ALM paths.

## ✅ Key takeaways

- A solution is the shared deployment boundary, not a universal authoring format.
- Agent configuration is authored in Copilot Studio and transported through the solution.
- The agent explains inspection policy; the code app records and displays incidents. Both belong to the same solution.
- Code-app source remains in Git; the solution contains its built runtime representation.
- Dataverse stores the app's incident rows. The solution transports their table schema, not the rows themselves.
- Build from a known Git revision, publish to the development solution, and promote the resulting solution through controlled environments.

## 📚 References

- [Agents powered by the GitHub Copilot harness](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/overview)
- [Enable code apps in a Power Platform environment](https://learn.microsoft.com/power-apps/developer/code-apps/overview#enable-code-apps-on-a-power-platform-environment)
- [Build a code app with GitHub Copilot](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/quickstart-github-copilot)
- [Create, run, and publish a code app with the Power Apps CLI](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)
- [Create and edit Dataverse tables](https://learn.microsoft.com/power-apps/maker/data-platform/create-edit-entities-portal)
- [Connect a code app to Dataverse](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/connect-to-dataverse)
- [Connect a solution to Azure DevOps](https://learn.microsoft.com/power-platform/alm/git-integration/connecting-to-azure-devops)
- [Application lifecycle management for code apps](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/alm)
- [Power Apps code apps architecture](https://learn.microsoft.com/power-apps/developer/code-apps/architecture)

## Questions

Ask your workshop instructor for help if a step does not match your environment or a command reports an error.
