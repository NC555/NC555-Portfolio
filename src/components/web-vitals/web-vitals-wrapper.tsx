"use client";

import { WebVitals } from "./index";
import { WebVitalsProps } from "./index";

export default function WebVitalsWrapper({ gaId }: WebVitalsProps) {
  return <WebVitals gaId={gaId} />;
}
