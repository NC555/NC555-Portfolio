"use client";

import IconBox from "@/components/icon-box";
import Link from "next/link";
import { getIconComponent } from "@/config/icon-utils";
import type { Contact } from "@/types/config"; // Added import

import "@/styles/side-bar/contact-info.css";
import "@/styles/side-bar/contact-list.css";

interface ContactsListProps {
  contacts: Contact[];
}

function ContactsList({ contacts }: ContactsListProps) {
  return (
    <ul className="contacts-list">
      {contacts.map((contact, index) => {
        const { icon: iconName, title, content, link } = contact;

        // Convert icon string to actual component using shared utility
        const Icon = getIconComponent(iconName);

        const ContentElement = link ? (
          <Link
            href={link}
            className="block text-white-2 text-sm font-light truncate hover:text-orange-yellow-crayola
            transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </Link>
        ) : (
          <span className="block text-white-2 text-sm font-light truncate">
            {content}
          </span>
        );

        return (
          <li key={index} className="min-w-full flex items-center gap-4">
            <IconBox icon={Icon} />
            <div className="contact-info">
              <p className="text-light-gray-70 uppercase mb-1 text-xs">
                {title}
              </p>
              {ContentElement}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ContactsList;
