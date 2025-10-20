"use client";

import { useEffect } from "react";
import { requestNotificationPermission } from "../lib/firebase";

export default function InitPWA() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope);
          requestNotificationPermission().then((token) => {
            if (token) console.log("FCM token:", token);
          });
        })
        .catch((err) => console.error("SW registration failed", err));
    }
  }, []);

  return null;
}
