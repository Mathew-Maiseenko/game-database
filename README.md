# Game Database Site Overview

## Description

Welcome to Game Database – a web application designed for game enthusiasts! This site provides access to information about various games and offers many convenient features for users.

## Pages

- **Home Page**: Find the latest news and updates.
- **Game List Page**: View all available games with filtering options by genres, tags, title, and manufacturer.
- **Game Details**: View all details about the game and add the game and it's passing statistics in user's favorites.
- **User Page**: Allows users to register and log into their accounts.

## Features

- **User Registration and Login**: The application allows users to create accounts, log in and log out.
- **Validation**: Validation of melon input by the user during account creation/account login. There is also a password verification function for reliability.
- **Game details**: Clicking on the card of any game will take the user to the details page of this game where you can add the game to your favorites, go to the website to download the game and mark the completed achievements (this function is available only if the user is registered and this game is in the list of his favorites)
- **Store favorite games**: The application allows you to store a list of the user's favorite games in your personal account.
- **Store statistics of passing games**: The application allows the user to mark the fact whether he has passed the game or not. In addition, the user can view the available achievements for this game, as well as mark which of them have been completed (after this information can be seen on the user's page)
- **Server Emulation with LocalStorage**: Data is stored using LocalStorage. Due to limited storage capacity, the application can remember only one user at a time.
- **Game Filtering**: You can filter games by various parameters: genres, tags, title, and manufacturer.
- **Pagination**: You can navigate through the pages of the provided games using pagination.
- **Theme switch**: The user can choose between a light and a dark theme.
- **Using RAWG API**: The application leverages the RAWG API to fetch game data.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository: `git clone https://github.com/Mathew-Maiseenko/game-database`
2. Navigate to the project directory: `cd game-database`
3. Install dependencies: `npm install`
4. Run the local server: `npm run dev`

The application will be available at `cyber-list.vercel.app`.

## Technologies

- **Next.js**: Framework for React applications with server-side rendering support.
- **React**: Library for building user interfaces.
- **Redux**: State management for the application.
- **Redux-Toolkit**: Optimization of the development process with Redux.
- **Thunk**:
  Working with asynchronous operations in combination with Redux.
- **Tailwind**: Styling the application.
- **PostCss**: To enable cross-browser styles.
- **Zod**: Typing of data coming from the server side.
- **LocalStorage**: Server emulation for storing user data.
- **RAWG API**: Fetching game data.

## Author

- [Maiseenko Mathew](https://github.com/Mathew-Maiseenko)
