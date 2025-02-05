const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/coffeeswap', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});

// Test route
app.get('/status', (req, res) => {
    res.json({ message: 'Server is up and running!', uptime: process.uptime() });
});

// Signup route (Save users in MongoDB)
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered!' });
        }

        // Create and save new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful!', user: { name, email } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login route (Find user in MongoDB)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }

        res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Debugging route to view all users (for testing)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
