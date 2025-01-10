# MERN Authentication Web Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) authentication web application that allows users to:

- Sign up
- Log in
- Reset passwords

## Features

- **User Authentication**: Signup, login, and password reset functionality.
- **Secure Passwords**: Passwords are hashed using bcrypt.js.
- **Email Verification**: Users receive an email verification or OTP for password reset.
- **Token-Based Authentication**: Managed user sessions using JSON Web Tokens (JWT).
- **Responsive UI**: Styled with Tailwind CSS for modern, responsive design.
- **Cross-Origin Resource Sharing**: Configured with CORS for secure API calls from different domains.

---

## Backend Setup

### Technologies Used

1. **Node.js**: Backend runtime environment.
2. **Express.js**: Framework for creating API endpoints.
3. **MongoDB Atlas**: Cloud database for storing user data.
4. **Mongoose**: Used for schema creation and database communication.

### Backend Packages

- **bcrypt.js**: Hash passwords for secure storage.
- **cookie-parser**: Parse cookies from incoming requests.
- **cors**: Allow requests from different origins.
- **dotenv**: Load environment variables from `.env` files.
- **jsonwebtoken**: Create and verify tokens for authentication.
- **nodemailer**: Send verification and OTP emails.

### Key Functionality

- **Schemas and Models**:
  - Created using Mongoose to define user data structure.
  
- **API Endpoints**:
  - User registration, login, and password reset APIs.

- **MongoDB Connection**:
  - Connected to MongoDB Atlas using Mongoose's `connect` function.

- **Environment Variables**:
  - Sensitive data (e.g., database URL, email credentials) stored in `.env` files.

---

## Frontend Setup

### Technologies Used

1. **React.js**: JavaScript library for building the user interface.
2. **Tailwind CSS**: Utility-first CSS framework for styling.
3. **PostCSS**: Used for processing CSS to ensure compatibility across browsers.
4. **Vite**: Build tool for optimized production builds.

### Frontend Functionality

#### React Hooks

- **useState**:
  - Conditional rendering.
  - Managing input values in forms.

- **useRef**:
  - Store references to input fields for OTP verification.
  - Implement features like auto-focus when navigating between OTP input fields.

- **useEffect**:
  - Perform auto-login functionality using JSON Web Tokens.

- **useContext**:
  - Share and manage state across the application without prop drilling.

#### React Router

- Used to manage routing between pages such as login, signup, and reset password.

#### Styling

- **Tailwind CSS**:
  - Utility classes for responsive and modern UI design.

- **Autoprefixer**:
  - Adds browser-specific CSS properties automatically.

---

## Additional Tools

- **Nodemailer**:
  - Used for sending email verifications and OTPs to users.

- **PostCSS**:
  - Ensures compatibility of CSS across different browsers.

---

## How to Run the Project

### Prerequisites

1. **Node.js** installed on your machine.
2. MongoDB Atlas account for the database.

### Steps to Run

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up `.env` files for backend:
   - Add MongoDB URL, JWT secret, and email credentials.

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open the application in your browser at `http://localhost:3000`.

---

## Folder Structure

### Backend
- **`models`**: Contains Mongoose schemas and models.
- **`routes`**: Defines API endpoints.
- **`controllers`**: Contains logic for handling API requests.
- **`config`**: Stores configuration files.

### Frontend
- **`src/components`**: Contains reusable React components.
- **`src/pages`**: Includes main pages like login, signup, and reset password.
- **`src/index`**: Contains Tailwind CSS and custom styles.

---

## Future Improvements

1. Add social login functionality (e.g., Google, Facebook).
2. Implement role-based authentication.
3. Enhance UI/UX for better user experience.
4. Add automated tests for API endpoints.

---

## Conclusion

This MERN authentication application is a robust solution for managing user registration, login, and password resets. With secure practices and modern tooling, it is suitable for production-level deployment.

