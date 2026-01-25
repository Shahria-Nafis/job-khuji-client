

```md
# 💼 JobKhuji – Freelance Marketplace

> **Project:** JobKhuji (Full Stack Freelance Marketplace)
></br>
> **Author:** Shahria Nafis
></br>
> **Live Site:** https://job-khuji-client.vercel.app

---

## ⚡ Overview

**JobKhuji** is a full-stack freelance marketplace platform where users can explore available jobs/tasks, post their own jobs, update/delete their listings, and accept tasks posted by other users.

This project demonstrates real-world full-stack development skills with **React**, **Node.js**, **Express**, **MongoDB**, and authentication using **Firebase**. Private routes, secured CRUD operations, toast notifications, and responsive UI are implemented following professional best practices.

---

## 🎯 Key Features

* Full responsive design for Mobile / Tablet / Desktop
* Firebase authentication (Email/Password + Google Login)
* Private route protection (user stays logged in after refresh)
* Add new jobs with form validation and dropdown category
* View all jobs in a table/grid layout
* Job details page with accept job feature
* Users can manage their own posted jobs (Update + Delete)
* Accepted jobs appear in “My Accepted Tasks.”
* DONE/CANCEL action removes accepted job from UI + Database
* Toast notifications for all actions (No browser alert used)
* Loading spinner while fetching data
* Custom 404 Not Found page

---

## 🛠️ Tech Stack

### Frontend
* React.js
* React Router DOM
* Tailwind CSS
* JavaScript (ES6)

### Backend
* Node.js
* Express.js
* MongoDB Atlas

### Authentication
* Firebase Authentication

### Data Fetching
* Axios / TanStack Query

---

## 📦 Dependencies Used

### Client Side
* react
* react-router-dom
* axios / @tanstack/react-query
* tailwindcss
* react-hot-toast / react-toastify / sonner

### Server Side
* express
* mongodb
* cors
* dotenv

---

## ⚙️ Prerequisites

Before running this project, make sure you have:

* Node.js (v16+ recommended)
* npm 

---

## 🚀 Run Locally

### 1️⃣ Clone Client
```bash
git clone https://github.com/Shahria-Nafis/job-khuji-client
cd jobkhuji-client
npm install
npm run dev
2️⃣ Create Client .env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_API_URL=http://localhost:5000
3️⃣ Clone Server
git clone <server-repo-link>
cd jobkhuji-server
npm install
nodemon index.js
4️⃣ Create Server .env
DB_USER=...
DB_PASS=...
PORT=5000
🔗 Relevant Links
Live Website: https://job-khuji-client.vercel.app

Requirement Doc: B12-A10_category-0017 (Freelance MarketPlace)

Prepared with ❤️ for JobKhuji

