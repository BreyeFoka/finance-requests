const express = require('express');
const router = express.Router();
const { addEmployee, removeEmployee, getEmployees} = require('../controllers/managerController');

// POST route to add a new employee
router.post('/employees', addEmployee);

// DELETE route to remove an employee by ID
router.delete('/employees/:id', removeEmployee);

router.get('/employees', getEmployees);

module.exports = router;

