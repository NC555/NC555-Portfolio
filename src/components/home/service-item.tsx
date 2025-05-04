import React from "react";
import type { RawLifeStyle } from "@/types/about";
import "@/styles/about/service-item.css";

interface ServiceItemProps {
  lifestyle: Omit<RawLifeStyle, "icon"> & {
    icon: any;
  };
}

function ServiceItem({ lifestyle }: ServiceItemProps) {
  // Create a safe render function for the icon
  const renderIcon = () => {
    try {
      if (typeof lifestyle.icon === "function") {
        return React.createElement(lifestyle.icon);
      }
      return lifestyle.icon;
    } catch (error) {
      console.error("Error rendering icon:", error);
      return null;
    }
  };
  return (
    <li className="service-item bg-border-gradient-onyx relative shadow-shadow-2 rounded-2xl before:absolute before:content-[''] before:rounded-2xl">
      <div className="mb-2.5 sm:mb-0 sm:mt-2 flex justify-center items-center">
        {/* Render the icon safely */}
        <span className="text-orange-yellow-crayola" style={{ fontSize: 24 }}>
          {renderIcon()}
        </span>
      </div>

      <div className="text-center sm:text-left">
        <h4 className="text-white-2 text-lg font-bold mb-[7px]">
          {lifestyle.title}
        </h4>
        <p className="text-light-gray text-sm font-light leading-6">
          {lifestyle.text}
        </p>
      </div>
    </li>
  );
}

export default ServiceItem;
