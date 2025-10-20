import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Metadata } from "next";
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
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
          <SWMessageListener />
          <InitPWA />
        </body>
      </html>
    </ClerkProvider>
  );
}
