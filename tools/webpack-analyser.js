const fs = require("fs");
const zlib = require("zlib");

const fileContents = fs.createReadStream(process.argv[2]);
const writeStream = fs.createWriteStream("./file1.json");
const unzip = zlib.createGunzip();

fileContents.pipe(unzip).pipe(writeStream);
