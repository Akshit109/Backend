const fs = require('fs');
fs.writeFileSync('student.txt', 'Name: Akshit\n');
fs.appendFileSync('student.txt', 'Course: B.Tech\n');
const data = fs.readFileSync('student.txt', 'utf8');
console.log("File Data:\n", data);