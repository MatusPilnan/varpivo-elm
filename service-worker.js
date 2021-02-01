importScripts('assets/config.js')

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('varpivo').then(function (cache) {
      return cache.addAll([
        config.BASE_PATH + '/',
        config.BASE_PATH + '/manifest.json',
        config.BASE_PATH + '/elm.js',
        config.BASE_PATH + '/assets/icon.png',
        config.BASE_PATH + '/assets/styles/styles.css',
        config.BASE_PATH + '/assets/styles/theme.css'
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
