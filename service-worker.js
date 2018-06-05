// Dans var cacheName = 'RestaurantMass'; -> changer RestaurantMass par ce que l'on veut.
var cacheName = 'RestaurantMass';
// Ajouter tout les fichiers à mettre en cache dans var filesToCache
var filesToCache = [
  '/Restaurant_Bootstrap/',
  '/Restaurant_Bootstrap/index.html',
  '/Restaurant_Bootstrap/menu.html',
  '/Restaurant_Bootstrap/photos.html',
  '/Restaurant_Bootstrap/photos2.html',
  '/Restaurant_Bootstrap/photos3.html',
  '/Restaurant_Bootstrap/photos4.html',
  '/Restaurant_Bootstrap/restaurants.html',
  '/Restaurant_Bootstrap/app.js',
  '/Restaurant_Bootstrap/style.css',
  '/Restaurant_Bootstrap/icons-192.png',
  '/Restaurant_Bootstrap/icons-512.png',
  '/Restaurant_Bootstrap/icons-152.png',
  '/Restaurant_Bootstrap/img01.jpg',
  '/Restaurant_Bootstrap/img02.jpg',
  '/Restaurant_Bootstrap/img03.jpg',
  '/Restaurant_Bootstrap/img04.jpeg',
  '/Restaurant_Bootstrap/img05.jpeg',
  '/Restaurant_Bootstrap/img06.jpeg',
  '/Restaurant_Bootstrap/img07.jpeg',
  '/Restaurant_Bootstrap/img08.jpeg',
  '/Restaurant_Bootstrap/img09.jpeg',
  '/Restaurant_Bootstrap/img10.jpg',
  '/Restaurant_Bootstrap/img11.jpeg',
  '/Restaurant_Bootstrap/img12.jpg',
  '/Restaurant_Bootstrap/noun_947542_cc.svg',
  '/Restaurant_Bootstrap/photo-1486591978090-58e619d37fe7.jpg',
  '/Restaurant_Bootstrap/photo-1513185158878-8d8c2a2a3da3.jpeg',
  '/Restaurant_Bootstrap/photo-1515467705959-1142c6a92b19.jpeg',
  '/Restaurant_Bootstrap/photo-1525016891553-c148049a66b8.jpeg',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
