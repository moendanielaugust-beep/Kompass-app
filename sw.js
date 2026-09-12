const CACHE_NAME = 'kompass-v2';
self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache){
    return cache.addAll(['./index.html','./manifest.json','./icon-192.png','./icon-512.png']);
  }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE_NAME;}).map(function(k){return caches.delete(k);}));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function(e){
  e.respondWith(
    fetch(e.request).catch(function(){ return caches.match(e.request); })
  );
});
