import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Custom components
import { WalletConnectionButton } from "@/components/Wallet/WalletConnectionButton";
import LogoWithText from "@/components/Logo";
import ThemeSwitcherButton from "@/components/ThemeSwitcher";
import { ProfileButton } from "@/components/ShoppingCartButton";

export const Header = () => {
  let [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Hook to get router object

  // Function to determine if the path is /marketplace/* or /profile/*
  const isMarketplaceOrProfile =
    pathname.startsWith("/marketplace") || pathname.startsWith("/profile");

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between px-4 py-5 transition duration-500 sm:px-6 lg:px-8",
        isScrolled
          ? "backdrop-blur bg-opacity-75" // Adjust these classes for scrolled state
          : "bg-opacity-50", // Adjust opacity to your preference
        isScrolled ? "" : "dark:bg-transparent"
      )}
    >
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <LogoWithText width={80} height={80} />
        </Link>
      </div>
      {/* Conditionally render this div based on the path */}
      {isMarketplaceOrProfile && (
        <div className="relative flex basis-0 justify-end gap-2 sm:gap-2 md:flex-grow">
          <WalletConnectionButton />
          <ThemeSwitcherButton />
          <ProfileButton />
        </div>
      )}
    </header>
  );
};
