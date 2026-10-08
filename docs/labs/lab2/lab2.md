# 🧪 Lab 2: Inner-loop ALM with Zava Quality Operations

In this lab, you will build two components for Zava's quality team:

- **Zava Quality Guide**: an agent powered by the GitHub Copilot harness that explains an approved inspection and escalation policy.
- **Zava Quality Incident Tracker**: a Power Apps code app created from a natural-language prompt.

Both components belong to the **Zava Quality Operations** solution, but they have different authoring models. The agent is authored in Copilot Studio. The code app is authored as a normal React and TypeScript project, built locally, and then published to the solution.

The central ALM lesson is:

> **A Power Platform solution is the shared deployment boundary, but it is not always the editable source.**

## 🎯 What you will learn

By the end of this lab, you will be able to:

- Create an agent with instructions and a knowledge source.
- Inspect the agent in a Power Platform solution.
- Create and run a code app through a maker-friendly AI-assisted workflow.
- Publish the built app into a specific solution.
- Explain which source belongs in Git and which artifacts belong in the solution.

## ⏱️ Lab outline

| Activity | Time |
| --- | ---: |
| Create the solution | 3 minutes |
| Create and test the agent | 7 minutes |
| Inspect the agent in the solution | 2 minutes |
| Vibe-code and run the code app | 10 minutes |
| Publish the app into the solution | 4 minutes |
| Compare the two ALM models | 4 minutes |

## 📋 Prerequisites

Your workshop environment must have:

- Copilot Studio with the GitHub Copilot harness available.
- Power Apps code apps enabled.
- Environment Maker access in the **Dev** environment.
- A GitHub account with GitHub Copilot access.
- GitHub Copilot CLI, Node.js LTS, and Git installed.
- A workshop solution publisher selected by the instructor.

> **Account check:** GitHub Copilot uses your GitHub identity. Power Apps and Copilot Studio use your workshop Microsoft identity. Confirm both accounts before starting.

## 🏭 Scenario: Zava Quality Operations

Zava produces ZavaCore smart-material products. Its quality team needs:

1. A trusted agent that helps inspectors follow the approved inspection and escalation process.
2. A lightweight app that records and reviews quality incidents.
3. One solution that can transport both components through test and production.

You will use synthetic workshop data only. Do not enter customer, employee, or production information.

---

## 📦 Task 1: Create the Zava Quality Operations solution

The solution is the deployment boundary for the agent and code app.

