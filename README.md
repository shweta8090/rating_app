 ⭐ Rating System App

A full-stack rating system for stores built with React.js (frontend), Express.js (backend), and MySQL (database).

 🔧 Features

- 👥 User Roles: Admin, Normal User, Store Owner
- ✅ Authentication: JWT-based secure login/register
- ⭐ Store Rating: Users can rate stores (1 to 5)
- 📊 Admin Dashboard:
  - View users, stores, ratings
  - Filter/search functionality
  - Add new users/stores
- 👤 User Dashboard:
  - Search and rate stores
- 🛒 Store Owner Dashboard:
  - View ratings given to their store
- 🔐 Update Password (for all roles)

 🚀 Tech Stack

- Frontend: React.js, Axios, React Router DOM
- Backend: Node.js, Express.js, JWT, bcryptjs
- Database: MySQL (via MySQL Workbench)

 📦 Setup Instructions

 🔗 Backend

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   
2.Install dependencies:npm install express mysql2 dotenv nodemon bcryptjs jsonwebtoken
3.Create a .env file:DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=rating_system
JWT_SECRET=your_jwt_secret

4.Run the server:npx nodemon server.js

🌐 Frontend
1.Navigate to the frontend/ folder:cd frontend
2.Install dependencies:npm -i
3.Start the React app:npm start

⚙️ Database
Use the provided SQL scripts or MySQL Workbench to set up the rating_system database with tables:

1.users

2.stores

3.ratings

📌 Notes
Be sure to match the backend port (5000) and frontend port (3000)

Ensure MySQL is running and connected

