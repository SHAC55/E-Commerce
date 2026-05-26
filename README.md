# E-Commerce

A full-stack e-commerce application with a customer storefront, admin panel, and Express/MongoDB backend. The app supports product browsing, user authentication, cart management, order placement, product management, image uploads, and admin order status updates.

## Features

- Customer storefront built with React, Vite, and Tailwind CSS
- Product listing, product details, search, cart, checkout, and orders pages
- User registration and login with JWT authentication
- Admin dashboard for adding, listing, and removing products
- Admin order management with order status updates
- MongoDB database using Mongoose models
- Product image upload support using Multer and Cloudinary
- Cash on Delivery order flow
- Stripe and Razorpay packages included for future online payment support

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Admin: React, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT, bcrypt
- Uploads: Multer, Cloudinary
- Payments: Razorpay, Stripe

## Project Structure


E-Commerce/
+-- admin/           # Admin dashboard React app
+-- backend/         # Express API server
+-- frontend/        # Customer storefront React app
+-- Product Images/  # Product image assets


## Prerequisites

- Node.js
- npm
- MongoDB database connection string
- Cloudinary account

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

Create a `.env` file inside both `frontend` and `admin` folders:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Installation

Install dependencies for each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

## Running the Project

Start the backend server:

```bash
cd backend
npm run server
```

Start the customer frontend:

```bash
cd frontend
npm run dev
```

Start the admin panel:

```bash
cd admin
