"use client";

import clsx from "clsx";
// Make sure the path to your Swiper CSS is correct
import "swiper/css";
import "swiper/css/effect-cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useZustandStore } from "@/hooks/useZustandStore";
import { tabs, tabComponents } from "@/constants/profileTabs";
import React, { useEffect, useState } from "react";

// Utility function to check if an object is empty
const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

const Profile = () => {
  const { currentTab, setCurrentTab } = useZustandStore();
  const [isClient, setIsClient] = useState(false);

  // Make sure this is the right tab to display as default

  useEffect(() => {
    setIsClient(true);
    // Check if currentTab is not set or is an empty object
    if (!currentTab || isEmptyObject(currentTab)) {
      setCurrentTab(tabs[0].name);
    }
  }, [setCurrentTab, currentTab]);

  const CurrentTabComponent = isClient && tabComponents[currentTab];

  return (
    <main className="relative w-full">
      <div className="mx-auto w-full px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            <aside className="py-6 lg:col-span-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setCurrentTab(tab.name)}
                    className={clsx(
                      currentTab === tab.name
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:text-gray-700",
                      "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                    )}
                  >
                    <FontAwesomeIcon
                      icon={tab.icon}
                      className={clsx(
                        currentTab === tab.name
                          ? "bg-primary text-white"
                          : "text-gray-400",
                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      )}
                    />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="lg:col-span-9 h-[90vh] my-auto">
              {isClient &&
                CurrentTabComponent &&
                React.createElement(CurrentTabComponent)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
