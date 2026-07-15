# Bistro Bliss - Restaurant Management Platform

A premium full-stack restaurant booking and management application built with React, Node.js, Express, and MongoDB.

---

## Features

### Public Features
* **Home Page**: Vibrant banners, featured menu sections, and customer testimonial sliders.
* **About Page**: History of Bistro Bliss, unique dining highlights, and values.
* **Our Menu**: Real-time browsing of menu items fetched from the database, filterable by categories: *Breakfast*, *Main Dishes*, *Drinks*, and *Desserts*.
* **Book A Table**: Integrated reservation system allowing authenticated customers to reserve a table.

### Customer Features
* **Authentication**: JWT-based Secure Login and Registration.
* **Profile Manager**: View and update profile details (name, phone, address) and change passwords.
* **My Bookings**: View table reservation history along with booking statuses (*Pending*, *Accepted*, or *Rejected*).

### Admin Features
* **Dashboard**: Key business metrics including total users, reservations, and sales.
* **Manage Users**: View registered users, toggle roles between normal users and admins, or delete accounts.
* **Manage Reservations**: View all customer table bookings and accept or reject reservation requests.
* **Manage Menu Items**: Full CRUD (Create, Read, Update, Delete) capability for menu dishes with category filtering.

---

## Tech Stack

* **Frontend**: React (Vite), React Router Dom, Bootstrap 5, Bootstrap Icons.
* **Backend**: Node.js, Express.js, JWT (Authentication), Bcrypt.js (Password Hashing).
* **Database**: MongoDB (Mongoose ODM).

---

## Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **MongoDB** (Local Community Server running on port 27017 or a MongoDB Atlas Cloud Cluster URI)

---

### Step 1: Clone and Set Up the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/bistro-bliss
   JWT_SECRET=super_secret_bistro_bliss_key_12345
   ```
   > **Note**: If you are using MongoDB Atlas, replace `MONGO_URI` with your connection string.

4. Seed the database with initial menu items and default users:
   ```bash
   npm run seed
   ```

---

### Step 2: Set Up the Frontend

1. Navigate back to the project root directory:
   ```bash
   cd ..
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```

---

### Step 3: Run the Project

For a full local experience, run both servers in parallel:

#### Start the Backend Server:
1. In a terminal window, navigate to the `backend` directory:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

#### Start the Frontend Server:
1. In a separate terminal window, stay at the project root directory and run:
   ```bash
   npm run dev
   ```
   The Vite dev server will spin up on `http://localhost:5173`. Open this URL in your web browser.

---

## Default Accounts (Seeded)

For testing purposes, you can use these credentials to log in:

### Admin Account
* **Email**: `admin@bistro.com`
* **Password**: `admin123`

### Normal User Account
* **Email**: `john@mail.com`
* **Password**: `user123`

---

## Running API Validation Tests

We have included a test suite to verify the REST API endpoints. Ensure the backend server is running on `http://localhost:5000` with seeded data, then run:

```bash
cd backend
node test-api.js
```
This script will test register, login, profile queries, role toggles, booking reservation creation, booking list views, and booking approvals.
