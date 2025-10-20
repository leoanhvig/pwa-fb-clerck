"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold">Home Page</h1>

        <SignedOut>
          <div className="space-y-4">
            <p className="text-gray-600">Please sign in to continue</p>
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="space-y-4">
            <p className="text-gray-600">
              Welcome back, <span className="font-semibold">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>!
            </p>
            <SignOutButton>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Logout
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
