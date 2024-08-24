# SEO Kit Boilerplate

## Getting Started

To get started with the SEO Kit Boilerplate, follow these steps to clone, set up the project, and keep it up-to-date:

## Prerequisites

- Ensure Node.js is installed on your machine.

### Step 1: Create Your GitHub Repository

First, create a new repository on GitHub. This will be your project's private repository.

### Step 2: Clone the Boilerplate

In the directory of your choice, run the following command to clone the boilerplate repository:

```bash
git clone git@github.com:alexis-mrc/seo-kit-boilerplate.git your-project-name
```

This command will create a directory named `your-project-name` containing the boilerplate files.

### Step 3: Navigate to the Project Directory

Move into the newly created project directory:

```bash
cd your-project-name
```

### Step 4: Change the Origin URL

To link your local repository to the newly created GitHub repository, change the origin URL:

```bash
git remote set-url origin git@github.com:your/repo.git
```

Replace `your/repo.git` with the actual URL of your GitHub repository.

### Step 5: Add the Boilerplate Origin for Updates

To keep your project up-to-date with the latest changes from the SEO Kit Boilerplate, add the original boilerplate repository as a new remote:

```bash
git remote add seo-kit-boilerplate-origin git@github.com:alexis-mrc/seo-kit-boilerplate.git
```

This will allow you to pull updates from the boilerplate repository whenever necessary.

### Step 6: Install Dependencies

To install all necessary dependencies, run:

```bash
npm install
```

### Step 7: Launch the Documentation

To open the documentation, run:

```bash
npm run docs
```

### Step 8: Start the WebCLI

To start the WebCLI on `localhost:4000`, use:

```bash
npm start
```

### Step 9: Launch the Client Application

Simultaneously, you can run the client application on `localhost:4200` by executing:

```bash
npm run client-app
```

## Features

- **Angular 18**: Utilize the latest features of Angular for a robust frontend.
- **Tailwind CSS**: Style your application effortlessly with Tailwind's utility-first CSS framework.
- **Nx**: Leverage Nx for a monorepo setup, providing a scalable and maintainable structure.
- **Easy Deployment**: Deploy on Firebase with a one-click button or get your site files to deploy on any server.

## Keeping Your Project Updated

To keep your project up-to-date with the latest changes from the SEO Kit Boilerplate:

1. Fetch the latest changes from the original boilerplate repository:

   ```bash
   git fetch seo-kit-boilerplate-origin
   ```

2. Merge the updates into your local project:

   ```bash
   git merge seo-kit-boilerplate-origin/main
   ```

   Resolve any conflicts if they arise and ensure your project continues to function as expected.

## License

You are permitted to use this boilerplate only if you have purchased it. You can build unlimited sites with SEO Kit, but you cannot resell the `seo-kit-boilerplate`.

## Important Notice:

Please do not push your code directly to the alexis-mrc/seo-kit-boilerplate repository. Doing so will result in losing access to the repository.
If you need to contribute, kindly create a merge request and request a review by contacting support@seo-kit.io.

Thank you for your cooperation!

## Credit

For support, contact: alexis-mrc at support@seo-kit.io

---

We hope this boilerplate helps you achieve great SEO results for your websites. Happy building!
