/* Stopper – Service Worker v6 */
const CACHE = "stopper-v6";
const FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", e => {
  // Azonnal aktiválás – ne várjon régi tab-okra
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    // Minden régi cache törlése
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
     .then(() =>
      // Összes kliens újratöltése
      self.clients.matchAll({ type: "window" }).then(clients =>
        clients.forEach(c => c.postMessage({ type: "SW_UPDATED" }))
      )
    )
  );
});

self.addEventListener("fetch", e => {
  // Mindig network-first – így mindig a legfrissebb tartalom jön
  e.respondWith(
    fetch(e.request).then(r => {
      // Sikeres hálózati válasz – frissítjük a cache-t
      if (r.ok || r.type === "opaque") {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return r;
    }).catch(() =>
      // Offline fallback – cache-ből
      caches.match(e.request)
    )
  );
});
