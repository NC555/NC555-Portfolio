import CodeHeader from "@/components/about/code-header";
import ServiceItem from "@/components/about/service-item";

import type { RawLifeStyle } from "@/types/about";

interface LifeStylesProps {
  lifestyles: RawLifeStyle[];
  headerText: string;
}

function LifeStyles({ lifestyles, headerText }: LifeStylesProps) {
  return (
    <section id="life-styles">
      <CodeHeader text={headerText} />
      <ul className="mt-[30px] grid grid-cols-2 gap-[20px] lg:gap-y-[20px] lg:gap-x-[25px]">
        {lifestyles.map((lifestyle: RawLifeStyle) => (
          <ServiceItem lifestyle={lifestyle} key={lifestyle.title} />
        ))}
      </ul>
    </section>
  );
}

export default LifeStyles;
