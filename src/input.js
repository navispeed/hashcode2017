/**
 * Created by greg on 23/02/2017.
 */

function Request(requests, input, latency) {
    this.nbRequest = requests.nbRequest;
    this.videoId = requests.videoId;
    this.videoSize = input.videos[requests.videoId];
    this.weight = this.nbRequest * this.videoSize * latency;
    this.latency =
    this.recalculateWeight = function (latency){
        this.weight = this.nbRequest * this.videoSize * latency;
    }

}

var mainServer = {};

function Video(size) {
    this.size = size;
    this.server = [];
    // console.log(this);

    this.server.push(mainServer);

    this.addCache = function (cache) {
        this.server.push(cache);
        cache.videos.push(this);
    }

}

function EndPoints(id, latency) {
    this.id = id;
    this.latency = latency;
    this.cache = {};
    this.requests = [];
    this.Requests = [];
    this.updateAllRequests = function () {
        Requests = [];
        for (var request in requests) {
            Requests.push(new Request(requests[request], input, latency));
        }
    };
    this.getAllRequest = function() {
        var Requests = [];

    }
}

function Cache(maxSize) {
    this.capacity = maxSize;
    this.used = 0;
    this.videos = [];
    this.latency = {};
}

function Input(file) {
    this.videos = [];
    this.ep = [];
    this.caches = {}; //{endpoints}

    var nbEndpoints = file[0].split(" ")[1];
    // console.log("nb endpoints :" + nbEndpoints)
    var cacheSize = file[0].split(" ")[4];
    var videoLine = file[1].split(" ");
    for (var elem in videoLine) {
        this.videos.push(new Video(videoLine[elem]));
    }

    var line = 2;
    for (var currentEndPoints = 0; currentEndPoints < nbEndpoints; ++currentEndPoints) {
        var file2 = file[line].split(" ");
        var nbCaches = file2[1];
        var endpoint = new EndPoints(this.ep.length, file2[0]);
        ++line;
        while (nbCaches > 0) {
            // console.log("line:", file[line]);
            var split = file[line].split(" ");
            if (endpoint.cache[split[0]] == undefined) {
                var cache = new Cache(cacheSize);
                endpoint.cache[split[0]] = cache;
                this.caches.push(cache);
            }
            endpoint.cache[split[0]].latency[this.ep.length] = split[1];
            // if (this.caches[split[0]] == undefined)
            //     this.caches[split[0]] = new Cache(cacheSize);
            // this.caches[split[0]].endpoints.push({endpoints: endpoint, lat: split[1]});
            // console.log(endpoint.cache[split[0]]);
            ++line;
            nbCaches--;
        }
        this.ep.push(endpoint);
    }

    while (line < file.length - 1) {
        var splitted = file[line].split(" ");

        // console.log("toto:", this.ep[splitted[1]].requests);

        this.ep[splitted[1]].requests.push({nbRequest: splitted[2], videoId: splitted[0]});
        ++line
    }
}

