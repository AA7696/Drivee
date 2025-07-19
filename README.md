# 🚗 Drivee - Car/Bike Rental Web Application

Drivee is a modern and user-friendly vehicle rental platform where users can browse, book, and pay for cars and bikes online. It includes features for both customers and vehicle owners (admins) to manage bookings, view rental history, and handle fleet operations efficiently.

## 🌐 Live Demo

👉 [View Live](https://drivee-azure.vercel.app)

---

## ✨ Features

### 🚘 Customer Features
- 🔐 Google Authentication
- 🔍 Browse vehicles by location, type, fuel, and transmission
- 📄 View detailed vehicle information and availability
- 📅 Book vehicles by selecting pick-up and drop-off date/time
- 💰 Real-time price calculation based on duration
- 💳 Secure online payment using Razorpay
- 📚 View personal booking history

### 🧑‍💼 Admin/Owner Features
- 🔐 Admin authentication
- ➕ Add new vehicles with specifications and images
- ✏️ Edit or 🗑️ delete existing vehicles
- 📋 View all bookings (filter by date or vehicle)
- ❌ Cancel bookings with appropriate checks
- 💸 View payment status (paid/pending)
- Admin login email id - `admin@gmail.com`
- Admin password - `admin123`

---

## 🛠 Tech Stack

| Frontend       | Backend         | Database        | Auth & Storage     | Tools & Libs                        |
|----------------|-----------------|-----------------|--------------------|-------------------------------------|
| React.js       | Firebase SDK    | Firestore       | Firebase Auth      | Zustand, React Query, React Router |
| Tailwind CSS   | Vercel Hosting  |                 | Firebase Storage   | Toast, Razorpay, Cloudinary        |

---

## 🔐 Application Architecture & Features

### 🔑 Role-Based Access Control (RBAC)
- Roles:
  - **Customer** – can browse, book, and view their own bookings.
  - **Admin** – can add/manage vehicles, view all bookings, and manage payments.
- Role stored in Firestore and accessed via Zustand and React Query.

### 🔒 Protected Routes
- Implemented using custom `PrivateRoute` wrappers.
- Zustand handles global auth state and user role.
- Unauthorized access redirects to login or error page.

### ⚙️ Concurrency Control
- Real-time Firestore database avoids double bookings.
- Bookings are checked for availability before being confirmed.
- Admin actions like deleting a vehicle are blocked if there are active bookings.
- Firebase security rules add an additional layer of protection.

---

## 🧑‍💻 Getting Started Locally

### 🔧 Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/drivee.git  
   cd drivee  
   npm i  
   npm run dev  
   
