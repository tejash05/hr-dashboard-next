# 💼 HR Dashboard – Performance Management System

**HR Dashboard** is a feature-rich HR performance dashboard that allows HR managers to manage employee data, track performance, bookmark profiles, and view actionable analytics. Built using **Next.js (App Router)**, **Tailwind CSS**, **Zustand**, and **NextAuth.js**, it delivers a responsive, secure, and visually appealing experience.

---

## 🚀 Why HR Dashboard?

- ✅ Employee management with real-time filters and pagination
- ✅ Bookmarking and promoting employees with UI feedback
- ✅ Dark mode, skeleton loaders, and animation transitions
- ✅ Google OAuth + Credential-based authentication (NextAuth.js)
- ✅ Visual analytics for performance and bookmarking trends

---

## 📌 Features

### 🏠 Dashboard Homepage (/)
- Fetches employee data from [dummyjson.com](https://dummyjson.com/users?limit=20)
- Random department and performance rating assignment
- Cards show: Name, Email, Age, Department, Stars, and Actions (View, Bookmark, Promote)

### 🔍 Search & Filter
- 🔎 Live search by name/email/department
- 🏢 Multi-select department filter
- ⭐ Filter by rating (1–5)

### 👤 Employee Details Page (/employee/[id])
- Detailed profile view including mock: Bio, Phone, Department
- ⭐ Star badge for ratings
- 🗂️ Tabbed UI: Overview, Projects, Feedback
- ✍️ Feedback form with toast notifications

### 📌 Bookmarks (/bookmarks)
- View all bookmarked users
- Unbookmark or promote with one click

### 📊 Analytics (/analytics)
- Department-wise average ratings chart
- Weekly bookmark trends (mocked)
- Built with Chart.js and responsive charts

### 🔐 Authentication
- Google OAuth + Custom Credentials Login (NextAuth.js)
- Toggle between login and register modes
- Protected routes with session handling

### ➕ Create User Modal
- Modal for adding new employee with validation
- Generates random ID + accepts all fields

---

## 🧰 Tools Used

- **Next.js App Router**
- **React 18+**
- **Tailwind CSS**
- **Zustand**
- **NextAuth.js**
- **Chart.js**
- **React Hot Toast**
- **Framer Motion**

---

## 🛠️ Tech Stack Badges

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart-dot-js&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-3b82f6?style=for-the-badge&logo=next.js&logoColor=white)

---

## 📁 Folder Structure

```
hr-dashboard-next/
├── app/                        # Next.js App Router structure
│   ├── page.tsx               # Dashboard page
│   ├── analytics/             # Analytics page and chart components
│   ├── auth/                  # Login and Register logic
│   └── employee/[id]/         # Dynamic route for employee details
├── components/                # Reusable UI components (Card, Modal, Navbar, etc.)
├── hooks/                     # Custom React hooks (e.g., useSearch)
├── lib/                       # Utility functions and mock logic
├── store/                     # Zustand state management (bookmarks)
├── public/                    # Static assets (if any)
├── styles/                    # Global and Tailwind styles
├── .env                       # Google OAuth & NextAuth credentials
└── README.md                  # Documentation
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repo

```bash
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard
```

### 🔹 2. Install Dependencies

```bash
npm install
```

### 🔹 3. Configure .env.local

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 🔹 4. Run Locally

```bash
npm run dev
```

---

## 🖥️ Screenshots

<img src="./public/screenshots/login.png" width="600"/><br/>
Login / Register

<img src="./public/screenshots/dashboard.png" width="600"/><br/>
Dashboard Page

<img src="./public/screenshots/bookmarks.png" width="600"/><br/>
Bookmarks Page

<img src="./public/screenshots/employee-details.png" width="600"/><br/>
Employee Profile

<img src="./public/screenshots/analytics.png" width="600"/><br/>
Analytics Charts

---

## ✨ Contributor

- **Name:** Tejash Tarun  
- **Role:** Full Stack Developer | UI/UX | State & Auth Logic

---

## 🌐 Live Link (Optional)
> Coming Soon on Vercel or Render
