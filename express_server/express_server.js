const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'express_server' folder
app.use(express.static('express_server'));

// Define a GET route
app.get('/users', (req, res) => {
    // Return a list of users
    const data = [
        'Ivan',
        'John',
        'Bob'
    ];

    const html = data.reduce((str, item) => str + `<li>${item}</li>`, '')
    res.send(`<ul>${html}</ul>`);
});

app.get('/users/:id', (req, res) => {
    // Return Single user by id
    const data = [
        'Ivan',
        'John',
        'Bob'
    ];

    const user = data[Number(req.params.id)];

    if(user){
        res.send(`Single user by id: ${user}`);
    } else {
        res.send('<h1>Such user is not found</h1>')
    }
  
});

/*
// Define a POST route
app.post('/users', (req, res) => {
    // Create a new user
});

// Define a PUT route
app.put('/users/:id', (req, res) => {
    // Update the user with the specified ID
});

// Define a DELETE route
app.delete('/users/:id', (req, res) => {
    // Delete the user with the specified ID
});
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})