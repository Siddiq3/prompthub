import { getPrompts, getAllPromptSlugs } from "@/src/lib/data";
import { getCategories, getCollections } from "@/src/lib/content";
import { STATIC_INDEXABLE_ROUTES } from "@/src/lib/routes";

export default async function sitemap() {
  const baseUrl = "https://photopromptshub.in";

  try {
    const prompts = await getPrompts();
    const categories = getCategories(prompts);
    const collections = getCollections(prompts);
    const slugs = await getAllPromptSlugs();

    // Static routes
    const staticRoutes = STATIC_INDEXABLE_ROUTES.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changefreq,
      priority: parseFloat(route.priority),
    }));

    // Dynamic prompt routes
    const promptRoutes = slugs.map((slug) => ({
      url: `${baseUrl}/prompt/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    // Category routes
    const categoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/category/${encodeURIComponent(cat.name.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Collection routes
    const collectionRoutes = collections.map((col) => ({
      url: `${baseUrl}/collection/${col.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...promptRoutes, ...categoryRoutes, ...collectionRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
