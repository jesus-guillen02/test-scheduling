require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

const candidatesRouter = require('./routes/candidates');
const userRoutes = require('./routes/users');
const eventsRouter = require('./routes/events');
const scholarsRouter = require('./routes/scholars');
const uploadRouter = require('./routes/uploads');
const schedulesRouter = require('./routes/schedules'); // Adjust the path as needed

const mongoose = require('mongoose');
const session = require('express-session');

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Use the secret key from your .env file
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you are using HTTPS
}));

// Middleware for parsing JSON requests
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidatesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/scholars', scholarsRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/schedules', schedulesRouter);

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
