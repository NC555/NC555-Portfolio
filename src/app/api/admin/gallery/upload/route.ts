import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");

export async function POST(request: Request) {
  try {
    // Ensure the upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate a unique filename to prevent overwrites
    const extension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${extension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Write the file to the upload directory
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    return NextResponse.json({ filename: uniqueFilename }, { status: 201 });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}
