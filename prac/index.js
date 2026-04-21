const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let student = {
        name: 'Akki',
        roll: 3,
        email: 'jaiswalakshit4@gmail.com',
        age: 20,
        hobby: ['Coding', 'Gaming', 'Music', 'Movies']
    };

    res.render('home', { student });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});