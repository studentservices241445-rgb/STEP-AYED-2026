/* =====================================================
   أكاديمية عايد STEP 2026 — Service Worker (PWA)
   ===================================================== */

const CACHE_NAME = 'ayed-step-v1.2';
const OFFLINE_URL = '/';

const CACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/course-detail.css',
  '/js/app.js',
  '/js/courses-data.js',
  '/js/course-detail.js',
  '/manifest.json',
  '/questions.json',
  '/images/logo.png',
  '/images/logo.svg',
  '/images/hero-students.jpg',
  '/images/step-banner.png',
  '/images/step-course-jan.png',
  '/images/step-guide.png',
  '/images/online-edu.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
];

/* ── INSTALL ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS.filter(url => !url.startsWith('https://fonts') && !url.startsWith('https://cdn')));
    }).then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH ── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Network-first for API / dynamic content
  if (url.pathname.includes('questions.json') || url.hostname !== self.location.hostname) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});

/* ── PUSH NOTIFICATIONS ── */
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'تحديث جديد من أكاديمية عايد STEP 2026!',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [200, 100, 200],
    dir: 'rtl',
    lang: 'ar',
    tag: 'ayed-notification',
    data: { url: data.url || '/' }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'أكاديمية عايد STEP 2026', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
