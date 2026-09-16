const path = require("path");

const filePath = "/home/user/data/report.pdf";

console.log("Directory Name:");
console.log(path.dirname(filePath));

console.log("\nBase Name:");
console.log(path.basename(filePath));

console.log("\nExtension:");
console.log(path.extname(filePath));

const relativePath = "./data/report.pdf";

console.log("\nAbsolute Path:");
console.log(path.resolve(relativePath));