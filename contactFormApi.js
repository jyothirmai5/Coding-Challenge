const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
// Use CORS middleware
app.use(cors());
app.use(express.json()); // Use the express.json() middleware to parse JSON data
const port = 3000;
let users = [];

// Load users from the JSON file
try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
} catch (error) {
    console.error('Error reading users.json file:', error);
}
app.get('/forms', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Set the response headers
            res.writeHead(200, { 'Content-Type': 'application/json' });

            // Send the JSON data as the response
            res.end(JSON.stringify(jsonData, null, 2));
        }
    });
});
// POST request to add a new user
app.post('/add-user', (req, res) => {
    const newUser = req.body;
    // Assign a new unique ID
    newUser.id = users.length + 1;

    // Add the new user to the beginning of the array using unshift
    users.unshift(newUser);

    // Save updated users to the JSON file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

    res.json({ message: 'User added successfully', user: newUser });
});

let server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

module.exports = server;