const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    
  const token = req.headers.authorization.split(" ")[1]
  

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'MY_SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
