const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const ExcelJS = require('exceljs');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Route to export all requests
router.get('/export-requests', async (req, res) => {
  const query = 'SELECT * FROM requests';
  db.query(query, async (err, results) => {
    if (err) throw err;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Requests');
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Worker ID', key: 'worker_id', width: 10 },
      { header: 'Comments', key: 'comments', width: 50 },
      { header: 'Names', key: 'names', width: 50},
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Reason', key: 'reason', width: 30 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Attached File', key: 'filepath', width: 15 }
    ];

    results.forEach((request) => {
      worksheet.addRow({
        ...request,
        filepath: request.filepath ? 'Yes' : 'No'
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=requests.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  });
});

// Route to export approved requests
router.get('/export-approved-requests', async (req, res) => {
  const query = "SELECT * FROM requests WHERE status='approved'";
  db.query(query, async (err, results) => {
    if (err) throw err;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Approved Requests');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'names', width: 30 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Reason', key: 'reason', width: 30 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Attached File', key: 'filepath', width: 15 }
    ];

    results.forEach((request) => {
      worksheet.addRow({
        ...request,
        filepath: request.filepath ? 'Yes' : 'No'
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=approved_requests.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  });
});

module.exports = router;
