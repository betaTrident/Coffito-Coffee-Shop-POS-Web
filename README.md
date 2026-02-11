# ☕ Coffito Coffee Shop POS

A web-based Point of Sale (POS) system designed for coffee shops and cafés — built with **React**, **Vite**, **Tailwind CSS**, **Express**, and **MongoDB**.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

---

## Features

- **Dashboard** — Overview of total sales, cups sold, total products, and best-selling items
- **Product Management** — Add, update, and delete products with search functionality
- **Sales Reports** — View daily, monthly, and yearly sales data with export to CSV
- **Transaction History** — Track all completed transactions
- **Item Sold Tracking** — Monitor individual item sales
- **Account Management** — Manage admin and staff accounts
- **Authentication** — Login system with admin/staff roles

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS      |
| Backend   | Express.js, Node.js               |
| Database  | MongoDB with Mongoose             |
| Icons     | React Icons                       |
| HTTP      | Axios                             |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

### Installation

```bash
# Clone the repository
git clone https://github.com/betaTrident/Coffito-Coffee-Shop-POS.git
cd Coffito-Coffee-Shop-POS

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/COFFITO
PORT=5000
```

### Running the App

```bash
# Start frontend (Vite dev server)
npm run dev

# Start backend (Express server)
npm run server

# Start both at the same time
npm run dev:all
```

### Production

```bash
npm run build
npm run preview
```

## Project Structure

```
├── src/                    # React frontend
│   ├── pages/              # Page-level components
│   ├── components/
│   │   ├── layout/         # Sidebar, Topbar, DateTime
│   │   └── common/         # Modals, shared UI
│   └── assets/             # Images and logos
│
├── server/                 # Express backend
│   ├── config/             # Database connection
│   ├── models/             # Mongoose schemas
│   └── routes/             # API route handlers
│
├── index.html              # Vite entry point
├── vite.config.js          # Vite + path alias config
├── tailwind.config.js      # Tailwind theme config
└── package.json            # Scripts and dependencies
```

## License

This project is for educational purposes.
