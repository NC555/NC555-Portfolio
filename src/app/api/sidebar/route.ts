import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidateTag } from "next/cache";

export const dynamic = "force-static";

// GET handler to fetch the sidebar configuration
export async function GET() {
  try {
    // Read the sidebar configuration from the JSON file
    const filePath = path.join(process.cwd(), "src/data/sidebarConfig.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading sidebar config:", error);
    return NextResponse.json(
      {
        error: "Error reading sidebar configuration",
      },
      { status: 500 }
    );
  }
}

// POST handler to update the sidebar configuration
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Path to the sidebar configuration file
    const filePath = path.join(process.cwd(), "src/data/sidebarConfig.json");

    // Write the updated configuration to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    // Revalidate the paths that use the sidebar configuration
    revalidateTag("sidebar"); // Revalidate fetches using the 'sidebar' tag

    return NextResponse.json({
      success: true,
      message: "Sidebar configuration updated successfully",
    });
  } catch (error) {
    console.error("Error updating sidebar configuration:", error);
    return NextResponse.json(
      { error: "Failed to update sidebar configuration" },
      { status: 500 }
    );
  }
}
