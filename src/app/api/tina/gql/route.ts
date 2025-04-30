import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

// This is a simplified version that reads directly from the file system
export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();

  // Very simple GraphQL parser - in a real app you'd use a proper GraphQL library
  if (query.includes("sidebarConfig") && !query.includes("mutation")) {
    try {
      const filePath = path.join(process.cwd(), "src/data/sidebarConfig.json");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContents);

      return NextResponse.json({
        data: {
          sidebarConfig: data,
        },
      });
    } catch (error) {
      console.error("Error reading sidebar config:", error);
      return NextResponse.json(
        {
          errors: [{ message: "Error reading sidebar config" }],
        },
        { status: 500 }
      );
    }
  }

  // Handle mutations for updating the sidebar configuration
  if (query.includes("mutation") && query.includes("updateSidebarConfig")) {
    try {
      const filePath = path.join(process.cwd(), "src/data/sidebarConfig.json");

      // Get the input data from the variables
      const { input } = variables;

      if (!input) {
        return NextResponse.json(
          {
            errors: [{ message: "No input provided" }],
          },
          { status: 400 }
        );
      }

      // Write the updated configuration to the file
      fs.writeFileSync(filePath, JSON.stringify(input, null, 2), "utf8");

      // Revalidate the paths that use the sidebar configuration
      revalidatePath("/");
      revalidatePath("/admin");

      return NextResponse.json({
        data: {
          updateSidebarConfig: {
            ...input,
            _sys: {
              filename: "sidebarConfig.json",
              basename: "sidebarConfig",
              breadcrumbs: ["sidebarConfig"],
              path: "src/data/sidebarConfig.json",
              relativePath: "sidebarConfig.json",
              extension: "json",
            },
          },
        },
      });
    } catch (error) {
      console.error("Error updating sidebar config:", error);
      return NextResponse.json(
        {
          errors: [{ message: "Error updating sidebar config" }],
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    {
      errors: [{ message: "Query not supported" }],
    },
    { status: 400 }
  );
}
