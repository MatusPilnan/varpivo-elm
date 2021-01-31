self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('varpivo').then(function (cache) {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/elm.js',
        '/assets/images/icon.png',
        '/assets/css/app.css',
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
