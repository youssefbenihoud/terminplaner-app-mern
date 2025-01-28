const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Bitte Benutzername und Passwort eingeben'
    });
  }

  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Falscher Benutzername oder Passwort'
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    token
  });
};