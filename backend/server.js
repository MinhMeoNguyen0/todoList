require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


// User Routes

app.use('/api/users', userRoutes);

// List Routes
app.use('/api/lists', listRoutes);

// Task Routes
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
