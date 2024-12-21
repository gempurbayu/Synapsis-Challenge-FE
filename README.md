# **Synapsis Challenge Frontend**

The goal of this challenge is to create a Blog Post App using modern web development tools and practices. This app will allow users to interact with public blog data through a user-friendly interface while demonstrating proficiency in building robust and efficient applications.

## Tech Stack

**Client:** NextJS, Cypress, TailwindCSS, Ant Design, Typescript

**Server:** Node

## Run Locally

Clone the project

```bash
  git clone https://github.com/gempurbayu/Synapsis-Challenge-FE.git
```

Go to the project directory

```bash
  cd Synapsis-Challenge_FE
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_UR`

`NEXT_PUBLIC_APP_NAME`

## Next.js Application Structure

### 1. `components`

- **Description**: Global reusable components that can be used throughout the application.

### 4. `config`

- **Description**: Configuration files for the application, including settings for APIs, environment, etc.

### 5. `features`

- **Description**: Stores all application logic, organized by feature or domain.

- **Subfolders for each feature**:
  - `components`: Components related to the specific feature.
  - `hooks`: Reusable custom hooks, as described in [React Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).

### 6. `context`

- **Description**: Store and manage data or states that need to be accessible across multiple components, without passing props manually at each level.

## Features

- Light/dark mode toggle
- Responsive Layout
- Post Crud
- Login Popup

## Rest API

GoRest provides an API that supports **CRUD** operations (Create, Read, Update, and Delete) on resources like users, posts, and comments. Below is an explanation of how to interact with **Post** resources using GoRest API.

[GoRest API Documentation](https://gorest.co.in/).
