#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

async function createProject() {
  console.log("This is a starter for CIDC NextJS projects");
  console.log(
    "This is configured to use the items below, as per CIDC recommendations."
  );
  console.log("Typescript");
  console.log("NextJs 14 with App Router");
  console.log("Tailwind");
  console.log("Eslint");
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter the name of your project:",
      default: "my-cidc-next-app",
    },
    {
      type: "list",
      name: "componentLib",
      message: "Do you want to use Shadcn(recommended)?",
      choices: ["Yes", "No"],
    },
    {
      type: "list",
      name: "formValidation",
      message: "Which form validation library to you want to use?",
      choices: ["Yup", "Zod", "None"],
    },
    {
      type: "list",
      name: "authService",
      message: "Which authentication service do you want to use?",
      choices: ["Cognito", "Azure AD", "None"],
    },
  ]);

  const projectDir = path.join(process.cwd(), answers.projectName);

  // Copy template folder to new project directory
  fs.copySync(path.join(__dirname, "../template"), projectDir);

  // Change directory to the new project folder
  process.chdir(projectDir);

  // Install additional packages based on the selected form validation library
  if (answers.formValidation === "Yup") {
    console.log("Installing Yup packages...");
    execSync("npm i yup", { stdio: "inherit" });
  } else if (answers.formValidation === "Zod") {
    console.log("Installing Zod packages...");
    execSync("npm i zod", { stdio: "inherit" });
  }

  // Install additional packages based on the selected authentication service
  if (answers.authService === "Cognito") {
    console.log("Installing AWS Cognito packages...");
    execSync("npm i aws-amplify", { stdio: "inherit" });
    execSync("npm i @aws-sdk/client-cognito-identity-provider", { stdio: "inherit" });
  } else if (answers.authService === "Azure AD") {
    console.log("Installing Azure AD packages...");
    execSync("npm install @azure/msal-browser", { stdio: "inherit" });
  }

  // Install additional packages for Shadcn
  if (answers.componentLib === "Yes") {
    console.log("Installing Shadcn...");
    execSync("npx shadcn@latest init", { stdio: "inherit" });
  }

  // Install project dependencies
  console.log("Installing Next.js dependencies...");
  execSync("npm install", { stdio: "inherit" });

  console.log(
    `\nProject setup complete! Run the following commands to get started:`
  );
  console.log(`\ncd ${answers.projectName}`);
  console.log(`npm run dev`);
}

createProject();
