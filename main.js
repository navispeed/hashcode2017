var fs = require('fs');

//How to include file in nodejs =>
eval(fs.readFileSync("src/proto.js") + '');
toto();


console.log("Hello World");