import CodeHeader from "@/components/home/code-header";
import ServiceItem from "@/components/home/service-item";

import type { TransformedLifeStyle } from "@/types/about"; // Changed from RawLifeStyle

interface LifeStylesProps {
  lifestyles: TransformedLifeStyle[]; // Changed from RawLifeStyle[]
  headerText: string;
}

function LifeStyles({ lifestyles, headerText }: LifeStylesProps) {
  return (
    <section id="life-styles">
      <CodeHeader text={headerText} />
      <ul className="mt-[30px] grid lg:grid-cols-2 sm:grid-cols-2  gap-[20px] lg:gap-y-[20px] lg:gap-x-[25px]">
        {lifestyles.map(
          (
            lifestyle: TransformedLifeStyle // Changed from RawLifeStyle
          ) => (
            // ServiceItem expects `lifestyle.icon` to be a component/any, which TransformedLifeStyle provides
            <ServiceItem lifestyle={lifestyle} key={lifestyle.title} />
          )
        )}
      </ul>
    </section>
  );
}

export default LifeStyles;
