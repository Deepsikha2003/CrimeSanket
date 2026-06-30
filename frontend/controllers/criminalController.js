// controllers/criminalController.js
const path = require('path');
const db = require('../config/db');

exports.addCriminal = (req, res) => {
  const {
    ['criminal-id']: criminalId,
    ['full-name']: fullName,
    nickname,
    dob,
    gender,
    nationality,
    address,
    status
  } = req.body;

  const imagePath = req.file ? `/images/${req.file.filename}` : null;

  const sql = `
    INSERT INTO Criminal 
    (Criminal_id, Name, Alias, DOB, Gender, Nationality, Address, Photo, Status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    criminalId,
    fullName,
    nickname,
    dob,
    gender,
    nationality,
    address,
    imagePath,
    status
  ], (err, result) => {
    if (err) {
      console.error('❌ Insert error:', err);
      return res.status(500).send('Failed to add criminal.');
    }
    res.send('✅ Criminal added successfully!');
  });
};

exports.getCriminalById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Criminal WHERE Criminal_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
};
