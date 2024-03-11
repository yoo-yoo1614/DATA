// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('your-app-cache-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/css/main.43335a5b.css',
          '/static/js/main.1573730f.js',
          '/offline.html', // Placeholder for offline page
          '/images/icon.png'
          // Add more URLs to cache here
        ]);
      })
    );
  });
  
  // Fetch event
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).catch(() => {
          return caches.match('/offline.html'); // Return offline page if request fails
        });
      })
    );
  });
  