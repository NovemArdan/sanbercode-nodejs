const express = require('express');
const app = express();

// Middleware to set Content-Security-Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:3000");
    next();
});

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Hello Route
app.get('/hello', (req, res) => {
    res.json({ message: "Success fetch message", data: "Hello World!" });
});

// User Route
app.get('/user', (req, res) => {
    res.json({
        message: "Success fetch user",
        data: { id: 1, name: "Budi", username: "budidu", email: "budidu@mail.com" }
    });
});

// Serve static files
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});
