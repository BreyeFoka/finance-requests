const User = require('../models/User');

// Add new employee (for managers)
exports.addEmployee = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send({ error: 'User already exists.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).send({ message: 'Employee added successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};

// Remove employee (for managers)
exports.removeEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ error: 'Employee not found.' });
    }

    await user.destroy();

    res.status(200).send({ message: 'Employee removed successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};
