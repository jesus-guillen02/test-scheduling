const express = require('express');
const Developer = require('../models/devs'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateToken = require('../middlewares/auth'); // Reuse your authentication middleware

// POST /api/developers/register - Register a new developer
router.post('/register', async (req, res) => {
  try {
    const { password, ...otherDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const developer = new Developer({
      ...otherDetails,
      password: hashedPassword
    });

    await developer.save();
    res.status(201).send({ developer: developer._id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// POST /api/developers/login - Authenticate a developer
router.post('/login', async (req, res) => {
  try {
    const developer = await Developer.findOne({ email: req.body.email });

    if (!developer) {
      return res.status(404).send('Developer not found.');
    }

    const isMatch = await bcrypt.compare(req.body.password, developer.password);

    if (!isMatch) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign({ _id: developer._id }, process.env.secretOrPrivateKey);
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST /api/developers/logout - Logout a developer
// Since JWT is stateless, this would be handled on the client-side

// GET /api/developers/profile - Get the logged-in developer's profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    if (!req.developer || !req.developer._id) {
      return res.status(401).send({ error: 'Developer not authenticated' });
    }

    const developer = await Developer.findById(req.developer._id);
    if (!developer) {
      return res.status(404).send({ error: 'Developer not found' });
    }

    const { password, ...developerWithoutPassword } = developer.toObject();
    res.send(developerWithoutPassword);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
