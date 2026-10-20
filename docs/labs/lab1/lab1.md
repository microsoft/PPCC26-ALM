# 🚀 Lab 1: Setup and Configure

Welcome to PPCC25! In this first lab, you’ll setup the necessary prerequisites to complete subsequent labs. In the real world, your organization might have less sophisticated or more sophisticated DevOps requirements. This workshop covers the most adopted tools for enterprise scale DevOps with the least amount of effort and complexity. 

✅ Lab 1 tasks

In this lab, you will go through the following tasks:

1. Log on to your account
2. Verify your environments
3. Enable Copilot Studio 
4. Verify an Azure DevOps project and repository are provisioned

> Estimated time: 15-20 minutes


## Task 1: Log on to your account
> **Important:** 
> Your workshop tenant will be deleted within two days after the workshop.

1.	Open a new in-private window in Edge (or in Cognito if using Chrome).
2.	Use the credentials provided during the workshop. Save these in case you’re logged out.
3.	Go to the [Power Platform Admin Center](https://aka.ms/ppac)


## Task 2: Verify your environments
Go to the [Power Platform Admin Center](https://aka.ms/ppac) and confirm that your tenant has the following environments. If any are missing, create them manually.

| Environment Name | Purpose |
|---|---|---|
| Development 1 | Primary development environment |
| Development 2 | Secondary development environment |
| Pipelines Host | Stores and manages custom pipelines |
| Production | Where your solutions are shared with end users |
| Test | Testing your solution |

![Required environments in the Power Platform admin center](https://github.com/user-attachments/assets/93bd49eb-316a-44d7-bdb7-0a47b0069577)

### Enable Managed Environments

1. In the Power Platform Admin Center, select **Manage** > **Environments**.
2. Select the **Development 1** environment.
3. In the ribbon, click **Enable Managed Environments**.
4. Click **Enable** in the fly out wizard.
5. Repeat these steps for **Development 2**.

   ![Enable ME](../lab3/assets/image64.png)

![Managed Environment setup](https://github.com/user-attachments/assets/bd62a57e-e634-46c3-91fe-17ab5d119446)
![Managed Environment confirmation](https://github.com/user-attachments/assets/bb19f121-9848-49bf-bddc-477b2af068a7)

### Turn on Auto-Conversion for Pipelines Host

1. In the Power Platform Admin Center, select **Deployments**.
2. Select **Pipelines Host** from the host selector on the **Overview** page.
3. Click **Turn on Auto-Conversion**.

This automatically enables target environments as Managed Environments when someone deploys to them.

![Select the custom pipelines host](https://github.com/user-attachments/assets/820ec784-eaeb-4401-9fc0-c66192f65cdc)
![Turn on Auto-Conversion](https://github.com/user-attachments/assets/9c886844-7241-4d40-86f6-aea0c0da86a6)

## Task 3: Enable Copilot Studio authors
1.	Go to the [Power Platform Admin Center](https://aka.ms/ppac)
2.	On the left menu, select, **Manage**, then **Tenant Settings**
3.	Select **Copilot Studio authors**
4.	**Edit** the **Security group**, select **All Company**, then **Done**.

![Enable Copilot Studio Authors](assets/EnableCopilotStudioAuthors.png)

In the real world, you might allow a smaller group of individuals to create agents depending on your organizational policies. 

## Task 4: Verify an Azure DevOps project and repository are provisioned

An Azure DevOps organization, project, and repository are pre-provisioned in each tenant.

1. Open a new tab within the same browser.
2. Go to [Azure DevOps](https://aex.dev.azure.com/).
3. Confirm that your project is listed in the organization.

![Azure DevOps organization with the provisioned project](https://github.com/user-attachments/assets/2f9e8234-3e0e-4ca2-83e4-6099b6a001f2)

4. Select the project, select **Repos**, then initialize the Git repository.

If your tenant doesn't have a pre-existing project and repository, get a new tenant at [PPCC Workshop Accounts](https://aka.ms/PPCCWorkshopAccounts).

Now you have a source code repository! If you’re not familiar with source code, don’t worry. In Lab 2 you’ll learn how to use source control within the comfort of your Power Platform environment. 
While this lab only requires one user, in the real world you’ll need to add other collaborators to the Azure DevOps organization and project with Basic access. 
