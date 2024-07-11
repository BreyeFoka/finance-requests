const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models/User'); // Adjust the path if necessary
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check role and limit for managers
    if (req.user.role === 'manager') {
      const managerCount = await User.count({ where: { role: 'manager' } });
      if (managerCount >= 2) {
        return res.status(403).send({ error: 'Manager limit reached.' });
      }
    }

    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
