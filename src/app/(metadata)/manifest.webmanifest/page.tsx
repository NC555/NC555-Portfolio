import { redirect } from "next/navigation";

export default function Manifest() {
  redirect("/manifest.json");
}
