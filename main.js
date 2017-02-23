var fs = require('fs');

function WriteFile(inputs, output) {
    var data = howManyDoWeUse(inputs) + "\n";

    var caches = inputs.caches;
    for (var elem in caches) {
        var line = caches[elem].id;
        if (caches[elem].used == 0) {
            continue;
        }
        for (var j = 0; j < caches[elem].videos.length; ++j) {
            line += " " + caches[elem].videos[j].id
        }
        line += "\n";
        data += line;
    }
    for (var i = 0; i < caches.length; ++i) {

    }
    fs.writeFile(output.split("/")[1], data);
}

//How to include file in nodejs =>
// eval(fs.readFileSync("src/proto.js") + '');
eval(fs.readFileSync("src/input.js") + '');

if (process.argv.length < 2) {
    return;
}
var file = fs.readFileSync(process.argv[2]) + '';


// console.log(file.split("\n"));

var input = new Input(file.split("\n"));

for (var i = 0; i < input.ep.length; ++i) {
    input.ep[i].createAllRequests();
    input.ep[i].updateAllRequests();
    console.log("Boucle 1")
}

for (var elem in input.caches) {
    input.caches[elem].fill(getRequestofCache(input.caches[elem]));
    console.log("Boucle 2")
}

WriteFile(input, process.argv[2] + ".res");