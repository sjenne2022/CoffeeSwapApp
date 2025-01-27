const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Test route to confirm server is running
app.get('/status', (req, res) => {
    res.json({ message: 'Server is up and running!', uptime: process.uptime() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});