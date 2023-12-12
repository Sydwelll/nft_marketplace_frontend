"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";

// Providers
import { Providers } from "@/providers/Theme";

// Wagmi & RainbowKit
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  // Theme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// Styles
import "@/styles/tailwind.css";
// import { Providers } from "@/providers/Theme";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const monaSans = localFont({
  src: "../fonts/Mona-Sans.var.woff2",
  display: "swap",
  variable: "--font-mona-sans",
  weight: "200 900",
});

// export const metadata: Metadata = {
//   title: "Commit - Open-source Git client for macOS minimalists",
//   description:
//     "Commit is a lightweight Git client you can open from anywhere any time you’re ready to commit your work with a single keyboard shortcut. It’s fast, beautiful, and completely unnecessary.",
//   // alternates: {
//   //   types: {
//   //     "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
//   //   },
//   // },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Configure chains with wagmi
  const { chains, publicClient } = configureChains(
    [hardhat, sepolia],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "GreenMarket Place",
    projectId: "0b549794414adcd53fe71bccc6c39e54",
    chains,
  });

  // Create a wagmi client
  const config = createConfig({
    autoConnect: true,
    publicClient,
    connectors,
  });

  return (
    <html
      lang="en"
      className={clsx("h-full antialiased", inter.variable, monaSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-black">
        <WagmiConfig config={config}>
          <RainbowKitProvider
            chains={chains}
            // avatar={CustomAvatar}
            // theme={myCustomRainbowTheme as Theme}
            // theme={darkTheme({
            //   accentColor: "#26a5a1",
            //   accentColorForeground: "white",
            //   borderRadius: "small",
            //   fontStack: "system",
            //   overlayBlur: "small",
            // })}
          >
            <Providers>{children}</Providers>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
