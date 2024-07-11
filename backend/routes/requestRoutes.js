const express = require('express');
const { submitRequest, getAllRequests, approveRequest } = require('../controllers/requestController');
const router = express.Router();

router.post('/', submitRequest);
router.get('/', getAllRequests);
router.put('/:id', approveRequest);

module.exports = router;
