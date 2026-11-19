const fs = require("fs");

// CREATE
fs.writeFileSync("student.txt", "Hello Student!");
console.log("File created successfully");

// READ
let data = fs.readFileSync("student.txt", "utf8");
console.log("File Content:", data);

// UPDATE
fs.appendFileSync("student.txt", "\nWelcome to Node.js!");
console.log("File updated successfully");

// READ UPDATED CONTENT
data = fs.readFileSync("student.txt", "utf8");
console.log("Updated Content:", data);

// DELETE
fs.unlinkSync("student.txt");
console.log("File deleted successfully");