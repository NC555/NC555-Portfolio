import IconBox from "../icon-box";
import type { VCardIconType } from "@/types/config";
// Import specific icons used in resume config
import { IoSchoolOutline } from "react-icons/io5";
import { PiTrophy, PiBooks } from "react-icons/pi";
import { MdOutlineDevices } from "react-icons/md";
import { type IconType as ReactIconType } from "react-icons";

// Define interface to allow string icon names or the VCardIconType itself
interface IconTitleProps {
  icon: string | VCardIconType; // Allow string name or the component type
  title: string;
}

// Define icon mapping from string names to React Icon components
const iconMap: { [key: string]: ReactIconType } = {
  IoSchoolOutline: IoSchoolOutline,
  PiTrophy: PiTrophy,
  PiBooks: PiBooks,
  MdOutlineDevices: MdOutlineDevices,
  // Add other icons if needed in the future
};

function IconTitle({ icon, title }: IconTitleProps) {
  // If icon is a string, look up the component in the map
  const IconComponent: VCardIconType | undefined =
    typeof icon === "string" ? iconMap[icon] : icon;

  // If icon is not found or not a valid type, you might render a placeholder or nothing
  if (!IconComponent) {
    console.error(`Icon component not found for icon: ${icon}`);
    return (
      <div className="flex items-center gap-4 mb-6">
        {/* Optional: Render a placeholder icon or just the title */}
        {/* <IconBox icon={DefaultPlaceholderIcon} /> */}
        <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Pass the resolved IconComponent to IconBox */}
      <IconBox icon={IconComponent} />
      <h3 className="text-white-2 text-2xl font-bold">{title}</h3>
    </div>
  );
}

export default IconTitle;
