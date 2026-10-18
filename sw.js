'use strict';
/* Typeflow service worker - cache-first: after the first full load everything works offline. */
var CACHE='typeflow-v1';
var ASSETS=['./','./index.html','./word-counter.html','./blog/improve-typing-speed.html','./blog/touch-typing-basics.html','./blog/typing-test-for-jobs-india.html','./assets/style.css','./assets/app.js','./assets/icon-192.png','./assets/icon-512.png','./manifest.json'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));
});

self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});

self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'){return;}
  e.respondWith(
    caches.match(e.request,{ignoreSearch:true}).then(function(hit){
      if(hit){return hit;}
      return fetch(e.request).then(function(res){
        if(res.ok){
          var copy=res.clone();
          caches.open(CACHE).then(function(c){c.put(e.request,copy);});
        }
        return res;
      });
    })
  );
});
