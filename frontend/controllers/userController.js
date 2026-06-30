// controllers/userController.js
const db = require('../config/db');

// signup handler
exports.signup = (req, res) => {
  const { officer_id, name, position, contact, station, Password } = req.body;
  const sql = `INSERT INTO Officer (officer_id, name, position, contact, station, Password) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [officer_id, name, position, contact, station, Password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Signup failed');
    }
    res.redirect('login.html?signup=success');
    res.send('✅ Signup successful');
  });
};

exports.login = (req, res) => {
  const { officer_id, Password } = req.body;
  db.query('SELECT * FROM Officer WHERE officer_id = ? AND password = ?', [officer_id, Password], (err, results) => {
    if (err) return res.status(500).send('Login error');
    if (results.length === 0) return res.status(401).send('Invalid credentials');
    res.redirect('/dashboard'); // or send a token/session later
  });
};
