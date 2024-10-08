# FoodExpress

## Description

This is Frontend repository for FoodExpress app. You can find Backend repository [here](https://github.com/RonakR68/FoodExpress_backend).

Food Express is a food ordering and restaurant management web application. It features a full-stack architecture with a backend built using Node.js, Express.js and MongoDB and a frontend developed with React, Vite, and Tailwind CSS. The backend handles user authentication, restaurant management, and integrates with external services like Cloudinary for image uploads.The frontend provides a modern, responsive UI for browsing restaurants, placing orders, and managing user profiles. The app also includes a restaurant recommendation system based on user collaborative filtering.

[Live Webiste Link](https://foodexpress-frontend-g6dx.onrender.com/)



## Features

- **User Authentication**: User authentication using JWT stored in HTTP-only cookie. Users can also use Google account for fast and secure login.
- **Secure Password Storage**: Passwords are hashed using bcrypt for security.
- **Restaurant Management**: Add and manage restaurant details, menu items and orders.
- **User Profile Management**: Users can manage their profile details and can manage addresses.
- **Restaurant Browsing and Search**: Users can browse and search for available restaurants and their menu items.
- **Order Placement and Tracking**: Users can place and track their active orders status and can also view past orders details.
- **Ratings and Reviews**: Users can provide ratings and reviews for restaurants and food items.
- **Restaurant Recommendation System**: Collaborative-based recommendation system to suggest restaurants based on similar user preferences.
- **Responsive Design**: Modern UI with responsive design to ensure a seamless experience for users.
- **Image Upload and Management**: Restaurant image uploads are managed through Cloudinary.
- **Data Validation and Error Handling**: Validation and error handling across the application.
- **Dark Mode Support**: Option for users to switch to dark mode for a better viewing experience.


## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **React**
- **Vite**
- **Tailwind CSS**
- **Shadcn UI**
- **Python Flask**
- **sci-kit learn**

## How To Run On Local Machine

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB instance (local or cloud-based)
- Cloudinary account for image uploads
- Backend server running (refer to [backend repository](https://github.com/RonakR68/FoodExpress_backend))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RonakR68/FoodExpress_backend.git
   cd FoodExpress_backend

2. Install dependencies
   ```bash
    npm install

3. Create a .env file in the root directory and add your configuration as per example.env
4. Start the server
   ```bash
    npm run dev
