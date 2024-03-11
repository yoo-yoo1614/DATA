import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { register } from 'workbox-window';


// Precache and route all assets specified in the webpack-manifest.json file
// This will cache your HTML, CSS, JavaScript, and other assets so they can be served when offline
precacheAndRoute(self.__WB_MANIFEST);

// Cache Google Fonts
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' ||
             url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts',
  })
);

// Cache API requests
registerRoute(
  ({url}) => url.origin === 'https://api.example.com',
  new StaleWhileRevalidate({
    cacheName: 'api-data',
  })
);

// Add other custom caching strategies and routes as needed
