"use client";
import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
