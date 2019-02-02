if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  var cacheName = 'BIRD_CACHE'
  var toCache = [
      '/',
      '/components'
  ]
  self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(cacheName)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(toCache);
        })
    );
  });
  