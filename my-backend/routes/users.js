const express = require('express');
const User = require('../models/user'); // Adjust the path as needed
const Scholar = require ('../models/scholar');
const Candidate = require ('../models/scholar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const authenticateToken = require('../middlewares/auth'); // Adjust the path as needed


// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { password, role, profileData, ...otherDetails } = req.body;

    let profile;

    // Create either a Scholar or Candidate based on the role
    if (role === 'Scholar') {
      const newScholar = new Scholar(profileData);
      profile = await newScholar.save();
    } else if (role === 'Candidate') {
      const newCandidate = new Candidate(profileData);
      profile = await newCandidate.save();
    } else {
      throw new Error('Invalid role specified');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User and link it to the Scholar/Candidate
    const user = new User({
      ...otherDetails,
      password: hashedPassword,
      role, // 'Scholar' or 'Candidate'
      profile: profile._id
    });

    await user.save();
    res.status(201).send({ user: user._id });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// POST /api/users/login - Authenticate a user
router.post('/login', async (req, res) => {
  try {
    console.log("Login attempt:", req.body);

    const user = await User.findOne({ email: req.body.email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    // Generate a token (assuming you have a secret key for JWT)
    const token = jwt.sign({ _id: user._id }, process.env.secretOrPrivateKey);

    res.send({ token }); // Send the token to the client
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
});


// POST /api/users/logout - Logout a user
router.post('/logout', async (req, res) => {
  try {
    // Logic to handle token invalidation or session termination
    res.send({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /api/users/profile - Get the logged-in user's profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Check if the user is authenticated and their ID is available
    if (!req.user || !req.user._id) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // You might want to exclude sensitive information like password
    const { password, ...userWithoutPassword } = user.toObject();
    res.send(userWithoutPassword);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).send({ error: error.message });
  }
});

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/success'); // Or your success route
});

module.exports = router;
