// Great tutorial about SW and caching: https://www.youtube.com/watch?v=ksXwaWHCW6k&t=1228s

const cacheName = "v2";

self.addEventListener("install", function (e) {
    console.log("Service Worker: Installed")
})

self.addEventListener("activate", function (e) {
    console.log("Service Worker: Activated")
    //Remove old caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("Service Worker: Clearing old Cache")
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//Call fetch event
self.addEventListener("fetch", function (e) {
    console.log("Service Worker: Fetching")
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //Make clone of response
            const resClone = res.clone()
            //open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //Add response to cache
                    cache.put(e.request, resClone)
                })
            return res
        }).catch(err => caches.match(e.request)
            .then(res => res))
    )
})