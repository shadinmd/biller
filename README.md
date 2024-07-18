# Biller

Biller is a comprehensive shop management and point-of-sale (POS) application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. It provides a powerful interface for shop owners to manage their business, staff, products, customers, and sales.

- [api docs](/apidocs.md)
- [modules](/modules.md)


# Features

- User Management

    - Different staff roles with privileges
    - Secure authentication and authorization


- Product Management

    - Add, edit, and manage products
    - Product categorization
    - Image upload and storage with Cloudinary


- Customer Management

    - Customer profiles
    - Loyalty points system


- Sales and Billing

    - Intuitive POS interface
    - Bar code scanning for quick product entry
    - Multiple payment methods including Stripe integration


- Reporting and Analytics

    - Sales reports
    - Inventory tracking
    - Customer insights

# Tech Stack

- Frontend: React, Redux, Material-UI, TypeScript
- Backend: Node.js, Express, MongoDB, TypeScript
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Payment Processing: Stripe
- Email Service: Nodemailer
- Image Storage: Cloudinary

# Getting Started
## Prerequisites

- Node.js 22.5.^
- npm 
- MongoDB
- Stripe account
- Cloudinary account

## Installation

- Clone the repository:
    ```bash
    git clone https://github.com/shadinmhd/biller
    ```

- Set up the backend:
    ```bash
    cd biller/backend
    npm install
    cat .env.example > .env
    ```

- Edit the .env file with your MongoDB connection string, JWT secret, Stripe API keys, Cloudinary credentials, and email service details.

- Set up the frontend:
    ```bash
    cd ../frontend
    npm install
    cat .env.example > .env
    ```

- Edit the .env file with your backend API URL and any frontend-specific environment variables.

## Running the Application

- Start the backend server:
    ```bash
    cd backend
    npm run dev
    ```

- In a new terminal, start the frontend development server:
    ```bash
    cd frontend
    npm run dev
    ```

# Desktop Application
Biller also offers a desktop application for enhanced performance and offline capabilities.
[Desktop Application Repository](https://github.com/shadinmhd/biller-desktop)
