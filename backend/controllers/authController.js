const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();

exports.register = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send({ error: 'User already exists.' });
    }

    const user = await User.create({
      name,
      email,
      role
    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};

exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};
