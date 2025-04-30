import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/data/galleryCategories.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const categories = JSON.parse(fileContents);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 }
    );
  }
}
