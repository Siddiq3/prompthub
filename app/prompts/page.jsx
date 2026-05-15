import { getPrompts } from "@/src/lib/data";
import PromptsClientPage from "./client";

export const metadata = {
  title: "Browse Prompts - PhotoPromptsHub",
  description: "Browse and search AI image prompts by category, model, style, and more.",
};

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return (
    <>
      <PromptsClientPage initialPrompts={prompts} />
    </>
  );
}
