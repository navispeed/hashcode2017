var fs = require('fs');

function WriteFile(inputs) {
    var data = howManyDoWeUse(inputs) + "\n";

    var caches = inputs.caches;
    for (var i = 0; i < caches.length; ++i) {
        var line = caches[i].id + " ";
        if (caches[i].used == 0) {
            continue;
        }
        for (var j = 0; j < caches[i].videos.length; ++j) {
            line += " " + caches[i].videos[j].id
        }
        line += "\n";
        data += line;
    }

    fs.writeFile("./res", data);
}

//How to include file in nodejs =>
// eval(fs.readFileSync("src/proto.js") + '');
eval(fs.readFileSync("src/input.js") + '');
var file = fs.readFileSync(process.argv[2]) + '';


// console.log(file.split("\n"));

var input = new Input(file.split("\n"));