import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PostData } from "@/types/post";
import { revalidatePath } from "next/cache";

const postsDirectory = path.join(process.cwd(), "_posts");

// Helper to format data as markdown with frontmatter
function formatPostDataToMarkdown(data: PostData): string {
  const frontmatter: any = {
    title: data.title,
    publishedAt: data.publishedAt,
    category: data.category,
    tags: data.tags.join(", "),
    summary: data.summary,
    banner: data.banner,
    alt: data.alt,
    mathjax: data.mathjax,
  };

  // Build frontmatter string
  let frontmatterString = "---\n";
  for (const key in frontmatter) {
    if (
      frontmatter[key] !== undefined &&
      frontmatter[key] !== null &&
      frontmatter[key] !== ""
    ) {
      // Handle boolean value correctly for frontmatter
      if (typeof frontmatter[key] === "boolean") {
        frontmatterString += `${key}: ${frontmatter[key] ? "true" : "false"}\n`;
      } else {
        frontmatterString += `${key}: ${frontmatter[key]}\n`;
      }
    }
  }
  frontmatterString += "---\n\n";

  return frontmatterString + (data.content || "");
}

// POST handler for saving blog posts
export async function POST(request: Request) {
  try {
    const postData: PostData = await request.json();

    // Validate required fields (basic validation)
    if (!postData.title || !postData.publishedAt || !postData.category) {
      return NextResponse.json(
        { error: "Missing required post data (title, publishedAt, category)" },
        { status: 400 }
      );
    }

    // Determine filename: use slug if provided, otherwise generate from title
    const slug =
      postData.slug ||
      postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-*|-*$/g, "");
    const filename = `${slug}.mdx`; // Using .mdx extension as seems common in project context
    const filePath = path.join(postsDirectory, filename);

    // Ensure the posts directory exists
    await fs.mkdir(postsDirectory, { recursive: true });

    // Format data to markdown
    const markdownContent = formatPostDataToMarkdown(postData);

    // Write the file
    await fs.writeFile(filePath, markdownContent, "utf-8");

    // Revalidate relevant paths to clear cache
    revalidatePath("/admin/blog"); // Revalidate admin blog list
    revalidatePath("/blog"); // Revalidate public blog list
    revalidatePath(`/blog/${slug}`); // Revalidate the specific post page

    return NextResponse.json({ message: "Post saved successfully!", slug });
  } catch (error: any) {
    console.error("Error saving blog post:", error);
    return NextResponse.json(
      { error: "Failed to save post", details: error.message },
      { status: 500 }
    );
  }
}
