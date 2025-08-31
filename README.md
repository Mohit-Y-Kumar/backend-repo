Login Backend (Node.js + Express + MongoDB)
Project Overview

This is the backend of the Login System project. It provides authentication using OTP, user management, and note management. Built with Node.js, Express, and MongoDB, it exposes RESTful APIs consumed by the React frontend.

Technology Stack

Backend Framework: Node.js + Express

Database: MongoDB

Authentication: OTP-based

Validation: Custom validators

Version Control: Git

backend/
│
├─ config/
│   └─ passport.js          # Passport.js config for authentication
│
├─ middleware/
│   └─ auth.js              # Authentication middleware
│
├─ models/
│   ├─ User.js              # User schema
│   ├─ Otp.js               # OTP schema
│   └─ Note.js              # Note schema
│
├─ routes/
│   ├─ authRoutes.js        # Routes for login/signup and OTP verification
│   └─ notesRoutes.js       # Routes for note CRUD operations
│
├─ validators/
│   ├─ authValidator.js     # Validation logic for authentication
│   └─ noteValidator.js     # Validation logic for notes
│
├─ server.js                # Entry point for backend server
├─ package.json
└─ package-lock.json


### Features

## User Authentication
# with Google

# Request OTP

# Verify OTP


## Notes Management

 #  Create, Read,  Delete notes

## Secure Routing

 # Protected routes using authentication middleware

 # Input Validation

 # All inputs validated before processing requests

## Installation & Setup

# Clone the repository

 git clone ==> https://github.com/Mohit-Y-Kumar/backend-repo.git
 cd backend


## Install dependencies

 npm install


# Configure environment variables
# Create a .env file in the backend root:
PORT=5000
MONGODB_URL=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_smtp_password



# Run the server

# npm start


# The server runs on http://localhost:5000.
## API Endpoints
## Authentication
## Endpoint	       Method	       Description
 /auth/request-otp	POST	Request OTP for login/signup
 /auth/verify-otp	POST	Verify OTP and return JWT token
## Notes
#  Endpoint	  Method	  Description
 /notes	GET 	 Get      all notes for authenticated user
 /notes	POST	 Create    a new note
 /notes/:id	PUT	  Update    note by ID
 /notes/:id	     DELETE	      Delete note by ID
