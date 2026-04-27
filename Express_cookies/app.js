const express = require("express");
const cookieParser = require("cookie-parser");
const app = express(); 
app.use(cookieParser());
app.get('/set-cookie', (req, res) => {
    res.cookie("username", "section FC", {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    });
    res.send("Cookie set");
});
app.get('/get-cookie',(req,res)=>{
    const data = req.cookies.username;
    if(data)
        res.send(data);
})
app.get('/clear-cookie', (req, res) => {
    res.clearCookie("username");
    res.send("Cookie cleared");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});