const os = require('os');
const path = require('path');
const url = require('url');

console.log("OS Type:", os.type());
console.log("Free Memory:", os.freemem());

console.log("File Name:", path.basename(__filename));

const myUrl = new URL("http://localhost:3000/home?name=Akshit");
console.log("Host:", myUrl.host);
console.log("Query Param name:", myUrl.searchParams.get("name"));
