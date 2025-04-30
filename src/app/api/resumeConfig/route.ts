import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { revalidateTag } from "next/cache";

export const dynamic = "force-static";

const configPath = path.join(process.cwd(), "src/data/resumeConfig.json");

export async function GET() {
  try {
    const config = await fs.readFile(configPath, "utf-8");
    return NextResponse.json(JSON.parse(config));
  } catch (error) {
    console.error("Error reading resume config:", error);
    return NextResponse.json(
      { message: "Error reading config" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newConfig = await request.json();
    await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2), "utf-8");
    revalidateTag("resume"); // Revalidate cache for resume pages
    return NextResponse.json({ message: "Config updated successfully" });
  } catch (error) {
    console.error("Error writing resume config:", error);
    return NextResponse.json(
      { message: "Error writing config" },
      { status: 500 }
    );
  }
}
