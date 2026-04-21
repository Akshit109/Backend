const http = require('http');

const server = http.createServer((req, res) => {

    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);

    if (req.method === "GET") {
        res.end("GET request received");
    } else if (req.method === "POST") {
        res.end("POST request received");
    } else {
        res.end("Other request");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
