"use client";

import { ReactNode, useEffect } from "react";
import Navigation from "./Navigation";
import { NAVIGATION_ITEMS } from "@/utils/constants";
import { addBrowserClasses, loadPolyfills } from "@/utils/browserSupport";
import { useResponsive } from "@/hooks/useResponsive";
import BrowserCompatWarning from "@/components/responsive/BrowserCompatWarning";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const { windowSize, isMobile } = useResponsive();

  useEffect(() => {
    // Add browser detection classes
    addBrowserClasses();

    // Load necessary polyfills
    loadPolyfills();

    // Add viewport height fix for mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);
  }, []);

  const navigationSections = NAVIGATION_ITEMS.map((item) => ({
    id: item.id,
    label: item.name,
    href: item.href,
  }));

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ minHeight: isMobile ? "calc(var(--vh, 1vh) * 100)" : "100vh" }}
    >
      <Navigation sections={navigationSections} />
      <main className="flex-grow">{children}</main>
      <footer className="py-4 md:py-6 px-4 border-t border-gray-100 dark:border-gray-800">
        <div className="container-width text-center">
          <p
            className={`${isMobile ? "text-xs" : "text-sm"} text-gray-500 dark:text-gray-400`}
          >
            © {new Date().getFullYear()} Vanraj Narula. All rights reserved.
          </p>
          <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
            Optimized for all devices and browsers
          </p>
        </div>
      </footer>

      {/* Browser compatibility warning */}
      <BrowserCompatWarning />
    </div>
  );
}
