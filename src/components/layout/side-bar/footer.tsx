import React from "react";
import Link from "next/link";
import { SidebarFooterItem } from "@/types/config"; // Import the type

interface FooterProps {
  sidebarFooter?: SidebarFooterItem[]; // Add prop type
}

function Footer({ sidebarFooter = [] }: FooterProps) { // Destructure prop with default value
  // Find the credit item
  const creditItem = sidebarFooter.find(item => item.itemType === 'Credit');
  // Filter out the credit item for the other links
  const otherLinks = sidebarFooter.filter(item => item.itemType !== 'Credit');

  return (
    <footer className="py-4 px-6 text-center text-sm text-light-gray">
      {/* Render Credit Line Dynamically */}
      {creditItem && (
        <div className="mb-2">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
            href={creditItem.url}
            target={creditItem.url.startsWith('http') ? '_blank' : undefined}
            rel={creditItem.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {creditItem.title}
          </Link>
        </div>
      )}
      {/* Render other links dynamically */}
      <div className="space-x-4">
        {otherLinks.map((item) => (
          <Link
            key={item.itemType} // Use itemType as key, assuming it's unique
            className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
            href={item.url}
            // Add target="_blank" for external links if needed
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
