"use client";

import { ReactNode, useEffect } from "react";
import Navigation from "./Navigation";
import { NAVIGATION_ITEMS } from "@/utils/constants";
import { addBrowserClasses, loadPolyfills } from "@/utils/browserSupport";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  useEffect(() => {
    addBrowserClasses();
    loadPolyfills();

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh, { passive: true });
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const navigationSections = NAVIGATION_ITEMS.map((item) => ({
    id: item.id,
    label: item.name,
    href: item.href,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#080810]">
      <Navigation sections={navigationSections} />
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="container-width text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Vanraj Narula. All rights reserved.
          </p>
          <p className="text-xs mt-1.5 text-slate-600">
            Built with Next.js · Designed for performance
          </p>
        </div>
      </footer>
    </div>
  );
}
