require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const candidatesRouter = require('./routes/candidates');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/users');
const eventsRouter = require('./routes/events');
const scholarsRouter = require('./routes/scholars')
const uploadRouter = require('./routes/uploads')
const schedulesRouter = require('./routes/schedules'); // Adjust the path as needed

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user'); // Adjust the path as needed

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Use the secret key from your .env file
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you are using HTTPS
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Middleware for parsing JSON requests
app.use(express.json());

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

// Passport Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Implement logic to find or create a user in your database
    User.findOne({ googleId: profile.id }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        // Create a new user if one doesn't exist
        user = new User({ googleId: profile.id });
        user.save(function(err) {
          if (err) return done(err);
          return done(null, user);
        });
      } else {
        // User exists, return the user
        return done(null, user);
      }
    });
  }
));

app.use(authRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
