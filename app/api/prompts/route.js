import { getPrompts } from "@/src/lib/data";

export async function GET() {
  try {
    const prompts = await getPrompts();
    return Response.json(prompts);
  } catch (error) {
    console.error("Error in /api/prompts:", error);
    return Response.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
