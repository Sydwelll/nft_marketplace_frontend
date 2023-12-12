"use client";

import { KYBForm } from "@/components/Forms/RegistrationForm";
import StarField from "@/components/StarField";
import { useEffect, useId, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const id = useId();

  useEffect(() => {
    // Set isClient to true once the component mounts to trigger re-render
    setIsClient(true);
  }, []);

  return (
    <div className="relative lg:fixed lg:inset-0 lg:z-40">
      {/* The Glow and StarField components are only rendered on the client-side */}
      {isClient && (
        <>
          <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950">
            <svg
              className="absolute top-0 left-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id={`${id}-gradient`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
                  <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
                  <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${id}-gradient)`} />
            </svg>
          </div>
          <StarField className="absolute -right-44 top-14" />
        </>
      )}
      <div className="flex h-screen w-screen items-center justify-center">
        {isClient ? (
          // KYBForm is also only rendered on the client-side
          <div className="w-full max-w-2xl py-8 px-4">{children}</div>
        ) : (
          // You could show a loader or a placeholder here until the client-side script takes over
          <div>Loading...</div>
        )}
      </div>
    </div>
    // <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
    //   <Glow />
    //   <div className="relative flex w-full lg:pointer-events-auto lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
    //     <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
    //       <div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
    //         <div className="relative">
    //           <StarField className="-right-44 top-14" />
    //           {/* <KYBForm /> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="relative lg:fixed lg:inset-0 lg:z-40">
    // <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950">
    //   <svg className="absolute top-0 left-0 h-full w-full" aria-hidden="true">
    //     <defs>
    //       <radialGradient id={`${id}-gradient`} cx="50%" cy="50%" r="50%">
    //         <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
    //         <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
    //         <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
    //       </radialGradient>
    //     </defs>
    //     <rect width="100%" height="100%" fill={`url(#${id}-gradient)`} />
    //   </svg>
    // </div>
    //   <StarField className="absolute -right-44 top-14" />
    //   <div className="relative w-[80vw] h-screen mx-auto">
    //     <KYBForm />
    //   </div>
    // </div>

    // <div className="flex h-screen w-screen items-center justify-center bg-dark-background">
    //   {/* Adjust the background color as needed */}
    //   <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
    //     {/* This will center and limit the width of the form */}
    //     <Glow />
    //     <StarField className="-right-44 top-14" />
    //     <KYBForm />
    //   </div>
    // </div>
  );
}
