/** @type {import('next').NextConfig} */
const path = require("path");
const fs = require("fs");

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const env = {
        "process.env.NEXT_PUBLIC_FIREBASE_API_KEY":
          process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        "process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN":
          process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
        "process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID":
          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        "process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET":
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        "process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID":
          process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        "process.env.NEXT_PUBLIC_FIREBASE_APP_ID":
          process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        "process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID":
          process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      };

      const swPath = path.resolve(__dirname, "public/firebase-messaging-sw.js");
      let swContent = fs.readFileSync(swPath, "utf-8");

      Object.keys(env).forEach((key) => {
        swContent = swContent.replace(new RegExp(key, "g"), env[key]);
      });

      fs.writeFileSync(swPath, swContent, "utf-8");
    }

    return config;
  },
  runtime: "edge",
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
