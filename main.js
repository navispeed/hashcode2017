var fs = require('fs');

//How to include file in nodejs =>
// eval(fs.readFileSync("src/proto.js") + '');
eval(fs.readFileSync("src/input.js") + '');
var file = fs.readFileSync(process.argv[2]) + '';


// console.log(file.split("\n"));


var input = new Input(file.split("\n"));