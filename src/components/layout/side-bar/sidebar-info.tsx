"use client";

import Image from "next/image";
import { MdExpandMore } from "react-icons/md";
import { useResponsiveImageSize } from "@/hooks/use-responsive-image-size";
import { breakpoints } from "@/lib/constants";

import "@/styles/side-bar/sidebar-info.css";
import "@/styles/side-bar/info-more-btn.css";

interface SideBarInfoProps {
  onToggle: () => void;
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
}

function SideBarInfo({
  onToggle,
  avatar,
  firstName,
  lastName,
  preferredName,
  status,
}: SideBarInfoProps) {
  const imageSize = useResponsiveImageSize(breakpoints);

  return (
    <div className="sidebar-info">
      <figure className="avatar-box">
        <Image
          id={`${firstName}${preferredName?.trim() ? ` (${preferredName})` : ''} ${lastName}`}
          src={avatar}
          alt={`${firstName}${preferredName?.trim() ? ` (${preferredName})` : ''} ${lastName}`}
          width={imageSize.width}
          height={imageSize.height}
          quality={50}
          loading="eager"
          priority
        />
      </figure>
      <div className="info-content">
        <h1
          className="name"
          title={`${firstName}${preferredName?.trim() ? ` (${preferredName})` : ''} ${lastName}`}
        >
          {firstName}{preferredName?.trim() ? ` (${preferredName})` : ''} {lastName}
        </h1>
        <p className="text-white-1 bg-onyx text-xs font-light max-w-max rounded-[8px] custom-lg:m-auto px-3 py-1 md:px-[18px] md:py-[5px]">
          {status}
        </p>
      </div>

      <button className="info-more-btn" onClick={onToggle} data-sidebar-btn>
        <span>Show Contacts</span>
        <MdExpandMore />
      </button>
    </div>
  );
}

export default SideBarInfo;
