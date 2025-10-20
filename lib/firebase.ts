import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

// Request permission + get FCM token
export const requestNotificationPermission = async () => {
  if (!messaging) return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });
    return currentToken;
  } catch (err) {
    console.error("FCM token error", err);
    return null;
  }
};

// Listen to messages in foreground
export const listenToForegroundMessages = (callback: any) => {
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.log("FCM foreground message:", payload);
    callback?.(payload);
  });
};
