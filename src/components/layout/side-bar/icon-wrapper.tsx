"use client";

import { getIconComponent } from "@/config/icon-utils";
import type { IconType } from "react-icons";

interface IconWrapperProps {
  iconName: string;
  className?: string;
}

export function IconWrapper({ iconName, className }: IconWrapperProps) {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent className={className} />;
}

export interface ContactWithIcon {
  icon: IconType;
  title: string;
  content: string;
  link?: string;
}

export interface SocialLinkWithIcon {
  url: string;
  icon: IconType;
  name: string;
}

export function convertContactIcon(contact: {
  icon: string;
  title: string;
  content: string;
  link?: string;
}) {
  return {
    ...contact,
    icon: getIconComponent(contact.icon),
  };
}

export function convertSocialLinkIcon(socialLink: {
  url: string;
  icon: string;
  name: string;
}) {
  return {
    ...socialLink,
    icon: getIconComponent(socialLink.icon),
  };
}
