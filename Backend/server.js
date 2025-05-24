const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const db = require('./db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const storeOwnerRoutes = require('./routes/storeOwnerRoutes');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
//const testRoutes = require('./routes/testRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
require('./db');

// Routes
app.use('/api/auth', authRoutes);
//const testRoutes = require('./routes/testRoutes');
//app.use('/api/test', testRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/store-owner', storeOwnerRoutes);
//seed admin
const password = 'Admin@123';
const hashed = bcrypt.hashSync(password, 10);
//console.log(hashed);//

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
