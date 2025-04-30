import type { VCardIconType } from "@/types/config";

import "@/styles/icon-box.css";

interface IconBoxProps {
  icon: VCardIconType;
}

function IconBox({ icon: Icon }: IconBoxProps) {
  return (
    <div className="icon-box bg-border-gradient-onyx text-orange-yellow-crayola flex items-center justify-center text-lg shadow-shadow-1 relative rounded-xl w-[40px] h-[40px] md:w-[48px] md:h-[48px] md:text-xl z-1 before:bg-eerie-black-1 before:rounded-xl before:absolute before:content-[''] before:inset-[1px]">
      <Icon />
    </div>
  );
}

export default IconBox;
