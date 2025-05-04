type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean }
  | ClassValue[];

const clsx = require("clsx").default || require("clsx");
const twMerge = require("tailwind-merge").twMerge;

export function cn(...inputs: ClassValue[]) {
  // Ensure twMerge and clsx are functions before calling
  if (typeof twMerge !== "function" || typeof clsx !== "function") {
    console.error("Error: twMerge or clsx is not loaded correctly.");
    // Fallback: join class names without merging/optimizing
    return inputs.flat().filter(Boolean).join(" ");
  }
  return twMerge(clsx(inputs));
}
