const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Bitte einloggen um Zugriff zu erhalten'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Benutzer existiert nicht mehr'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Ungültiger Token'
    });
  }
};