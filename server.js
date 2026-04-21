const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    const date = new Date().toLocaleString(); 

    fs.appendFile(
        "Log.txt",
        `${date} : New Request Received\n`,
        (err) => {
            if (err) console.log("Log write error:", err);
        }
    );

    res.write("Server Created!!");
    res.end();

}).listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
