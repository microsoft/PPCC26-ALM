# 🧪 Lab 4: Power Pages

## Table of Contents

- [Pre-requisites](#-pre-requisites)
- [Overview](#️-overview)
- [Tasks](#-tasks)
  1. [Create Power Pages site](#️-create-power-pages-site)
  1. [Add site to solution](#-add-site-to-solution)
  1. [Connect the solution to the repository](#-connect-the-solution-to-the-repository)
  1. [Configure Power Pipelines](#-configure-power-pipelines)
  1. [Deploy to Production](#-deploy-to-production)
  1. [Activate the site in Production](#️-activate-the-site-in-production)
  1. [Committing changes to Source Control](#️-committing-changes-to-source-control)
  1. [Cloning the repository locally](#-cloning-the-repository-locally)
  1. [Editing the site in VS Code](#-editing-the-site-in-vs-code)
  1. [Pulling changes in Solution Explorer](#️-pulling-changes-in-solution-explorer)
  1. [Updating Environment Variables](#️-updating-environment-variables)
  1. [Deploy the updated solution to Production](#️-deploy-the-updated-solution-to-production)
  1. [Verify changes](#-verify-changes)
  1. [Optional: Manage and deploy a single-page application](#-optional-manage-and-deploy-a-single-page-application)
  1. [Optional: Use Power Platform Tools and the PAC MCP server](#optional-use-power-platform-tools-and-the-pac-mcp-server)
  1. [Optional: Install the Power Pages AI plugin for GitHub Copilot CLI](#optional-install-the-power-pages-ai-plugin-for-github-copilot-cli)

## 📋 Pre-requisites

1. Complete Labs 1 through 3.
1. Confirm that the environments are named **Dev**, **Hotfix**, **UAT**, and **Production**, as specified in Lab 1.
1. Confirm that the Azure DevOps Power Platform project repository from Lab 1 is initialized and that you can access it.
1. Confirm that **Dev** and **Production** are Managed Environments.
   Git integration requires **Dev** to be managed, and the deployment target must also be managed.
   Refer to the Managed Environments steps in Lab 3 and the [Git integration prerequisites](https://learn.microsoft.com/power-platform/alm/git-integration/connecting-to-azure-devops#prerequisites).
1. Install VS Code Desktop from this [download link](https://code.visualstudio.com/download).
1. Install Git from this [download link](https://git-scm.com/install/windows).
1. Use environments with Early Release Cycle features enabled. These features are enabled by default in the workshop environments.

## 🗒️ Overview

In this lab, you will create a Power Pages site in **Dev**, add it to the **PPCCALMDev** solution, and connect that solution to the Azure DevOps repository created in Lab 1.
You will deploy the solution to **Production**, edit the site through the repository, and use an environment variable to configure local sign-in differently in each environment.

## 🎯 Tasks

### 🏗️ Create Power Pages site

1. Open [Power Pages Maker Studio](https://make.powerpages.microsoft.com/) in a new tab.

1. You will see the first run experience. Click on **Get Started** button.

    ![Get Started](images/getting-started.png)

1. Select any industry you want, for example **Finance** and click on **Next**.

    ![Select Industry](images/select-industry.png)

1. Select any of the suggestions or you can also write your own prompt and click on **Build my site**.

    ![Build My Site](images/select-site.png)

1. Change the site name to **PPCC ALM Dev** and click on **Next**.

    ![Site Name](images/site-name.png)

1. If the layout looks good, click on **Next**.

    ![Site Layout](images/site-layout.png)

1. Select few pages to be included in the site and click on **Next**.

    ![Select Pages](images/select-pages.png)

1. Wait for the site to be created.

### 📦 Add site to solution

1. Once the **PPCC ALM Dev** site is ready, navigate to Solutions Explorer and click on **New Solution** to create a new solution.

    ![New Solution](images/new-solution.png)

1. Name the solution **PPCCALMDev**, select **CDS Default Publisher** from Publisher dropdown and click **Create**.

    ![Create New Solution](images/create-new-solution.png)

1. Click on **Objects** from the left menu.

    ![Objects Menu](images/objects-menu.png)

1. Click on **Add Existing** button and select **Site** from the dropdown.

    ![Add Existing Site](images/add-existing-site.png)

1. Select the site and click on **Next**.

1. Select **Include All Objects** and click on **Add**.

    ![Include All Objects](images/include-all-objects.png)

    _Note: You can also include specific objects by clicking **Edit Objects** and selecting them individually._

1. Once the site and its related objects are added to the solution, you will see something like below:

    ![Solution with Site](images/solution-with-site.png)

### 🔗 Connect the solution to the repository

Lab 1 created and initialized the **Power Platform** Azure DevOps project and repository.
In this lab, configure solution-scoped Git integration and connect **PPCCALMDev** to the Lab 1 repository before committing it.
Use `PP` as the root Git folder for this lab.
If solution-scoped Git integration is already configured for the Lab 1 repository, keep the existing connection and go directly to the **PPCCALMDev** solution binding below.

1. In the **Dev** environment, go to **Solutions** and select **Connect to Git**.

    ![Connect to Git](images/connect-to-git.png)

1. Configure the connection using these settings:

    - **Connection type**: Solution
    - **Organization**: Your Azure DevOps organization from Lab 1
    - **Project**: Power Platform
    - **Repository**: Power Platform
    - **Branch**: `main`
    - **Root Git folder**: `PP`

    ![Example solution-scoped Git connection using PP as the root folder](images/connect-to-git-repo.png)

    _The image is an edited example using the organization name `ppcc2026-example`.
    Select your own organization and the project and repository created in Lab 1._

1. Click **Connect** to open the solution connection page.

1. On the solution connection page, use these settings:

    - **Solution**: PPCCALMDev
    - **Branch**: `main`
    - **Git folder**: `PP/PPCCALMDev`

1. Click **Connect** and wait for the operation to complete before continuing.
   The commit button remains unavailable while Git integration processes the solution components.

### 🚀 Configure Power Pipelines

1. Select the newly created solution and click on **Pipelines** from the left menu.

    ![Pipelines Menu](images/pipelines-menu.png)

1. Click on **Create Pipeline** button to create a new pipeline.

    ![Create Pipeline](images/create-pipeline.png)

1. Name the pipeline **PPCC ALM Workshop pipeline**, select **Production** as the target environment, and click **Save**.

    ![Create Pipeline](images/create-pipeline-2.png)

1. Once the pipeline is created, you will see something like below:

    ![Pipeline Created](images/pipeline-created.png)

### 🚀 Deploy to Production

1. Click **Deploy Here** for the **Production** stage.

    ![Deploy Here](images/deploy-here.png)

1. If a Managed Environment warning appears, confirm that **Production** is a Managed Environment and click **Continue**.
If Production is not managed, stop the deployment and use the steps from Lab 3 to enable Managed Environments before trying again.

1. On **Destination**, verify that **Production** is selected and click **Next**.

1. If an **Environment variables** page appears, provide any required target values and click **Next**.
The first deployment may skip this page because the solution does not yet contain an environment variable.

1. On **Summary**, review the deployment details and click **Deploy**.

    ![Deploy Solution](images/deploy-solution.png)

1. Wait for the deployment to complete.

    ![Deployment in Progress](images/deployment-in-progress.png)

1. Once the deployment is complete, switch to **Production** from the environment selector in Power Pages Maker Studio.

    ![Switch Environment](images/switch-environment.png)

### 🏗️ Activate the site in Production

1. Click on **Inactive Sites** tab to view the list of inactive sites.

    ![Inactive Sites](images/inactive-sites.png)

1. Click **Reactivate**.
When prompted, enter or accept a unique generated web address for the Production site, then complete the reactivation.

    ![Reactivate Site](images/reactivate-site.png)

1. Reactivation may remain on **Getting things ready** after the site is usable.
Return to **Home** or **Active sites** and confirm that the site appears there before previewing it.

    > **Troubleshooting:** If preview shows **Page Not Found** or the site is not ready, wait a few minutes, refresh **Active sites**, and open the site again.
    > Site provisioning and reactivation can continue after the initial status page stops updating.

1. Preview the site by clicking **Preview**.
Workshop sites are expected to be **Private**, so select the Microsoft account that you use for the workshop when prompted before the portal page opens.

    ![Preview Site](images/preview-site.png)

### 🛠️ Committing changes to Source Control

1. Go back to **Dev**, navigate to **Solutions Explorer**, and select the connected **PPCCALMDev** solution.

1. Select **Source Control** from the left menu.

    ![Source Control Menu](images/source-control-menu.png)

1. Verify that the **Changes** tab lists the solution changes and click **Commit**.

    ![Commit Changes](images/commit-changes.png)

1. Enter a commit message and click **Commit**.

    ![Enter Commit Message](images/enter-commit-message.png)

1. After the commit is successful, click on the commit id to navigate to Azure DevOps and see the changes reflected in the repository.

    ![View Commit in Azure DevOps](images/view-commit-in-ado.png)

1. Notice that there are 3 folders created under `PP/PPCCALMDev` in the repository:
    1. **powerpagesites** - Contains the Power Pages site related files
    1. **solutions** - Contains the solution related files
    1. **publishers** - Contains the publisher information

    ![Repository structure under PP/PPCCALMDev in the Power Platform repository](images/repo-structure.png)

    _The image is an edited example using the organization name `ppcc2026-example`.
    Your organization name will differ._

### 💻 Cloning the repository locally

1. Click on **Files** from the left menu in Azure DevOps to go to the repository view.

    ![Repository View](images/repo-view.png)

1. Click on **Clone** button and then click on **Clone in VSCode**.

    ![Clone Button](images/clone-button.png)

    ![Clone in VSCode](images/clone-in-vscode.png)

1. This will open VS Code Desktop and prompt for the local path to clone the repository.

1. It will ask for authentication, provide your Azure DevOps credentials.

1. If asked to automatically sign-in, select **No, this app only**.

   ![VS Code Sign-in](images/vscode-signin.png)

1. Click on **Open** to open the cloned repository in VS Code.

    ![Cloned Repository in VS Code](images/cloned-repo-vscode.png)

### 💻 Editing the site in VS Code

1. Create a new branch by clicking on Source Control icon from the left menu and then More -> Branch -> Create New Branch. Give the branch name as **feature/add-welcome-message**

    ![Create New Branch](images/create-new-branch.png)

1. Open **Home.webpage.copy.html** file and use GitHub Copilot to add a welcome message to the home page. Click on **Keep** once the Copilot is completed making the changes.

    ![Edit Home Page](images/edit-home-page.png)

1. Once the edits are done, save the file and commit and push the changes.

    ![Commit Changes in VS Code](images/commit-changes-vscode.png)

1. Now, go back to Azure DevOps repo and refresh the page. You will see a new branch created named **feature/add-welcome-message**. Click on **Create a pull request** button.

    ![Create Pull Request](images/create-pull-request.png)

1. You will see the changes made in the pull request. Click on **Create** button to create the pull request.

1. Click on **Files** tab to review the changes and then click on **Complete** button to complete the pull request.

    >**Tip**: In real-world scenarios, you would typically have another team member review the pull request before completing it.

    ![Complete Pull Request](images/complete-pull-request.png)

### 🛠️ Pulling changes in Solution Explorer

1. Go back to **Power Pages Maker Studio** in **Dev** environment and navigate to **Solutions Explorer**.

1. Select **Source Control** from the left menu and click on **Check for updates** button. _This might take a while._

    ![Check for Updates](images/check-for-updates.png)

1. Click on **Pull** button to pull the latest changes in the solution. _This might take a while._

    ![Pull Changes](images/pull-changes.png)

### 🛠️ Updating Environment Variables

1. From the **Active Sites** tab, click **Power Pages Management** for your site.

    ![Power Pages Management](images/power-pages-management.png)

1. Click **Site Settings**.

    ![Site Settings](images/site-settings.png)

1. In the **Name** column, open the column filter and filter for the exact value `Authentication/Registration/LocalLoginEnabled`.
Open the matching site setting.

1. Change the value of **Source** to **Environment Variable**.

    ![Change Source to Environment Variable](images/change-source-to-env-var.png)

1. Create a new environment variable by selecting the text box and clicking on **New**.

    ![Create New Environment Variable](images/create-new-env-var.png)

1. Click on **Discard Changes** to open the environment variable creation panel.

1. Create a new environment variable with these values, then click **Save & Close**:

    - **Display Name**: LocalLoginEnabled
    - **Schema Name**: LocalLoginEnabled
    - **Data type**: Yes/No (also labeled **Two options** in some interfaces)
    - **Default value**: Yes

    ![Create Environment Variable](images/create-env-var.png)

1. Now, again change the value of **Source** to **Environment Variable** and search for **Local** and select the newly created environment variable from the dropdown. Click on **Save & Close**.

    ![Select Environment Variable](images/select-env-var.png)

1. Navigate back to **Power Pages Maker Studio** and open **Solutions Explorer** and select the **PPCCALMDev** solution.

1. Add the newly created environment variable to the solution by clicking **Add existing** > **More** > **Environment variable**.

    ![Add Existing Environment Variable](images/add-existing-env-var.png)

1. Select **LocalLoginEnabled** and click **Next**.
In the picker options, select **Include definition** and leave **Include current value** unselected, then click **Add**.
This packages the variable definition but prompts for the target value during deployment.

    ![Select Environment Variable](images/select-env-var-to-add.png)

1. The environment variable will be added to the solution.

    ![Environment Variable Added](images/env-var-added.png)

### 🛠️ Deploy the updated solution to Production

1. Go to **Pipelines** and click **Deploy Here** for **Production**.

1. If the Managed Environment warning appears, confirm that **Production** is managed and click **Continue**.

1. On **Destination**, verify that **Production** is selected and click **Next**.

1. On **Environment variables**, set **LocalLoginEnabled** to **No** and click **Next**.

    ![Set Environment Variable Value](images/set-env-var-value.png)

1. On **Summary**, review the deployment details and click **Deploy**.
Wait for the deployment to complete.

### 🔍 Verify changes

1. Open the website preview in **Dev** environment by clicking on **Preview** -> **Desktop**.

    ![Preview Site in Dev](images/preview-site-devenv.png)

1. Click on **Sign In** button to verify that the local login is enabled.

    ![Local Login Enabled](images/local-login-enabled.png)

1. Now, go back to **Power Pages Maker Studio**, switch to **Production**, and preview the site.
If prompted, select the Microsoft account that you use for the workshop to access the private site.

1. Click **Sign In** and verify that the local account sign-in option is not available.

    ![Local Login Disabled](images/local-login-disabled.png)

### Optional: Manage and deploy a single-page application

This optional exercise requires JavaScript file support to be preconfigured by the workshop administrator.
Do not change blocked attachment or other tenant security settings during the lab.
Skip this section unless the facilitator confirms that **Dev** and **Production** are ready for the exercise.

#### Deploy Single Page Application site to Power Pages

1. Open a terminal and run `git clone https://github.com/microsoft/power-pages-samples.git` command to clone the [Power Pages samples repo](https://aka.ms/powerpages-samples) locally.

1. Navigate to `samples/bring-your-own-code/react/car-sales-website` folder and open it in VS Code.

1. Complete the steps provided in the [README.md](https://github.com/microsoft/power-pages-samples/tree/main/samples/bring-your-own-code/react/car-sales-website#readme) file to set up the local project and upload the website to **Dev**.

1. Switch to **Production** and import the solution used in **Dev** to ensure that the dependencies are available.

1. Follow the same steps as above to add the site to a solution and deploy it to **Production** using Power Pipelines.

## Optional: Use Power Platform Tools and the PAC MCP server

Power Platform Tools is a Visual Studio Code extension for Power Pages development and management.
It includes:

- Copilot for Power Pages
- Liquid intellisense support
- Commands for creating content such as web pages and web templates
- Power Pages actions for site upload, download, and preview

### Install Power Platform Tools Extension

1. Open VS Code Desktop.
1. Click on the Extensions icon from the left menu.
1. Search for **Power Platform Tools** and click on **Install**.

    ![Install Power Platform Tools Extension](images/install-power-platform-tools.png)

1. After installation, the extension will ask you to login. Use the same credentials you are using for Power Pages Maker Studio.

1. You can also install it from this [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.powerplatform-vscode).

### Install PAC MCP Server

1. Ensure you have latest .NET installed.
1. Download PAC CLI by running below command in terminal:

    ```powershell
    dotnet tool install --global Microsoft.PowerApps.CLI.Tool
    ```

1. Run below command to get the MCP Server location:

    ```powershell
    pac copilot mcp
    ```

1. This will print out the MCP Server location. Copy the URL and add in your VS Code. It should look something like below:

    ```json
    "pac-mcp": {
        "type": "stdio",
        "command": "<MCP Server Location>",
        "args": []
    }
    ```

1. You can now use GitHub Copilot to manage your Power Pages sites using natural language.

    ![Power Pages MCP](images/pac-mcp.png)

## Optional: Install the Power Pages AI plugin for GitHub Copilot CLI

The Power Pages plugin adds AI-assisted skills for creating and deploying single-page application (SPA) sites through GitHub Copilot CLI.
This is separate from the Power Platform Tools extension and the PAC MCP server above.
Installing the plugin does not change the site you created in this lab.

### Prerequisites

1. Install the latest [GitHub Copilot CLI](https://github.com/features/copilot/cli/) and sign in with a GitHub account that has access to Copilot.
1. Install [Node.js](https://nodejs.org/) 18 or later, the [Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction), and the latest [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
   PAC CLI 2.6.3 or later is required if you use the plugin's server logic features.
1. Before using skills that connect to Power Platform, authenticate PAC CLI to **Dev** and Azure CLI to the same tenant:

    ```text
    pac auth create --environment <Dev environment URL>
    az login --allow-no-subscriptions
    pac auth list
    ```

    Replace `<Dev environment URL>` with your environment's instance URL.
    You can find it in Power Pages home under **Settings** > **Session details**.
    Verify that the selected PAC authentication profile points to **Dev**.

### Install the plugin

1. Open a terminal in your local working folder and start GitHub Copilot CLI:

    ```text
    copilot
    ```

1. Inside the Copilot CLI session, add the Microsoft Power Platform skills marketplace:

    ```text
    /plugin marketplace add microsoft/power-platform-skills
    ```

1. Install the Power Pages plugin:

    ```text
    /plugin install power-pages@power-platform-skills
    ```

1. Restart GitHub Copilot CLI to load the plugin's skills.
1. Run `/plugin` and confirm that the Power Pages plugin is installed.
   Its skills include `/create-site` and `/deploy-site`.

> **Important:** Review generated code and proposed actions before approving them.
> Creating or deploying a site changes your Power Platform environment.
> For SPA exercises, use only environments the facilitator has confirmed are ready for JavaScript files; do not change tenant security settings during the lab.

### References

- [Get started with the Power Pages plugin for GitHub Copilot CLI and Claude Code](https://learn.microsoft.com/power-pages/configure/create-code-site-using-claude-code)
- [Microsoft Power Platform skills marketplace and manual installation instructions](https://github.com/microsoft/power-platform-skills#manual-installation)
