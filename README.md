# Todo List App

A modern and interactive Todo List application built with React, Vite, and Tailwind CSS. This application provides a seamless experience for managing tasks with features like drag-and-drop, due date tracking, and a dark/light theme toggle.

## Features

-   **Task Management**: Add tasks with a title and an optional description.
-   **Status Columns**: Organize tasks across three columns: "New", "Ongoing", and "Done".
-   **Drag & Drop**: Intuitively move tasks between columns to update their status.
-   **Context Menu**: Right-click a task to quickly move it to another column.
-   **Due Dates**: Set due dates for "Ongoing" tasks. The application will alert you if a task becomes overdue.
-   **Theme Toggle**: Switch between a light and dark theme. Your preference is saved in local storage.
-   **Responsive Design**: A clean and responsive layout that works on various screen sizes.

## Tech Stack

-   **Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: React Hooks (`useState`, `useEffect`)
-   **Linting**: [ESLint](https://eslint.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or newer)
-   npm

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd todolist
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode with hot-reloading.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the code to find and fix problems.
-   `npm run preview`: Serves the production build locally to preview it.