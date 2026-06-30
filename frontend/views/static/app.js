const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.static('public')); // for CSS/images
app.use(bodyParser.urlencoded({ extended: true }));

// ==== ROUTES ====

// Homepage → Login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Officer login
app.get('/officer-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'officer-login.html'));
});

// Add criminal form
app.get('/add-criminal', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'add-criminal.html'));
});

// Dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// ===== FORM HANDLERS =====

// Signup form handler
app.post('/signup', (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  users.push(user);
  fs.writeFileSync('./data/users.json', JSON.stringify(users));
  res.redirect('/');
});

// Login form handler
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  const found = users.find(u => u.email === email && u.password === password);
  found ? res.redirect('/dashboard') : res.send('Invalid login');
});

// Add criminal handler
app.post('/add-criminal', (req, res) => {
  const criminals = JSON.parse(fs.readFileSync('./data/criminals.json', 'utf8'));
  criminals.push(req.body);
  fs.writeFileSync('./data/criminals.json', JSON.stringify(criminals));
  res.send('Criminal added successfully!');
});

// Start the server
app.listen(3000, () => {
  console.log('CrimeSanket running at http://localhost:3000');
});
const city = form.city.value || "Any";
alert(`Searching in ${city}`);