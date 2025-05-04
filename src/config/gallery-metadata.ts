import { promises as fs } from "fs";
import path from "path";
import { PhotoMetadata } from "@/types/gallery";

const METADATA_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "galleryConfig.json"
);

export async function getPhotosMetadata(): Promise<PhotoMetadata[]> {
  try {
    const data = await fs.readFile(METADATA_PATH, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData.photos as PhotoMetadata[];
  } catch (error) {
    console.error("Error reading photos metadata:", error);
    return [];
  }
}

export async function savePhotosMetadata(
  metadata: PhotoMetadata[]
): Promise<void> {
  try {
    await fs.writeFile(
      METADATA_PATH,
      JSON.stringify(metadata, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error saving photos metadata:", error);
    throw new Error("Failed to save photos metadata");
  }
}

export async function addPhotoMetadata(
  filename: string,
  tags: string[] = [],
  description = "",
  category = ""
): Promise<PhotoMetadata> {
  const metadata = await getPhotosMetadata();
  const newPhoto: PhotoMetadata = {
    id: Date.now().toString(),
    filename,
    description,
    category,
    tags,
  };
  metadata.push(newPhoto);
  await savePhotosMetadata(metadata);
  return newPhoto;
}

export async function updatePhotoTags(
  id: string,
  tags: string[]
): Promise<PhotoMetadata | null> {
  const metadata = await getPhotosMetadata();
  const photoIndex = metadata.findIndex((photo) => photo.id === id);
  if (photoIndex !== -1) {
    metadata[photoIndex].tags = tags;
    await savePhotosMetadata(metadata);
    return metadata[photoIndex];
  }
  return null;
}

export async function deletePhotoMetadata(id: string): Promise<boolean> {
  const metadata = await getPhotosMetadata();
  const photoIndex = metadata.findIndex((photo) => photo.id === id);
  if (photoIndex !== -1) {
    metadata.splice(photoIndex, 1);
    await savePhotosMetadata(metadata);
    return true;
  }
  return false;
}
