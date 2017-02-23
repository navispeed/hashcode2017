function fillCacheServer(server, requests)
{
    for (var request in requests)
    {
        if (server.capacity - server.used >= request.video.size)
        {
            server.videos.push(request.video);
            request.video.servers.push(server);
            server.used += request.video.size;
        }
    }
}