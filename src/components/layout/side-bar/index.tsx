"use client";

import { useState, useRef } from "react";
import SideBarInfo from "@/components/layout/side-bar/sidebar-info";
import ContactsList from "./contact-list";
import SocialList from "./social-list";
import Footer from "./footer";

import type { Contact, SocialLink, SidebarFooterItem } from "@/types/config"; // Import SidebarFooterItem

interface SideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts?: Contact[];
  socialLinks?: SocialLink[];
  sidebarFooter?: SidebarFooterItem[]; // Add sidebarFooter prop type
}

function SideBar({
  avatar,
  firstName,
  lastName,
  middleName,
  preferredName,
  status,
  contacts = [],
  socialLinks = [],
  sidebarFooter = [], // Add sidebarFooter to destructuring with default
}: SideBarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? "active" : ""}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <SideBarInfo
        onToggle={handleSidebarToggle}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        preferredName={preferredName}
        status={status}
      />

      <div className="sidebar-info-more">
        <div className="separator"></div>
        <ContactsList contacts={contacts} />
        <div className="separator-no-line"></div>
        <SocialList socialLinks={socialLinks} />
        <div className="separator-footer"></div>
        <Footer sidebarFooter={sidebarFooter} /> 
      </div>
    </aside>
  );
}

export default SideBar;
