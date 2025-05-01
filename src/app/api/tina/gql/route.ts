import { NextRequest, NextResponse } from "next/server";
import client from "tina/__generated__/client";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();

  try {
    const result = await client.request(query, variables);

    // Revalidate paths if it's a mutation
    if (query.includes("mutation")) {
      revalidatePath("/");
      revalidatePath("/admin");
      // Add any other paths that need revalidation after Tina Cloud updates
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error proxying Tina GraphQL request:", error);
    return NextResponse.json(
      {
        errors: [{ message: "Error proxying Tina GraphQL request", error }],
      },
      { status: 500 }
    );
  }
}
