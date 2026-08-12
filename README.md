# Bal Jyoti Foundation — Full Stack Web Platform

A luxury, high-performance, modular full-stack web platform built for Bal Jyoti Foundation.

## Architecture

- **Frontend**: HTML5, CSS3 (Modular Design System), Vanilla JavaScript (ES6+), GSAP & Lenis Smooth Scroll.
- **Backend**: Node.js, Express.js REST API, JWT Authentication, Multer file upload, Nodemailer email notifications.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **Storage**: Cloudinary / Local Multi-part Uploads.
- **Admin Panel**: Secure dashboard for content management (Gallery, Events, Donations, Team, Stories, Programs).

## Folder Structure

```
bal-jyoti-foundation/
├── frontend/             # Production static web client
│   ├── css/              # Modular stylesheets
│   ├── js/               # Modular ES6 JavaScript
│   └── assets/           # Images, logos, videos, fonts
├── backend/              # Node.js & Express REST API server
│   ├── config/           # Database & environment configuration
│   ├── controllers/      # Route logic & controllers
│   ├── middleware/       # JWT auth, security, error handling
│   ├── models/           # Mongoose ODM database schemas
│   ├── routes/           # RESTful API endpoints
│   ├── services/         # Mailer, Cloudinary & utilities
│   └── server.js         # API Gateway Entry Point
├── admin/                # Secure CMS Dashboard
└── database/             # DB Seeders & Schema definitions
```

## Getting Started

### Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in credentials.
4. `npm run dev`

### Frontend Setup
Open `frontend/index.html` in browser or serve via live server.
