# 💊 Trust Pharma Client

**Trust Pharma** is a full-featured, modern pharmacy e-commerce web application built using the **MERN stack** (MongoDB, Express, React, Node.js). It features a fast, responsive frontend built with **React**, **Tailwind CSS**, and **Vite**, and a robust backend powered by **Node.js** and **Express**. Users can browse, purchase, and manage medical products with features like authentication, payments, PDF invoices, and real-time dashboards.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

# 🚀 Features

Trust Pharma offers a comprehensive pharmacy e-commerce experience with:

- 🛍️ Browse and purchase medicines
- 🔐 User authentication via Firebase
- 💳 Secure payments using Stripe
- 📊 Admin dashboard with charts and stats (Recharts)
- 📄 PDF invoice generation (html2canvas + jsPDF)
- 📅 Order tracking with Moment.js
- 🌙 Responsive design and dark mode with Tailwind + DaisyUI
- 🔔 Real-time toast notifications (React Toastify)
- 🧑‍💼 Admin panel for product and user management
- 🛠️ RESTful backend APIs with Node.js + Express
- 🗃️ MongoDB for database management

---

# 🛠️ Tech Stack

## Frontend

- React (with Vite)
- React Router DOM v7
- React Hook Form
- Axios
- Tailwind CSS + DaisyUI
- Lottie, Swiper, React Icons

## Backend

- Node.js + Express.js
- MongoDB (via Mongoose)
- Firebase Admin SDK (optional)

## Integrations

- Firebase Authentication
- Stripe Payments
- SweetAlert2
- Recharts
- html2canvas + jsPDF
- Moment.js

---

# 

# 📦 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trust-pharma-client.git
cd trust-pharma-client
npm install
```

# Setup Environment Variables

## 1. Frontend (.env)
- VITE_FIREBASE_API_KEY=your_firebase_key
- VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
- VITE_FIREBASE_PROJECT_ID=your_project_id
- VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
- VITE_FIREBASE_APP_ID=your_app_id
- VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
- VITE_API_URL=http://localhost:5000/api


---

# ▶️ Usage

- Visit the app at [http://localhost:5173](http://localhost:5173)
- Register/login using Firebase Authentication
- Browse products, add to cart, and proceed to checkout
- Pay securely using Stripe
- Access the admin dashboard to manage products and users
- Download order invoices in PDF format


# 🧰 Troubleshooting

### 🔥 Backend Not Connecting to MongoDB?
- Check the `MONGO_URI` in your `server/.env`.

### 💳 Stripe Payments Not Working?
- Verify both your Stripe secret and publishable keys.

### 🔐 Auth Errors?
- Double-check Firebase Web App config values.

### ❌ API Calls Failing?
- Ensure the backend server is running and `VITE_API_URL` is set correctly.


# 🤝 Contributing

We welcome contributions!

## How to Contribute
- Fork the repository
- Create a new branch
- Commit your changes
- Open a pull request

### Bug Reports & Feature Requests
Open an issue [here](https://github.com/shbhuiyan/trust-pharma-client/issues)

# 📧 Contact

For questions, support, or feedback, reach out to:

**📬 shbhuiyan997@gmail.com**

