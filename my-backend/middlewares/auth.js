const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).send({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.secretOrPrivateKey, (err, user) => {
    if (err) {
      return res.status(403).send({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();

    console.log("Authorization Header:", authHeader);
    console.log("Extracted Token:", token);
  });
};



module.exports = authenticateToken;
