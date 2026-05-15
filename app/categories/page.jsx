import Link from "next/link";
import { getCategories } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";

export const metadata = {
  title: "Categories - PhotoPromptsHub",
  description: "Browse AI image prompts by category: portraits, landscapes, abstract, and more.",
};

export default async function CategoriesPage() {
  const prompts = await getPrompts();
  const categories = getCategories(prompts);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Browse by Category</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Find AI image prompts organized by type and use case
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${encodeURIComponent(category.name.toLowerCase())}`}
              className="group rounded-lg border border-slate-200 p-6 transition-all hover:border-brand-primary hover:shadow-lg dark:border-slate-700"
            >
              <h3 className="mb-4 text-2xl font-semibold group-hover:text-brand-primary">
                {category.name}
              </h3>
              <p className="font-medium text-brand-primary">
                {category.count} prompts →
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No categories available at the moment.
          </p>
        </div>
      )}
    </>
  );
}
