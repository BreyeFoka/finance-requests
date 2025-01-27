const Request = require('../models/Request');
const User = require('../models/User');


// Submit new request
exports.submitRequest = async (req, res) => {
  const { amount, reason, date, comments, names, approval} = req.body;
  const file = req.file ? req.file.path : null;

  try {
    const request = await Request.create({
      amount,
      reason,
      date,
      comments,
      filepath: file,
      names,
      approval
    });
    res.status(201).send({ message: 'Request submitted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};

// Get all requests (for accountants)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};

// Get all requests by worker_id (For each worker)
exports.getRequestsByWorkerId = async (req, res) => {
  const { id } = req.user;

  try {
    const requests = await Request.findAll({
      where: { worker_id: id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    if (requests.length === 0) {
      return res.status(404).send({ error: 'No requests found for this worker.' });
    }

    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};

// Approve or deny request (for accountants)
exports.approveRequest = async (req, res) => {
  const { id } = req.params;
  const {status, approvalcomment} = req.body;
  try {
    const request = await Request.findByPk(id);

    if (!request) {
      return res.status(404).send({ error: 'Request not found.' });
    }

    request.status = status;
    request.approvalcomment = approvalcomment;
    await request.save();

    res.status(200).send({ message: 'Request status updated successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};
