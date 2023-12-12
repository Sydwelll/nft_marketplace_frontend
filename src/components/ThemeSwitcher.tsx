import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

const ThemeSwitcherButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                  ${
                    resolvedTheme === "light"
                      ? "bg-blue-900 text-yellow-400"
                      : "bg-white text-yellow-600"
                  }`}
    >
      <FontAwesomeIcon
        icon={resolvedTheme === "light" ? faMoon : faSun}
        className="h-6 w-6"
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeSwitcherButton;
