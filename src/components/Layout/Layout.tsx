import { ThemeToggle } from "../ThemeToggle";
import { Intro, IntroFooter } from "./Intro";
import Timeline from "./Timeline";
import FixedSidebar from "./FixedSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/pro-duotone-svg-icons";
import ThemeSwitcherButton from "../ThemeSwitcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FixedSidebar main={<Intro />} footer={<IntroFooter />} />
      <ThemeToggle />
      <div className="relative flex-auto">
        <Timeline />
        <main className="space-y-20 py-20 sm:space-y-32 sm:py-32">
          {children}
        </main>
      </div>
    </>
  );
}
