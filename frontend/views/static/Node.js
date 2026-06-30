app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});
