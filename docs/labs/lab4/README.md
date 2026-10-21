# 🧪 Lab 4: Lifecycle Mastery in Power Pages

## 🛠️ Prerequisites for this lab

Complete [Lab 1](../lab1/lab1.md), [Lab 2](../lab2/lab2.md), and [Lab 3](../lab3/lab3.md) before starting this lab.
You will use the resources and skills from those labs:

- The **Dev**, **Hotfix**, **UAT**, and **Production** environments named in Lab 1
- The initialized Azure DevOps Power Platform project repository from Lab 1
- The Git integration, commit, pull, and conflict workflow from Lab 2
- The Power Pipelines and Managed Environments setup from Lab 3

Confirm that **Dev** and **Production** are Managed Environments.
Git integration requires Dev to be managed, and the deployment target must also be managed.
Lab 3 includes the steps to enable Managed Environments.

Install [Visual Studio Code](https://code.visualstudio.com/download) and [Git](https://git-scm.com/install/windows) before the local repository exercise.

The optional exercises have additional prerequisites listed in the lab.
For the AI plugin exercise, install GitHub Copilot CLI, Node.js 22 LTS, Power Platform CLI, and Azure CLI, then authenticate to Dev and the same tenant.
Do not change blocked attachment or other tenant security settings during the lab.

## 🎯 What you'll learn

In this lab, you will:

- Create a Power Pages site in Dev and add it to the **PPCCALMDev** solution
- Connect the solution to the existing Azure DevOps repository using solution-scoped Git integration
- Deploy the solution to Production with Power Pipelines and activate the site
- Edit the site's home page in Visual Studio Code with GitHub Copilot, commit the changes on a feature branch, and merge them through an Azure DevOps pull request
- Pull the repository changes into Dev through Solution Explorer
- Add the **LocalLoginEnabled** environment variable and deploy its definition without the current value
- Redeploy and verify that local account sign-in is enabled in Dev and disabled in Production

The optional exercises cover installing the Power Pages AI plugin for GitHub Copilot CLI, deploying a sample single-page application (SPA), and setting up Power Platform Tools and the PAC MCP server in VS Code.

## Agenda

1. Introduction to Power Pages ALM and development tools
1. [Lab: ALM with Power Pages](./lab/README.md)
1. [Optional: Install the Power Pages AI plugin for GitHub Copilot CLI](./lab/README.md#optional-install-the-power-pages-ai-plugin-for-github-copilot-cli)
1. [Optional: Manage and deploy a single-page application](./lab/README.md#-optional-manage-and-deploy-a-single-page-application)
1. [Optional: Use Power Platform Tools and the PAC MCP server](./lab/README.md#optional-use-power-platform-tools-and-the-pac-mcp-server)
