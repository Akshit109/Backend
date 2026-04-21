const express = require('express');
const app = express();
const errorhandler = require('./middleware/errorhandler');
const reqAge = (req, res, next) => {
    console.log("Middleware executed");
    next();
};
app.get('/', (req, res) => {
    res.send("Welcome to home page");
});
app.get('/about', reqAge, (req, res) => {
    res.send("Welcome to about page");
});
app.get('/contact', (req, res) => {
    res.send("Welcome to contact page");
});
app.use((req, res, next) => {
    const err = new Error("Route not found");
    err.statusCode = 404;
    next(err);
});
app.use(errorhandler);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});