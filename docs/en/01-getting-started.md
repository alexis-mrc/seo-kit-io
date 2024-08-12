# Getting Started

To get started with the SEO Kit Boilerplate, follow these steps to clone and set up the project:

## Prerequisites

- Ensure Node.js is installed on your machine.

## Step 1: Create Your GitHub Repository

First, create a new repository on GitHub. This will be your project's private repository.

## Step 2: Clone the Boilerplate

In the directory of your choice, run the following command to clone the boilerplate repository:

```bash
git clone git@github.com:alexis-mrc/seo-kit-boilerplate.git your-project-name
```

This command will create a directory named `your-project-name` containing the boilerplate files.

## Step 3: Navigate to the Project Directory

Move into the newly created project directory:

```bash
cd your-project-name
```

## Step 4: Change the Origin URL

To link your local repository to the newly created GitHub repository, change the origin URL:

```bash
git remote set-url origin git@github.com:your/repo.git
```

Replace `your/repo.git` with the actual URL of your GitHub repository.

## Step 5: Add the Boilerplate Origin for Updates

To keep your project up-to-date with the latest changes from the SEO Kit Boilerplate, add the original boilerplate repository as a new remote:

```bash
git remote add seo-kit-boilerplate-origin git@github.com:alexis-mrc/seo-kit-boilerplate.git
```

This will allow you to pull updates from the boilerplate repository whenever necessary.

## Step 6: Install Dependencies

To install all necessary dependencies, run:

```bash
npm install
```

## Step 7: Launch the Documentation

To open the documentation, run:

```bash
npm run docs
```

## Step 8: Start the WebCLI

To start the WebCLI on `localhost:4000`, use:

```bash
npm start
```

## Step 9: Launch the Client Application

Simultaneously, you can run the client application on `localhost:4200` by executing:

```bash
npm run client-app
```
