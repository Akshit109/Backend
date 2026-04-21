const http = require("http");

http.createServer((req, res) => {
    
    res.write("Server test 4000");
    res.end();

}).listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
