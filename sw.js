/* Service worker MaxHabitTracker: dzięki niemu aplikacja działa offline.
   Przy zmianie plików strony podbij numer wersji poniżej. */
const CACHE = 'maxhabittracker-v2';
const LOCAL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(LOCAL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Tylko te zewnętrzne adresy trafiają do pamięci podręcznej (skrypty i czcionki). Zapytania do bazy danych (Supabase) nigdy. */
const CACHEABLE_HOSTS = ['cdn.tailwindcss.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin && !CACHEABLE_HOSTS.includes(url.hostname)) return;

  // Strona główna: najpierw sieć (świeża wersja), a bez internetu kopia z pamięci.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Reszta (style, ikony, czcionki, skrypty z CDN): kopia z pamięci od razu, odświeżana w tle.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
