import fs from "fs/promises";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category?: string;
  banner: string;
  alt?: string;
  image?: string;
  tags: string[];
  mathjax?: boolean;
};

export const getBlogPosts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const postsDirectory = path.join(process.cwd(), "src", "contents", "posts");

  // Function to recursively get all files in directory and subdirectories
  const getAllFiles = async (dirPath: string): Promise<string[]> => {
    let files: string[] = [];
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await getAllFiles(fullPath));
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
    return files;
  };

  // Use Promise.all to read files concurrently
  const filePaths = await getAllFiles(postsDirectory);

  const posts = await Promise.all(
    filePaths.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, "utf-8");

      // Parse frontmatter
      const { metadata, content } = parseFrontmatter(fileContent);
      const fileName = path.basename(filePath);
      const slug = path.basename(fileName, path.extname(fileName));

      return {
        metadata: metadata as Metadata,
        slug,
        tweetIds: extractTweetIds(content),
        content,
      };
    })
  );

  // Sort posts by date once, not on every request
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
};

// Helper functions remain the same but use RegExp.exec() for better performance
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("Invalid frontmatter");
  }

  const frontMatterBlock = match[1];
  const content = fileContent.slice(match[0].length).trim();
  const metadata: any = {}; // Use any temporarily to handle different types

  frontMatterBlock
    .trim()
    .split("\n")
    .forEach((line) => {
      const [key, ...valueParts] = line.split(":").map((part) => part.trim());
      const value = valueParts.join(":").trim(); // Join parts in case of colons in value

      if (key) {
        // Handle specific types
        if (key === "tags") {
          // Split comma-separated tags into an array
          metadata[key] = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
        } else if (key === "mathjax") {
          // Parse boolean value
          metadata[key] = value.toLowerCase() === "true";
        } else {
          // Assign other values as strings
          metadata[key] = value;
        }
      }
    });

  return { metadata: metadata as Metadata, content }; // Cast to Metadata type
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
