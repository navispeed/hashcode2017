/**
 * Created by greg on 23/02/2017.
 */

function getRequestofCache(cache) {
    //Get all endpoints

    var tab = [];

    for (var i = 0; i < cache.endPoints.length; ++i) {
        var tmp = cache.endPoints[i].getAllRequest();

<<<<<<< HEAD
    var sorted = tab.sort(function(a, b) {
            if (a.weight < b.weight)
                return -1;
            if (a.weight > b.weight)
                return 1;
            return 0;
        });

    return sorted;
=======
        for (var j = 0; j < tmp.length; ++j) {
            tab.push(tmp[j]);
        }
    }
    return tab;
>>>>>>> 95759506e503a71bf77ba0658b35554d1e5d5f54
}

function Request(requests, latency) {
    this.nbRequest = requests.nbRequest;
    this.videoId = requests.videoId;
    this.videoSize = input.videos[requests.videoId].size;
    this.weight = parseInt(this.nbRequest) * parseInt(this.videoSize) * parseInt(latency);
    this.latency = latency;
    this.recalculateWeight = function (_latency){
        this.weight = parseInt(this.nbRequest) * parseInt(this.videoSize) * parseInt(_latency);
    };
    this.calculateLatency = function (servers, endpoint) {
        this.latency = endpoint.latency;
        for (var _server in servers)
        {
            var server = servers[_server];
            for (var _video in server.videos)
            {
                var video = server.videos[_video];
                if (this.videoId == video.videoId)
                {
                    if (server.latency[endpoint.id] < this.latency)
                    {
                        this.latency = server.latency[endpoint.id];
                    }
                    break;
                }
            }
        }
        this.recalculateWeight(this.latency);
    }
}

var mainServer = {};

function Video(id, size) {
    this.id = id;
    this.size = size;
    this.server = [];
    this.server.push(mainServer);

    this.addCache = function (cache) {
        this.server.push(cache);
        cache.videos.push(this);
        cache.used += this.size;
    }
}

function EndPoints(id, latency) {
    this.id = id;
    this.latency = latency; //latency with main
    this.cache = {};
    this.requests = [];
    this.Requests = [];
    this.createAllRequests = function() {
        this.Requests = [];
        for (var request in this.requests) {
            this.Requests.push(new Request(this.requests[request], latency));
        }
    };
    this.updateAllRequests = function () {
        for (var request in this.Requests) {
            this.Requests[request].calculateLatency(this.cache, this);
        }
    };
    this.getAllRequest = function() {
        // console.log(this.Requests);
        return this.Requests.sort(function(a, b) {
            if (a.weight < b.weight)
                return -1;
            if (a.weight > b.weight)
                return 1;
            return 0;
        });
    }
}

function Cache(id, maxSize) {
    this.id = id;
    this.capacity = maxSize;
    this.used = 0;
    this.videos = [];
    this.latency = {};
    this.endPoints = [];

    this.addRequest = function (request)
    {
        if (this.capacity - this.used >= request.video.size)
        {
            this.videos.push(request.video);
            request.video.servers.push(this);
            this.used += request.video.size;
            return (true);
        }
        return (false);
    }

/*
    this.clearRequests = function ()
    {
        for (var request in this.requests)
        {
            for (var i = 0; i < request.video.servers.length; i++)
            {
                if (request.video.servers[i].id == this.id)
                {
                    request.video.servers.splice(i, 1);
                    break;
                }
        for (var _request in requests)
        {
            var request = requests[_request];
            if (this.capacity - this.used >= input.videos[request.videoId].size)
            {
                this.videos.push(input.videos[request.videoId]);
                input.videos[request.videoId].server.push(this);
                this.used += input.videos[request.videoId].size;
            }
        }
        this.videos = []
    }
*/

    this.fill = function (requests)
    {
        for (var request in requests)
        {
            this.addRequest(request);
        }
    }

/*
    this.allCombinationsOf = function (start, number, combination, combinations)
    {
        if (number == 0)
        {
            combinations.push(combination);
            return;
        }
        for (var i = 0; i < requests.length; i++)
        {
            this.allCombinationsOf(start + 1, i, combination.slice(0), combinations);
        }
    }
    this.getAllCombinations = function ()
    {
        combinations = []
        for (var i = 0; i < requests.length; i++)
        {
            this.allCombinationsOf(0, i, [], combinations);
        }
    }
*/
}

function howManyDoWeUse(input) {
    var used = 0;
    for (var cache in input.caches) {
        if (input.caches[cache].used > 0) {
            used++;
        }
    }
    return used;
}

function Input(file) {
    mainServer = new Cache(-1, -1);
    this.videos = [];
    this.ep = [];
    this.caches = {}; //{endpoints}

    var nbEndpoints = file[0].split(" ")[1];
    // console.log("nb endpoints :" + nbEndpoints)
    var cacheSize = file[0].split(" ")[4];
    var videoLine = file[1].split(" ");
    for (var elem in videoLine) {
        this.videos.push(new Video(this.videos.length, videoLine[elem]));
    }
    mainServer.videos = this.videos;

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
                var cache = new Cache(Object.keys(this.caches).length, cacheSize);
                cache.endPoints.push(endpoint);
                endpoint.cache[split[0]] = cache;
                this.caches[split[0]] = cache;
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
