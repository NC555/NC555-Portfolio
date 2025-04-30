import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadCvProps {
  downloadSloganCV: string;
}

function DownloadCV({ downloadSloganCV }: DownloadCvProps) {
  return (
    <div className="z-10 flex items-center justify-center mt-5 mb-5">
      <Link href="/cv" target="_blank" rel="noopener noreferrer">
        <AnimatedGradientText>
          📑 {" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            {downloadSloganCV}
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-white-1" />
        </AnimatedGradientText>
      </Link>
    </div>
  );
}

export default DownloadCV;
