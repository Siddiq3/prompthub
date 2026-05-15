import { notFound } from "next/navigation";
import Link from "next/link";
import AdSlot from "@/src/components/AdSlot";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import PromptCardServer from "@/src/components/PromptCardServer";
import MasonryGrid from "@/src/components/MasonryGrid";
import { getCategories, getPromptsByCategory } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";

export async function generateStaticParams() {
  try {
    const prompts = await getPrompts();
    const categories = getCategories(prompts);
    
    return categories.map((cat) => ({
      name: cat.name.toLowerCase(),
    }));
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { name } = params;
  const categoryName = decodeURIComponent(name);

  return {
    title: `${categoryName} Prompts - PhotoPromptsHub`,
    description: `Browse AI image prompts in the ${categoryName} category for Midjourney, DALL·E, Flux, and Stable Diffusion.`,
    openGraph: {
      title: `${categoryName} Prompts`,
      description: `AI image prompts in the ${categoryName} category`,
    },
  };
}

export default async function CategoryPage({ params }) {
  try {
    const { name } = params;
    const categoryName = decodeURIComponent(name);
    const prompts = await getPrompts();
    
    if (!Array.isArray(prompts) || prompts.length === 0) {
      notFound();
    }

    const categoryPrompts = getPromptsByCategory(prompts, categoryName);

    if (!Array.isArray(categoryPrompts) || categoryPrompts.length === 0) {
      notFound();
    }

    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: categoryName, href: `/category/${name}` },
    ];

    return (
      <>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold capitalize">{categoryName} Prompts</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Browse AI image prompts for {categoryName} projects
          </p>
        </div>

        <AdSlot slot={`category_${name}_top`} />

        <MasonryGrid>
          {categoryPrompts.map((prompt) => (
            <PromptCardServer key={prompt.id} prompt={prompt} />
          ))}
        </MasonryGrid>
        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          Showing {categoryPrompts.length} prompts in {categoryName}
        </p>

        <AdSlot slot={`category_${name}_bottom`} />
      </>
    );
  } catch (error) {
    console.error("Error rendering category page:", error);
    notFound();
  }
}
