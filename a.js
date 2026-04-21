const fs = require("fs");
const fd =fs.openSync("a.txt","w+");
// fs.writeSync(fd , "Hii I Am Akki. \n I Am 2nd Year Student.");
// fs.closeSync(fd);
// const buffere = buffer.alloc(50);

// const data = fs.readSync(fd.buffer);
// console.log(data);


// fs.writeFileSync("b.txt","hello");
// console.log(fs.readFileSync("b.txt","utf-8"));

// fs.renameSync("b.txt", "k.txt");
// fs.cpSync("k.txt", "b.txt");
// fs.appendFileSync("b.txt", " \ni am a student");
// fs.unlinkSync("k.txt");

// fs.writeFile("e.txt","hello world!", (err) => {
//     if(err) console.log(err);})
//     console.log("done");

// fs.readFile("e.txt","utf8", (err,data) => {
//     if(err) console.log(err);
//     else console.log(data);
// });


const data = fs.readFileSync("e.txt", "utf-8");

for (let i = 0; i < data.length; i++) {
  console.log(data[i]);
}

const lines = data.split("\n");

lines.forEach(line => console.log(line));