# Stock Rocket

Market tracker app, providing simple tools for monitoring daily stock prices, trends and statistics, and fund performance. Leverages the Yahoo Finance API to provide current and historical stock market data. Written in vanilla javascript.

## Requirements
- [NVM](https://github.com/nvm-sh/nvm)
- Node version in [.nvmrc](.nvmrc)

## Demo

![Stock Rocket demo](/example.gif)

## Getting Started

- Clone repository to your computer
- Create a plain text file ".env" in the top project directory with your Yahoo Finance API key (follow the format used in ".env.example")
- Run `nvm use` to switch to correct Node and npm versions.
- To run the prepackaged build, simply open public/index.html
- For development, navigate to the project folder in the command line, and install dependencies by running `npm install`. Then enter `npm run dev` to launch application in Google Chrome. Press CTRL+C to terminate connection.
- `npm run build` to create a new minified build for production.
