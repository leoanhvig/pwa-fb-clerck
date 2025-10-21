/* eslint-disable no-undef */

// Firebase SW file
importScripts(
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDfSbjgqWzBeO3SXVNA1nDE1DKpyc6_Fmo",
  authDomain: "fir-pwa-o.firebaseapp.com",
  projectId: "fir-pwa-o",
  storageBucket: "fir-pwa-o.firebasestorage.app",
  messagingSenderId: "1058618315097",
  appId: "1:1058618315097:web:ff748331637d024b4abc48",
  measurementId: "G-V6193PPNED",
};

const messaging = firebase.messaging();

// When app is in background or closed
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || "Notification";
  const options = {
    body: data.body || "",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    data: { url: data.url || "/" },
  };

  self.registration.showNotification(title, options);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // If app already open → focus and navigate
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin)) {
            client.focus();
            client.postMessage({ type: "NAVIGATE_TO", url: targetUrl });
            return;
          }
        }
        // If not open → open new window
        return clients.openWindow(targetUrl);
      })
  );
});

// Custom push (optional if you send non-FCM push)
self.addEventListener("push", async (event) => {
  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = {};
  }

  const allClients = await clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  const visibleClient = allClients.find(
    (c) => c.visibilityState === "visible" || c.focused
  );

  if (visibleClient) {
    visibleClient.postMessage({ type: "NAVIGATE_TO", url: data.url || "/" });
    return;
  }

  const title = data.title || "Notification";
  const options = {
    body: data.body || "",
    icon: "/icons/icon-192x192.png",
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Cache management for PWA
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Clean up old caches if needed
          if (
            cacheName.includes(
              "/index.html?__WB_REVISION__=56417e6a3e96d6ce500997132211260b"
            )
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
