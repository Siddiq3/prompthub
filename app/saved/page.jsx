import { getPrompts } from "@/src/lib/data";
import SavedPromptsClient from "./client";

export const metadata = {
  title: "Saved Prompts - PhotoPromptsHub",
  description: "Your locally saved AI image prompts stored in browser storage.",
  robots: "noindex, follow", // Exclude from search engines (personal list)
};

export default async function SavedPage() {
  const prompts = await getPrompts();

  return <SavedPromptsClient initialPrompts={prompts} />;
}
