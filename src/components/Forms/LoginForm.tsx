"use client";

import { useZustandStore } from "@/hooks/useZustandStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "../Loading";

export const LoginForm = () => {
  const login = useZustandStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true); // Start loading

    const success = await login(email, password);
    if (success) {
      // Redirect to the marketplace on successful login
      router.push("/marketplace");
    } else {
      // Stop loading and show error message
      setError("Invalid credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-12">
        <div className="max-w-md mx-auto">
          <Image
            className="mx-auto h-22 w-auto" // Removed duplicate w-22 class
            src="/images/logo1_.png"
            alt="Green Market"
            width={120}
            height={120}
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div className="mt-4">
              <button
                className="w-full flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-primary hover:border-2 hover:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    Signing in....
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
