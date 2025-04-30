import { redirect } from "next/navigation";

export default function RSSFeedPage() {
  redirect("/rss.xml");
}
