self.addEventListener( "install", function( event ){
    console.log( "WORKER: install event in progress." );
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('sync', function(event){
    console.log(event);
});

self.addEventListener('fetch', function(event){
    if(event.request.url.startsWith('https://api.twitch.tv/helix/schedule')){
        console.log(`Caching: ${event.request.url}`)
        event.respondWith(
            caches.open('twitch-dynamic').then(function(cache) {
                return cache.match(event.request) || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        )
        return
    }
    event.respondWith(fetch(event.request))
});