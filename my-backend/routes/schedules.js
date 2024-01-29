const express = require('express');
const User = require('../models/user'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateToken = require('../middlewares/auth'); // Adjust the path as needed

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { password, ...otherDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const user = new User({
      ...otherDetails,
      password: hashedPassword // Store the hashed password
    });

    await user.save();
    res.status(201).send({ user: user._id }); // Send back only the user ID for security
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

// POST /api/users/login - Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

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
// Note: Since JWT is stateless, logout is typically handled on the client by deleting the token.
router.post('/logout', async (req, res) => {
  try {
    // You can include logic to handle token blacklisting here if you implement a server-side token blacklist
    res.send({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /api/users/profile - Get the logged-in user's profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user.toObject();
    res.send(userWithoutPassword);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
