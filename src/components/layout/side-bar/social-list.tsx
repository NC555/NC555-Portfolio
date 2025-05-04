"use client";

import Link from "next/link";
import { getIconComponent } from "@/config/icon-utils";
import type { SocialLink } from "@/types/config"; // Added import

interface SocialListProps {
  socialLinks: SocialLink[];
}

function SocialList({ socialLinks }: SocialListProps) {
  return (
    <ul className="flex justify-start items-center gap-[15px] pb-1 pl-[7px] xl:justify-center md:justify-center">
      {socialLinks.map(({ url, icon: iconName, name }) => {
        // Convert icon string to actual component using shared utility
        const Icon = getIconComponent(iconName);

        return (
          <li
            key={name}
            className="text-light-gray-70 text-lg hover:scale-110 hover:text-orange-yellow-crayola"
          >
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
            >
              <Icon />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialList;
