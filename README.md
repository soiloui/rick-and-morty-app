# Rick and Morty App

## Overview

The Rick and Morty App is a React application that provides information about characters from the "Rick and Morty" series. It uses Material-UI for styling, TanStack Query & axios for data fetching, and React Toastify for notifications. The app also supports theme toggling.

## Features

- **Character Table**: Displays a list of characters.
- **Character Details**: Shows detailed information about a selected character.
- **Theme Toggling**: Allows users to switch between themes.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1.  Clone the repository:
    `git clone https://github.com/your-username/rick-and-morty-app.git`

2.  Navigate into repository:
    `cd rick-and-morty-app`

3.  Install dependencies:
    `npm install`
    or
    `yarn install`

### Running the App

To start the application, run:
`npm start`
or
`yarn start`

This will start the development server and open the app in your default web browser.

## App overview

### `App.tsx`

This is the main component of the application, which sets up the overall structure and integrates various providers and components.

- **CssBaseline**: Applies a baseline MUI CSS.
- **Container**: A Material-UI component that centers the content and provides padding.
- **CharacterTable**: Displays the list of characters.
- **CharacterDetails**: Shows details of the selected character.
- **ToggleTheme**: Allows users to switch between themes.
- **ToastContainer**: Displays notifications.
- **ThemeProvider**: Provides theme context to the application.
- **CharacterProvider**: Provides character context to the application.
- **QueryClientProvider**: Provides React Query context for data fetching.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

- [Rick and Morty API](https://rickandmortyapi.com/) for the character data.
- [Material-UI](https://mui.com/) for the UI components.
- [TanStack Query](https://tanstack.com/query/latest) for data fetching.
