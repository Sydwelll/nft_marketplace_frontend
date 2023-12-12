"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import IconLink from "@/components/IconLink";
import LogoWithText from "@/components/Logo";
import { Fragment } from "react";

function TwitterIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M5.526 13.502c5.032 0 7.784-4.168 7.784-7.783 0-.119 0-.237-.008-.353a5.566 5.566 0 0 0 1.364-1.418 5.46 5.46 0 0 1-1.571.431c.571-.342.998-.88 1.203-1.513a5.483 5.483 0 0 1-1.737.664 2.738 2.738 0 0 0-4.662 2.495 7.767 7.767 0 0 1-5.638-2.858 2.737 2.737 0 0 0 .847 3.651 2.715 2.715 0 0 1-1.242-.341v.035a2.737 2.737 0 0 0 2.195 2.681 2.73 2.73 0 0 1-1.235.047 2.739 2.739 0 0 0 2.556 1.9 5.49 5.49 0 0 1-4.049 1.133A7.744 7.744 0 0 0 5.526 13.5" />
    </svg>
  );
}

export function Intro() {
  const router = useRouter();

  return (
    <Fragment>
      <Link href="/">
        <LogoWithText width={120} height={120} />
      </Link>
      <p className="mt-4 text-sm/6 text-gray-300">
        {`GreenMarket is transforming the environmental impact landscape by
        enabling companies to trade a wider range of emission credits, including
        CO2, methane, and more. Our platform brings together 'green' companies,
        which absorb significant amounts of greenhouse gases, with businesses
        that aim to offset their emissions.`}
      </p>
      <>
        <button
          // disabled={!isFrance}
          className={`mt-8 mb-4 px-4 py-2 font-semibold w-full text-white transition-colors duration-300 ${
            // isFrance ?
            "bg-primary rounded-lg hover:bg-white hover:text-primary"
            // : "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={() => router.push("/auth/registration")}
        >
          Require registration
        </button>
        <a href="/auth/login" className="text-white m-1 underline">
          Already registered ? Sign In
        </a>
      </>
    </Fragment>
  );
}

export function IntroFooter() {
  return (
    <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
      Brought to you by{" "}
      <IconLink href="#" icon={TwitterIcon} compact large>
        Sydwell
      </IconLink>
    </p>
  );
}
