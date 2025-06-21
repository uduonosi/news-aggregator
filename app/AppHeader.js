import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="w-full">
      <div className="relative flex flex-col sm:flex-row gap-4 max-w-7xl mx-auto pb-6 border-b border-b-gray-300 mb-8 items-center">
        <h1 className="text-3xl font-bold text-center dark:text-zinc-100 mb-2 sm:mb-0">
          News Aggregator
        </h1>
        <div className="flex items-center justify-center gap-6 w-full md:mx-auto sm:w-auto order-2 sm:order-none">
          <Link
            href="/"
            className={`text-blue-600 dark:text-blue-400 font-medium underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 transition-colors ${
              pathname === "/" ? "underline" : "no-underline"
            }`}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={`text-blue-600 dark:text-blue-400 font-medium underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 transition-colors ${
              pathname === "/search" ? "underline" : "no-underline"
            }`}
          >
            Search News
          </Link>
        </div>
        <div className="md:ml-auto sm:ml-0 order-3 sm:order-none">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
