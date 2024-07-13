const express = require('express');
const upload = require('../multerConfig');
const { submitRequest, getAllRequests, approveRequest, getRequestsByWorkerId } = require('../controllers/requestController');
const router = express.Router();

router.post('/', upload, submitRequest);
router.get('/', getAllRequests);
// Get all requests by worker_id
router.get('/one', getRequestsByWorkerId);
router.put('/:id', approveRequest);

module.exports = router;
