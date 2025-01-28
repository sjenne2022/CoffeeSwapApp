const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Test route to confirm server is running
app.get('/status', (req, res) => {
    res.json({ message: 'Server is up and running!', uptime: process.uptime() });
});

// Bind to all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

app.get('/coffee-items', (req, res) => {
    const coffeeItems = [
        { id: 1, name: 'Ethiopian Beans', description: 'Light roast with floral notes' },
        { id: 2, name: 'Colombian Beans', description: 'Medium roast, chocolatey finish' },
    ];
    res.json(coffeeItems);
});