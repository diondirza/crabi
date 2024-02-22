# Car Rental App

## Overview

This Car Rental App for learning purpose

## Features

- **Interactive Map View**: Utilize Google Maps to display available cars, allowing users to easily find nearby rental options.
- **Car Booking**: A straightforward booking process powered by a sleek UI designed with Ant Design.

## Technologies Used

- **[React](https://reactjs.org/)** for building the user interface.
- **[TypeScript](https://www.typescriptlang.org/)** for type-safe code.
- **[Ant Design (antd)](https://ant.design/)** for the UI components.
- **[Google Maps SDK](https://developers.google.com/maps)** for rendering maps and location-based services.
- **[Vite](https://vitejs.dev/)** for efficient project bundling.
- **[Vitest](https://vitest.dev/)** and **[React Testing Libray](https://testing-library.com/)** for unit and integration testing.

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm/yarn

### Local setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/car-rental-app.git
cd car-rental-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Use your own Google Maps API key into .env file, otherwise the when you run with preview command it won't work

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:5173 to view the app in your browser.

### Docker Setup

If you prefer to use Docker, you can build and run the application using Docker commands.

1. Build the Docker image:

```bash
npm run docker:build
# or
yarn docker:build
```

2. Run the application in a Docker container:

```bash
npm run docker:run
# or
yarn docker:run
```

This command runs the Docker container, making the application accessible at http://localhost:8080

### Testing

To run the tests, use the following command:

```bash
npm run test
# or
yarn test
```

To see the test result with comprehensive UI, use the following command:

```bash
npm run test:ui
# or
yarn test:ui
```

### Build and Deployment

To build and deploy the project into your own server run the following command

```bash
npm run build
# or
yarn build
```
