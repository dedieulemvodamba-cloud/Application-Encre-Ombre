// ============================================
// SERVICE WORKER — Encre & Ombre
// Cache hors-ligne 24 heures
// ============================================

const CACHE_NAME = 'encre-ombre-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h en millisecondes

// Fichiers initiaux à mettre en cache
const FICHIERS_A_CACHER = [
  '/',
  '/index.html',
  '/manifest.json',
  '/guide-hors-ligne.html',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap'
];

// ── INSTALLATION : mise en cache des fichiers
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installation Encre & Ombre...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Mise en cache des fichiers hors-ligne...');
      return cache.addAll(FICHIERS_A_CACHER);
    }).then(() => {
      console.log('[ServiceWorker] Tous les fichiers sont en cache !');
      return self.skipWaiting();
    }).catch(err => {
      console.warn('[ServiceWorker] Avertissement installation:', err);
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATION : nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activation...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ── FETCH : stratégie Cache d'abord, réseau ensuite avec rafraîchissement 24h
self.addEventListener('fetch', event => {
  // Ignore les requêtes non-GET et les requêtes chrome-extension ou API POST
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Vérifier si le cache est encore valide (moins de 24h)
        const cachedDate = cachedResponse.headers.get('sw-cache-date');
        if (cachedDate) {
          const age = Date.now() - new Date(cachedDate).getTime();
          if (age < CACHE_DURATION) {
            return cachedResponse;
          }
        } else {
          // Pas de date = réponse valide
          return cachedResponse;
        }
      }

      // Sinon, aller chercher sur le réseau
      return fetch(event.request).then(networkResponse => {
        // Mettre en cache la nouvelle réponse si valide
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Si le réseau est indisponible, tenter de servir la page d'accueil en cache
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html').then(fallback => fallback || caches.match('/'));
        }
        return cachedResponse || new Response('Hors-ligne', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

// ── MESSAGE : forcer la mise à jour du cache
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
