import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { nunito } from "./fonts";
import config from "@/data/appConfig.json";

const { googleAnalyticId, googleTagManagerId } = config.googleProvider;

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body className={process.env.ENV === "PROD" ? "prod-env" : ""}>
        {children}
      </body>
      {googleAnalyticId && <GoogleAnalytics gaId={googleAnalyticId} />}
      {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
    </html>
  );
}
