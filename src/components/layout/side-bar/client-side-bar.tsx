"use client";

import SideBar from "@/components/layout/side-bar/index"; // Use index explicitly if needed
import type { Contact, SocialLink, SidebarFooterItem } from "@/types/config"; // Import SidebarFooterItem

interface ClientSideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts: Contact[];
  socialLinks: SocialLink[];
  sidebarFooter?: SidebarFooterItem[]; // Add sidebarFooter prop
}

export default function ClientSideBar(props: ClientSideBarProps) {

  return (
    <SideBar
      avatar={props.avatar}
      firstName={props.firstName}
      lastName={props.lastName}
      middleName={props.middleName}
      preferredName={props.preferredName}
      status={props.status}
      contacts={props.contacts}
      socialLinks={props.socialLinks}
      sidebarFooter={props.sidebarFooter} // Pass sidebarFooter prop down
    />
  );
}