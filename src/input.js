/**
 * Created by greg on 23/02/2017.
 */


function Video(size) {
    this.size = size;
    // console.log(this);
}

function EndPoints(latency) {
    this.latency = latency;
    this.cache = {};
    this.requests = [];
}

function Input(file) {
    this.videos = [];
    this.ep = [];
    // this.caches = [];

    var nbEndpoints = file[0].split(" ")[1];
    // console.log("nb endpoints :" + nbEndpoints)
    var videoLine = file[1].split(" ");
    for (var elem in videoLine) {
        this.videos.push(new Video(videoLine[elem]));
    }

    var line = 2;
    for (var currentEndPoints = 0; currentEndPoints < nbEndpoints; ++currentEndPoints) {
        var file2 = file[line].split(" ");
        var nbCaches = file2[1];
        var endpoint = new EndPoints(file2[0]);
        ++line;
        while (nbCaches > 0) {
            // console.log("line:", file[line]);
            var split = file[line].split(" ");
            endpoint.cache[split[0]] = {lat: split[1]};
            // console.log(endpoint.cache[split[0]]);
            ++line;
            nbCaches--;
        }
        this.ep.push(endpoint);
    }

    console.log("RD");
    while (line < file.length - 1) {
        console.log(file[line]);
        var splitted = file[line].split(" ");

        // console.log("toto:", this.ep[splitted[1]].requests);
        console.log("this.ep[" + splitted[1] + "]", this.ep[splitted[1]].requests);


        this.ep[splitted[1]].requests.push({nbRequest: splitted[2], videoId: splitted[0]});
        console.log("endpoints " + splitted[1], this.ep[splitted[1]].requests);
        ++line
    }


}