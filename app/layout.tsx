import {
  ClerkProvider
} from "@clerk/nextjs";
import { Metadata, Viewport } from "next";
import InitPWA from "../components/InitPWA";
import SWMessageListener from "../components/SWMessageListener";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo My App",
  description: "Demo PWA Application with Add to Home Screen",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Demo My App",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
          <SWMessageListener />
          <InitPWA />
        </body>
      </html>
    </ClerkProvider>
  );
}
