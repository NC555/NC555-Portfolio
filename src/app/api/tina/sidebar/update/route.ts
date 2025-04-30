import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

// This API route handles updating the sidebar configuration
export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Path to the sidebar configuration file
    const filePath = path.join(process.cwd(), "src/data/sidebarConfig.json");

    // Write the updated configuration to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    // Revalidate the paths that use the sidebar configuration
    revalidatePath("/");
    revalidatePath("/admin");

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
