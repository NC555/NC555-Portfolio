import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises"; // Import mkdir
import { existsSync } from "fs"; // Import existsSync for checking directory
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Get file extension
  const fileExtension = file.name.split(".").pop();
  // Create a unique filename
  const uniqueFilename = `${uuidv4()}.${fileExtension}`;
  // Path to save the file (relative to public directory)
  const relativePath = `/uploads/${uniqueFilename}`;
  // Path to save the file (absolute filesystem path)
  const uploadDir = join(process.cwd(), "public", "uploads");
  const filepath = join(uploadDir, uniqueFilename);

  try {
    // Ensure the uploads directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to ArrayBuffer
    const buffer = await file.arrayBuffer();
    // Write file to the filesystem
    await writeFile(filepath, Buffer.from(buffer));

    // Return the relative path to access the file
    return NextResponse.json({
      success: true,
      filepath: relativePath,
    });
  } catch (error: any) {
    // Add type any for error object
    console.error("Detailed upload error:", error); // More detailed logging
    return NextResponse.json(
      { error: `Failed to upload file: ${error.message || "Unknown error"}` }, // Include error message
      { status: 500 }
    );
  }
}
