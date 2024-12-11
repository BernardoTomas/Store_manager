# Store Manager

Store Manager is a backend application developed with express.js (node.js) for managing a store's inventory, sales, and products.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Installation

Prerequisites:
- have node (at least 18) installed on your machine
- have Docker installed on your machine
- have the Database Client extension for VsCode

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/store-manager.git
    ```
2. Navigate to the project directory:
    ```sh
    cd store-manager
    ```
3. Set up the connection with Database Client (the environment variables are in the docker-compose.yml file).

4. Build the Docker containers by running:
    ```sh
    docker-compose up --build -d 
    ```
    
## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Run tests:
    ```sh
    npm test:mocha
    ```

## Project Structure

tests/ backend/ .dockerignore .eslintignore .eslintrc.json .mocharc.json .nycrc.json .stryker.conf.json coverage/ Dockerfile package.json reports/ src/ app.js controllers/ middlewares/ models/ connection.js routes/ server.js services/ tests/ docker-compose.yml README.md sql/ 01-migration.sql 02-seed.sql

### Key Files and Directories

- `backend/src/models/connection.js`: Contains the database connection setup.
- `backend/.eslintrc.json`: ESLint configuration file.
- `backend/src/server.js`: Entry point for the backend server.

## Scripts

- `npm run dev:local`: Start the development server.
- `npm test`: Run all tests.
- `npm run cy:open`: Open Cypress for end-to-end testing.
- `npm run test:mocha`: Run Mocha tests.
- `npm run test:coverage`: Run tests and generate coverage report.
- `npm run test:mutation`: Run mutation tests.
- `npm run lint`: Run ESLint to lint the codebase.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```MYSQL_HOSTNAME=db``` ```MYSQL_PORT=3306``` ```MYSQL_USER=root``` ```MYSQL_PASSWORD=password```

