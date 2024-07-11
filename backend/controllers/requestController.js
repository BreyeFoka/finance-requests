const Request = require('../models/Request');
const User = require('../models/User');

// Submit new request
exports.submitRequest = async (req, res) => {
  const { amount, reason, date } = req.body;
  const { id } = req.user;

  try {
    const request = await Request.create({
      worker_id: id,
      amount,
      reason,
      date
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

// Approve or deny request (for accountants)
exports.approveRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findByPk(id);

    if (!request) {
      return res.status(404).send({ error: 'Request not found.' });
    }

    request.status = status;
    await request.save();

    res.status(200).send({ message: 'Request status updated successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error.' });
  }
};