1. Go to [Power Apps](https://make.powerapps.com).
1. Switch to your **Dev** environment.
1. Select **Solutions**.
1. Create a solution with these values:
   - **Display name**: `Zava Quality Operations`
   - **Name**: `ZavaQualityOperations`
   - **Publisher**: Select the workshop publisher provided by your instructor.
   - **Version**: `1.0.0.0`
1. Set **Zava Quality Operations** as your preferred solution.
1. Open the solution.
1. Copy the solution ID from the browser URL and save it for Task 5.

The URL has this shape:

```text
https://make.powerapps.com/environments/<environment-id>/solutions/<solution-id>/overview
```

> **Expected result:** Zava Quality Operations is the preferred solution, and you have saved its solution ID.

---

## 🤖 Task 2: Create the Zava Quality Guide

The Zava Quality Guide answers questions from a supplied inspection policy. This keeps the exercise focused on the agent and its ALM representation rather than on configuring a connector or database.

### Step 1: Create the agent

1. Open [Microsoft Copilot Studio](https://copilotstudio.microsoft.com).
1. Confirm that you are in the same **Dev** environment.
1. Create an agent powered by the **GitHub Copilot harness**.
1. Use the [Zava Quality Guide prompt](assets/zava-quality/zava-quality-agent-prompt.md) to define the agent.
1. In **Build**, review the generated name, description, and instructions.
1. Add [ZavaCore Quality Inspection Guide](assets/zava-quality/zava-quality-inspection-guide.md) as a knowledge source.
1. Save the agent.

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

> **Expected result:** The agent answers from the supplied inspection guide and respects its stated boundaries.

---

## 🔍 Task 3: Inspect the agent in the solution

1. Return to [Power Apps](https://make.powerapps.com).
1. Open **Zava Quality Operations**.
1. Locate **Zava Quality Guide** in the solution objects.
1. Review the related components and dependencies shown for the agent.

The solution contains the agent configuration required for ALM. The Copilot Studio authoring experience can include instructions, knowledge, tools, skills, and other capabilities. Do not assume that every authoring concept always maps to one separately editable file in an unpacked solution.

> **Key point:** Copilot Studio is the agent's authoring surface. The solution is its deployment boundary.

---

## 💻 Task 4: Vibe-code the Zava Quality Incident Tracker

The workshop uses GitHub Copilot CLI with the official Power Apps code apps plugin. Visual Studio Code remains available for viewing and editing the generated project.

### Step 1: Confirm the code apps plugin

Your instructor should preinstall the plugin. If it is not installed, start GitHub Copilot CLI:

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

1. Create an empty working folder outside the workshop content repository.
1. Open a terminal in that folder.
1. Start GitHub Copilot CLI:

   ```powershell
   copilot
   ```

1. Invoke the code-app creation skill:

   ```text
   /code-apps-preview:create-app
   ```

1. Paste the [Zava Quality Incident Tracker prompt](assets/zava-quality/zava-quality-code-app-prompt.md).
1. Replace `<environment-id>` with the ID of your **Dev** environment.
1. Review the proposed plan before approving it.
1. If the plan includes a connector, database, authentication system, or backend, ask Copilot to keep local sample data instead.
1. Approve the plan and let Copilot create the app.
1. When asked whether to deploy, choose **No**. You will publish explicitly to the Zava Quality Operations solution in Task 5.

### Step 3: Validate the local app

Open the local play URL and verify that you can:

- View synthetic quality incidents.
- Filter by product, severity, and status.
- Open the new-incident form.
- Add a local incident.

> **Expected result:** The app runs locally and uses synthetic local data only.

### Step 4: Find the editable source

Open the generated project in Visual Studio Code. Locate:

```text
src/
package.json
package-lock.json
tsconfig.json
vite.config.*
power.config.json
```

These files are the editable code-app project. This project belongs in the team's normal Git repository.

> **Behind the scenes:** The code app is a normal web project. Power Platform hosts and governs the deployed app, but the original React and TypeScript source remains in the developer's repository.

---

## 🚀 Task 5: Publish the code app into the solution

In the generated project folder, build the application:

```powershell
npm run build
```

Publish the compiled app to the solution ID you copied in Task 1:

```powershell
pa app push --solution-id <solution-id>
```

When the command completes:

1. Return to **Zava Quality Operations** in Power Apps.
1. Refresh the solution.
1. Confirm that **Zava Quality Incident Tracker** appears under **Apps**.
1. Run the published app once to confirm that it loads in the Power Apps host.

If an app was previously published without a solution, add it through **Add existing** > **App** > **Code app**.

> **Expected result:** The code app is deployed as part of Zava Quality Operations.

---

## 🧭 Task 6: Compare the source and deployment models

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
| Zava Quality Operations release | Exported solution artifact | Power Platform Pipelines through Dev, Test, and Production |

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
- Code-app source remains in Git; the solution contains its built runtime representation.
- Build from a known Git revision, publish to the development solution, and promote the resulting solution through controlled environments.

## 📚 References

- [Agents powered by the GitHub Copilot harness](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/overview)
- [Build a code app with GitHub Copilot](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/quickstart-github-copilot)
- [Application lifecycle management for code apps](https://learn.microsoft.com/power-apps/developer/code-apps/how-to/alm)
- [Power Apps code apps architecture](https://learn.microsoft.com/power-apps/developer/code-apps/architecture)
