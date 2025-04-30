import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PortfolioData } from "@/types/portfolio";

export const dynamic = "force-static";

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "src/contents/portfolios");
    const fileNames = await fs.readdir(postsDirectory);
    const mdxFiles = fileNames.filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md")
    );

    const projects = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { metadata, content } = parseFrontmatter(fileContent);
        const slug = path.basename(fileName, path.extname(fileName));

        return {
          metadata,
          slug,
          tweetIds: extractTweetIds(content),
          content,
        };
      })
    );

    return NextResponse.json(
      projects.sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
      )
    );
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data: PortfolioData = await request.json();
    const postsDirectory = path.join(process.cwd(), "src/contents/portfolios");
    const slug = data.slug || generateSlug(data.title);
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    const frontmatter = [
      "---",
      `title: "${data.title}"`,
      `publishedAt: "${data.publishedAt}"`,
      `summary: "${data.summary}"`,
      data.category ? `category: "${data.category}"` : "",
      `banner: "${data.banner}"`,
      data.alt ? `alt: "${data.alt}"` : "",
      data.image ? `image: "${data.image}"` : "",
      "---",
    ]
      .filter(Boolean)
      .join("\n");

    const content = `${frontmatter}\n\n${data.content}`;
    await fs.writeFile(filePath, content);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error saving portfolio project:", error);
    return NextResponse.json(
      { error: "Failed to save portfolio project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const postsDirectory = path.join(process.cwd(), "src/contents/portfolios");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    await fs.unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio project" },
      { status: 500 }
    );
  }
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("Invalid frontmatter");
  }

  const frontMatterBlock = match[1];
  const content = fileContent.slice(match[0].length).trim();
  const metadata: Record<string, string> = {};

  const kvRegex = /^(\w+):\s*(?:"([^"]*)"|'([^']*)'|(.*))$/;
  frontMatterBlock
    .trim()
    .split("\n")
    .forEach((line) => {
      const match = kvRegex.exec(line.trim());
      if (match) {
        const [, key, doubleQuoted, singleQuoted, unquoted] = match;
        metadata[key] = doubleQuoted || singleQuoted || unquoted;
      }
    });

  return { metadata, content };
}

function extractTweetIds(content: string) {
  const tweetRegex = /<StaticTweet\sid="(\d+)"\s*\/>/g;
  const tweetIds: string[] = [];
  let match;

  while ((match = tweetRegex.exec(content)) !== null) {
    tweetIds.push(match[1]);
  }

  return tweetIds;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
