const express = require('express');
const router = express.Router();
const { addEmployee, removeEmployee } = require('../controllers/managerController');

// POST route to add a new employee
router.post('/employees', addEmployee);

// DELETE route to remove an employee by ID
router.delete('/employees/:id', removeEmployee);

module.exports = router;

