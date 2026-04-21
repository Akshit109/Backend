const url = require("url");
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const date = new Date().toLocaleString(); 
    const parsedUrl = url.parse(req.url, true);

    fs.appendFile("uLog.txt",`${date}: ${parsedUrl.pathname}\n`,
        (err) => {
            if (err) console.log("Log write error:", err);
        }
    );
    switch(parsedUrl.pathname){
        case '/':
            res.end("Welcome");
            
            break;
        case '/about':
    }

}).listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});

// const address = "http://localhost:8000";
// const myURL = url.parse(address, true);
// console.log(myURL);