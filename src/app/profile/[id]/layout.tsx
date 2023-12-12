"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let pathname = usePathname();
  // let isHomePage = pathname === "/marketplace";

  return (
    <div className="flex w-full flex-col">
      <Header />

      <Hero />
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        {children}
      </div>
    </div>
  );
}
