const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req,res,next) => {
  const auth = req.headers['authorization'];
  if(!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.adminMiddleware = (req,res,next) => {
  if(!req.user || !req.user.is_admin) return res.status(403).json({ message: 'Admins only' });
  next();
};
