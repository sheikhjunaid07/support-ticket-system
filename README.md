# 🎫 Support Ticket Management System

A full-stack, responsive **Support Ticket Management System** built on the **MERN** stack (MongoDB, Express.js, React, Node.js) with **Vite** and **Tailwind CSS**. Designed for support and admin teams to manage customer queries, monitor operational ticket metrics, update statuses, and track issues from creation to resolution.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.5-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT_&_Bcrypt-blue?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Data Models & Schema](#-data-models--schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Demo Credentials](#-demo-credentials)
- [Environment Variables](#-environment-variables)
- [User Interface & Workflow](#-user-interface--workflow)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## 📌 Overview

The **Support Ticket Management System** provides customer support teams with a centralized interface to log, organize, prioritize, and track customer support requests.

It includes **admin authentication (JWT)**, **interactive dashboard metrics**, **fast full-text search & filtering**, **auto-generated sequential ticket IDs** (e.g., `TCK-1001`), **modal-based ticket creation**, **status transitions**, and **safe deletion with confirmation safeguards**.

---

## ✨ Key Features

- **🔐 Secure Admin Authentication**:
  - Protected endpoints with JWT Bearer tokens and bcrypt password hashing.
  - Client-side route guards (`ProtectedRoute` & `PublicRoute`) with session persistence in `localStorage`.
  - **1-Click Demo Login** button on the sign-in page for instant testing and review.

- **📊 Dashboard KPI Metrics & Summary Cards**:
  - Live aggregated counter cards showing **Total Tickets**, **Open**, **In Progress**, and **Resolved** counts.
  - Real-time updates as tickets are created, edited, or deleted.

- **🎫 Full Ticket Lifecycle Management (CRUD)**:
  - **Create**: Modal form with client and server-side validation (name, valid email regex, subject, description, priority).
  - **Read**: Responsive table view displaying Ticket ID, Customer, Subject, Priority, Status, and Date.
  - **Update**: Quick inline status change directly from the table or full ticket details modal.
  - **Delete**: Safe delete action backed by a modal confirmation dialog to prevent accidental data loss.

- **🔢 Auto Sequential Ticket IDs**:
  - Automated, human-readable identifier generator (`TCK-1001`, `TCK-1002`, etc.) with collision handling.

- **🔍 Live Search & Status Filtering**:
  - Fast status filtering tabs (`All`, `Open`, `In Progress`, `Resolved`).
  - Real-time multi-field search across **Ticket ID**, **Customer Name**, **Customer Email**, and **Subject**.

- **🎨 Modern & Responsive UI/UX**:
  - Clean UI built with **Tailwind CSS v4** and `@tailwindcss/vite`.
  - Color-coded badges for priorities (`High`, `Medium`, `Low`) and statuses (`Open`, `In Progress`, `Resolved`).
  - Accessible modal dialogs with backdrop click/escape-to-close behavior.
  - Non-blocking toast-like banner alerts for success and error messages.

---

## 🛠 Tech Stack

### **Frontend**
- **Library**: [React 18](https://react.dev/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/) (configured with auth interceptors and unified error handling)

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose 8](https://mongoosejs.com/)
- **Authentication**: [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validation**: Mongoose Schema Validators & `mongoose-unique-validator`
- **CORS & Environment**: `cors`, `dotenv`
- **Dev Tooling**: `nodemon`

---

## 📂 Project Architecture

```
plexigenius/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # User login & JWT issuance
│   │   └── ticketController.js     # Ticket CRUD & KPI metrics logic
│   ├── middleware/
│   │   └── authMiddleware.js       # Bearer token verification middleware
│   ├── models/
│   │   ├── db.js                   # Mongoose connection & disconnect helpers
│   │   ├── Ticket.js               # Support ticket Mongoose schema
│   │   └── User.js                 # Admin user schema with bcrypt hashing
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth routes
│   │   └── ticketRoutes.js         # /api/tickets protected routes
│   ├── seed/
│   │   └── seed.js                 # Database seeding script (admin user & demo tickets)
│   ├── .env.example                # Backend environment template
│   ├── package.json
│   └── server.js                   # Express application entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js          # Authentication API methods
│   │   │   ├── axiosClient.js      # Axios instance with request/response interceptors
│   │   │   └── ticketApi.js        # Ticket API service calls
│   │   ├── components/
│   │   │   ├── ConfirmDialog.jsx   # Deletion confirmation modal
│   │   │   ├── CreateTicketModal.jsx # Ticket creation modal dialog
│   │   │   ├── Modal.jsx           # Reusable generic accessible modal wrapper
│   │   │   ├── Navbar.jsx          # Header with user profile & logout
│   │   │   ├── ProtectedRoute.jsx  # Auth protection route guards
│   │   │   ├── TicketDetailsModal.jsx # Detailed view & status switcher
│   │   │   ├── TicketSummaryCards.jsx # Dashboard KPI counter cards
│   │   │   └── Ui.jsx              # Badges, Alert banners, Spinner, Empty state
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # React Context for auth state & login/logout
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx   # Main ticket management dashboard
│   │   │   └── LoginPage.jsx       # Admin login screen with 1-click demo button
│   │   ├── App.jsx                 # Route definitions
│   │   ├── index.css               # Tailwind directives and utility classes
│   │   └── main.jsx                # React root mount
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # Vite config with Tailwind & /api proxy to backend
│
└── README.md
```

---

## 🗄 Data Models & Schema

### **1. User Schema (`backend/models/User.js`)**
| Field | Type | Required | Constraints / Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Trimmed admin name |
| `email` | String | Yes | Unique, lowercase, valid email pattern |
| `password` | String | Yes | Min 6 chars, auto-hashed using `bcryptjs` (salt 10) |
| `role` | String | No | Default: `'admin'` |
| `timestamps` | Date | Auto | `createdAt` and `updatedAt` |

### **2. Ticket Schema (`backend/models/Ticket.js`)**
| Field | Type | Required | Constraints / Description |
| :--- | :--- | :--- | :--- |
| `ticketId` | String | Yes | Unique sequential identifier (e.g. `TCK-1001`) |
| `customerName` | String | Yes | Min 2 characters, trimmed |
| `customerEmail` | String | Yes | Valid email pattern, lowercase |
| `subject` | String | Yes | Min 3 characters, issue title |
| `description` | String | Yes | Detailed problem report |
| `priority` | String | No | Enum: `['Low', 'Medium', 'High']` (Default: `'Medium'`) |
| `status` | String | No | Enum: `['Open', 'In Progress', 'Resolved']` (Default: `'Open'`) |
| `timestamps` | Date | Auto | `createdAt` and `updatedAt` |

---

## 📡 API Reference

All ticket endpoints require an `Authorization: Bearer <token>` header obtained from `/api/auth/login`.

### **Authentication**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Sign in with email and password to receive JWT token |

#### Example Login Request:
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@support.com",
  "password": "Admin@123"
}
```

#### Example Login Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "67399f...",
    "name": "System Admin",
    "email": "admin@support.com",
    "role": "admin"
  }
}
```

---

### **Tickets**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tickets/stats` | Protected | Aggregated counts for Total, Open, In Progress, and Resolved |
| `GET` | `/api/tickets` | Protected | List tickets. Supports query params: `?status=Open` & `?search=query` |
| `POST` | `/api/tickets` | Protected | Create a new ticket with auto-generated sequential `ticketId` |
| `GET` | `/api/tickets/:id` | Protected | Retrieve full details of a single ticket by MongoDB ID |
| `PUT` | `/api/tickets/:id` | Protected | Update ticket fields or change status (`Open`, `In Progress`, `Resolved`) |
| `DELETE`| `/api/tickets/:id` | Protected | Delete a ticket permanently |

#### Example Ticket Creation Request:
```json
POST /api/tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "subject": "Unable to complete order payment",
  "description": "Payment checkout hangs on card processing screen with error 400.",
  "priority": "High"
}
```

---

## 🚀 Getting Started

### Prerequisites
Make sure the following are installed on your machine:
- **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (bundled with Node.js)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

---

### 1. Clone Repository

```bash
git clone https://github.com/sheikhjunaid07/support-ticket-system.git
cd support-ticket-system
```

---

### 2. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file from the template:
   ```bash
   # On Windows PowerShell
   Copy-Item .env.example .env

   # On Linux / macOS / Bash
   cp .env.example .env
   ```

4. Verify or modify the values in `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/support_tickets
   JWT_SECRET=support_ticket_jwt_secret_key_123
   JWT_EXPIRES_IN=7d
   ```

5. **Seed the database** with the demo admin account and sample tickets:
   ```bash
   npm run seed
   ```
   > Output will confirm the creation of the admin user (`admin@support.com`) and 6 sample support tickets.

6. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will be running at `http://localhost:5000`.

---

### 3. Frontend Setup

1. Open a **new terminal window** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
   *(Requests to `/api/*` are automatically proxied to `http://localhost:5000` via Vite)*.

---

## 🔑 Demo Credentials

A pre-configured admin account is created automatically when running `npm run seed`:

| Role | Email | Password |
| :--- | :--- | :--- |
| **System Admin** | `admin@support.com` | `Admin@123` |

> 💡 **Tip:** On the `/login` screen, you can click the **"Quick Demo Login"** button to instantly prefill these credentials without typing.

---

## ⚙️ Environment Variables

### **Backend (`backend/.env`)**
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port on which the Express server listens |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/support_tickets` | MongoDB connection URI string |
| `JWT_SECRET` | `your_jwt_secret_key_here` | Secret key used to sign and verify JSON Web Tokens |
| `JWT_EXPIRES_IN` | `7d` | Token validity period before expiration |

### **Frontend (`frontend/.env` - Optional)**
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `/api` | Base API URL (defaults to Vite proxy `/api` in local dev) |

---

## 🖥 User Interface & Workflow

1. **Sign In**: Navigate to `/login`. Use the one-click demo login button or enter the admin credentials.
2. **Review Metrics**: The dashboard immediately loads summary metrics: Total, Open, In Progress, and Resolved.
3. **Filter & Search**:
   - Click status filter pills (`Open`, `In Progress`, `Resolved`, `All`) to inspect specific queues.
   - Type into the search input to filter by Ticket ID (`TCK-1001`), customer name, email, or subject keywords.
4. **Create a Ticket**:
   - Click the **"+ Create Ticket"** button.
   - Enter customer name, email address, issue subject, detailed description, and set the priority.
   - Submitting creates the record with an automatically assigned sequential Ticket ID.
5. **Update Status**:
   - **Inline**: Use the status dropdown directly in the table row for instant status updates.
   - **Modal**: Click on any ticket to open the full ticket view and transition between statuses with a single click.
6. **Delete Ticket**:
   - Click the delete (trash) button on any ticket.
   - Confirm deletion in the safeguard modal to remove the ticket from the system.
7. **Sign Out**: Click the **"Sign out"** button in the top navigation bar to clear the auth session and return to the login screen.

---

## 📜 Available Scripts

### **Backend (`backend/package.json`)**
- `npm run dev`: Starts the backend server with `nodemon` for hot-reloading.
- `npm start`: Starts the backend server with standard `node server.js`.
- `npm run seed`: Seeds the database with demo admin user and initial sample tickets.

### **Frontend (`frontend/package.json`)**
- `npm run dev`: Launches Vite development server on `http://localhost:5173`.
- `npm run build`: Compiles production build into `frontend/dist`.
- `npm run preview`: Locally previews the production build.

---

## 🛡 Security & Best Practices Implemented

- **Password Hashing**: Passwords stored as irreversible salted hashes using `bcryptjs`.
- **JWT Authorization**: Route-level protection via `protect` Express middleware verifying token validity and expiration.
- **Axios Interceptors**: Automatically appends the Bearer token to all outgoing authenticated requests and handles centralized 401 error states.
- **Input Sanitization**: Email formatting enforced with regex, strings trimmed, and Mongoose enum constraints applied to status and priority values.
- **Route Guards**: React Router protected routes prevent unauthorized access to the admin dashboard, while public routes redirect already authenticated users away from the login page.

---

## 📄 License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

Developed by **[Sheikh Junaid](https://github.com/sheikhjunaid07)**.  
Feedback, bug reports, and contributions are welcome!