import { NextResponse } from "next/server";
import { PhotoMetadata } from "@/types/gallery";
import {
  getPhotosMetadata,
  savePhotosMetadata,
  addPhotoMetadata,
  updatePhotoTags,
  deletePhotoMetadata,
} from "@/lib/gallery-metadata";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");

export const dynamic = "force-static";

export async function GET() {
  try {
    const metadata = await getPhotosMetadata();
    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error fetching photo metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch photo metadata" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { filename, tags } = data;

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    const newPhoto = await addPhotoMetadata(filename, tags || []);
    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    console.error("Error adding photo metadata:", error);
    return NextResponse.json(
      { error: "Failed to add photo metadata" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, tags } = data;

    if (!id || !tags) {
      return NextResponse.json(
        { error: "ID and tags are required" },
        { status: 400 }
      );
    }

    const updatedPhoto = await updatePhotoTags(id, tags);
    if (!updatedPhoto) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPhoto);
  } catch (error) {
    console.error("Error updating photo tags:", error);
    return NextResponse.json(
      { error: "Failed to update photo tags" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const metadata = await getPhotosMetadata();
    const photo = metadata.find((p) => p.id === id);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete the image file
    const filePath = path.join(UPLOAD_DIR, photo.filename);
    try {
      await fs.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
      // Continue with metadata deletion even if file deletion fails
    }

    const deleted = await deletePhotoMetadata(id);
    if (!deleted) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
