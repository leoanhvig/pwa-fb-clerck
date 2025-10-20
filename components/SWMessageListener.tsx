"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { listenToForegroundMessages } from "../lib/firebase";

export default function SWMessageListener() {
  const router = useRouter();

  useEffect(() => {
    // ---- (A) Listen messages from Service Worker ----
    const handleSWMessage = (event: MessageEvent) => {
      const msg = event.data;
      if (msg?.type === "NAVIGATE_TO" && msg.url) {
        console.log("Navigate from SW:", msg.url);
        router.push(msg.url);
      }
    };
    navigator.serviceWorker.addEventListener("message", handleSWMessage);

    // ---- (B) Listen foreground FCM messages ----
    listenToForegroundMessages((payload: any) => {
      const url = payload?.data?.url;
      if (url) {
        // You can choose to auto-redirect or show a toast first
        router.push(url);
      }
    });

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleSWMessage);
    };
  }, [router]);

  return null;
}
