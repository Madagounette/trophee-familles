/* Trophée Pernin — cache minimal : l'appli s'ouvre même sans réseau.
   Les données, elles, sont gérées par Firebase (cache hors ligne inclus). */
const CACHE = "trophee-multi-v5";
const SHELL = [
  "./", "./index.html", "./config.js", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./icons/icon.svg",
  "./icons/madag.png", "./icons/madag-sombre.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Tout ce qui est externe — le SDK Firebase, les polices, les serveurs Google —
  // passe directement au réseau. Sans cette règle, une coupure ferait répondre
  // la page d'accueil à la place d'un script, et l'application ne démarrerait plus.
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => {
        if (hit) return hit;
        // Le repli sur la page d'accueil ne vaut que pour une navigation,
        // jamais pour un script ou une image.
        if (req.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      }))
  );
});
