
# Next.js Chapa Booking System

Welcome to the Next.js Chapa Booking System! This project is a simple, open-source hotel booking platform built with Next.js, MongoDB, and Chapa for payment processing. It allows users to browse available rooms, book them, and make payments securely.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Room Listing**: Browse and view details of available rooms.
- **Room Booking**: Book rooms by providing user details.
- **Payment Integration**: Secure payment processing with Chapa.
- **Webhook Handling**: Automated status updates via Chapa webhooks.
- **Confirmation and Failure Pages**: User feedback on booking status.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API routes, Node.js
- **Database**: MongoDB
- **Payment**: Chapa API
- **Styling**: CSS (with optional integration of CSS-in-JS or other frameworks)

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (local or hosted)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BashirMohamedAli/nextjs-chapa-booking-system.git
   cd nextjs-chapa-booking-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory of your project and add the following environment variables:

```
MONGO_URI=your_mongo_db_connection_string
NEXT_PUBLIC_CHAPA_PUBLIC_KEY=your_chapa_public_key
CHAPA_SECRET_KEY=your_chapa_secret_key
CHAPA_WEBHOOK_SECRET=your_chapa_webhook_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- **MONGO_URI**: MongoDB connection string.
- **NEXT_PUBLIC_CHAPA_PUBLIC_KEY**: Public key for Chapa.
- **CHAPA_SECRET_KEY**: Secret key for Chapa API.
- **CHAPA_WEBHOOK_SECRET**: Secret key for verifying webhook requests.
- **NEXT_PUBLIC_BASE_URL**: Base URL of your application.

### Running the Project

1. **Start the development server:**

   ``` bash
   npm run dev
   # or
   yarn dev
   ```

   The application will run at `http://localhost:3000`.

2. **Build for production:**

   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## Project Structure

```
nextjs-chapa-booking-system/
├── .env.local                  # Environment variables
├── package.json                # Project dependencies and scripts
├── public/                     # Static files like images, icons
├── pages/                      # Next.js pages
│   ├── api/                    # API routes
│   │   ├── booking.js          # API route for creating bookings
│   │   ├── webhook.js          # API route for webhook handling
│   ├── rooms/                  # Dynamic routing for rooms
│   │   ├── [id].js             # Room detail page
│   ├── confirmation.js         # Confirmation page after successful payment
│   ├── failed.js               # Page shown when the payment fails
│   ├── index.js                # Home page
├── models/                     # Mongoose models for MongoDB
│   ├── Booking.js              # Booking model
│   ├── Room.js                 # Room model
├── lib/                        # Utility functions
│   ├── dbConnect.js            # MongoDB database connection
├── styles/                     # CSS and styling files
│   ├── globals.css             # Global styles
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## Contributing

We welcome contributions to improve the Next.js Chapa Booking System! Here's how you can contribute:

1. **Fork the repository** and create a new branch for your feature or bug fix.

2. **Make your changes** and ensure that the project builds and functions as expected.

3. **Submit a pull request** with a clear description of your changes and the problem you're solving.

4. **Code of Conduct**: Be respectful and considerate in all interactions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
