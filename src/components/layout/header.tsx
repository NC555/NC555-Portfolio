"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "@/components/progress-bar";
import type { NavigationLink } from "@/types/nav-bar";
import { BlurFade } from "@/components/magicui/blur-fade";

interface NavigationHeaderProps {
  navigationLinks: NavigationLink[];
}

function Header({ navigationLinks }: NavigationHeaderProps) {
  const currentPath = usePathname();

  const isActive = (path: string) => {
    if (path === "/post" && currentPath.startsWith("/post")) return true;
    else if (path === "/portfolio" && currentPath.startsWith("/portfolio"))
      return true;
    return currentPath === path;
  };

  return (
    <header className="fixed bottom-0 left-0 w-full backdrop-blur-[10px] bg-[hsla(240,1%,17%,0.75)] border border-[var(--jet)] shadow-xl z-[5] lg:absolute lg:bottom-auto lg:top-0 lg:left-auto lg:right-0 lg:w-max lg:shadow-none lg:px-5 rounded-t-[12px] sm:rounded-t-[20px] lg:rounded-[0_20px]">
      <BlurFade direction="up">
        <ul className="flex flex-wrap justify-center items-center px-2.5 sm:gap-5 lg:gap-[30px] lg:px-5">
          {navigationLinks.map((link) => (
            <li key={link.path}>
              <ProgressBarLink
                href={link.path}
                className={`block p-5 px-[7px] text-light-gray transition-colors duration-250 ease-in-out md:text-[15px] sm:text-[14px] text-[11px] ${
                  isActive(link.path)
                    ? "active text-orange-yellow-crayola hover:text-orange-yellow-crayola font-bold"
                    : "hover:text-light-gray-70 font-medium"
                }`}
              >
                {link.label}
              </ProgressBarLink>
            </li>
          ))}
        </ul>
      </BlurFade>
    </header>
  );
}

export default Header;
