const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// POST route for uploading a file
router.post('/', upload.single('file'), (req, res) => {
  // You might want to save file information in the database
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// DELETE route for deleting a file
router.delete('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'File deleted successfully' });
  });
});

module.exports = router;
