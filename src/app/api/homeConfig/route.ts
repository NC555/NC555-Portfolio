// apps/web/src/app/api/homeConfig/route.ts
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Define the path to the JSON file
// Define the path relative to the API route's likely CWD (E:/data/portfolnoy/apps/web)
const dataFilePath = path.join(process.cwd(), "src", "data", "homeConfig.json");

// GET handler to read the configuration
export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Failed to read home configuration:", error);
    return NextResponse.json(
      { error: "Failed to read home configuration" },
      { status: 500 }
    );
  }
}

// POST handler to write the configuration
export async function POST(request: Request) {
  try {
    const newData = await request.json();

    if (!newData || typeof newData !== "object") {
      return NextResponse.json(
        { error: "Invalid data format provided" },
        { status: 400 }
      );
    }

    // Add validation logic here if needed to ensure newData matches expected structure

    const fileContent = JSON.stringify(newData, null, 2); // Pretty print JSON
    await fs.writeFile(dataFilePath, fileContent, "utf-8");

    return NextResponse.json({
      message: "Home configuration updated successfully",
    });
  } catch (error) {
    console.error("Failed to write home configuration:", error);
    return NextResponse.json(
      { error: "Failed to write home configuration" },
      { status: 500 }
    );
  }
}
