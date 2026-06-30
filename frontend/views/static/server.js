// const express = require('express');
// const path = require('path');
// const db = require("./config/db");
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const criminalRoutes = require('./routes/criminalRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Serve frontend pages
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
// app.get('/add-criminal', (req, res) => res.sendFile(path.join(__dirname, 'views', 'add-criminal.html')));
// app.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
// app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
// app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))); // Optional dashboard

// // ✅ Use route modules
// app.use('/', criminalRoutes);
// app.use('/', userRoutes);

// // ✅ Officer login route
// // ✅ Officer signup route
// app.post("/signup", (req, res) => {
//   const { officer_id, name, password, rank } = req.body;

//   const sql = `
//     INSERT INTO officer (Officer_id, Name, Password, Rank)
//     VALUES (?, ?, ?, ?)
//   `;

//   db.query(sql, [officer_id, name, password, rank], (err, result) => {
//     if (err) {
//       console.error("❌ Signup error:", err);
//       return res.status(500).send("Error during signup.");
//     }

//     // ✅ Redirect to login with success message
//     res.redirect("/login.html?signup=success");
//   });
// });

// app.post("/login", (req, res) => {
//   const { officer_id, name, password, rank } = req.body;

//   const sql = `
//     SELECT * FROM officer
//     WHERE Officer_id = ? AND Name = ? AND Password = ? AND Rank = ?
//   `;

//   db.query(sql, [officer_id, name, password, rank], (err, results) => {
//     if (err) {
//       console.error("❌ Login error:", err);
//       return res.status(500).send("Server error during login.");
//     }

//     if (results.length === 0) {
//       return res.send("❌ Invalid credentials or rank.");
//     }

//     // ✅ Successful login
//     res.redirect("/home.html"); // Redirect to a protected page
//   });
// });

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


app.post("/signup", (req, res) => {
  const { officer_id, name, password, rank } = req.body;

  const sql = `
    INSERT INTO officer (Officer_id, Name, Password, Rank)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [officer_id, name, password, position], (err, result) => {
    if (err) {
      console.error("❌ Signup error:", err);
      return res.status(500).send("Signup failed.");
    }

    res.redirect("/login.html?signup=success");
  });
});
