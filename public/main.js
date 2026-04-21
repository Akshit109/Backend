const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const http = require("http");



const public = path.join(__dirname, '../public');
console.log(public);
app.use(express.static(public));

app.get('/', (req, res) => {
    res.sendFile(path.join( public, 'Home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(public, 'about.html'));
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(public, 'contact.html'));
})

app.get('/Main', (req, res) => {
    res.sendFile(path.join(public, 'Main.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})  