import { notFound } from "next/navigation";
import Link from "next/link";
import AdSlot from "@/src/components/AdSlot";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import PromptCardServer from "@/src/components/PromptCardServer";
import MasonryGrid from "@/src/components/MasonryGrid";
import { getCollections, getCollectionPrompts } from "@/src/lib/content";
import { getPrompts } from "@/src/lib/data";

export async function generateStaticParams() {
  try {
    const prompts = await getPrompts();
    const collections = getCollections(prompts);
    
    return collections.map((col) => ({
      slug: col.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for collections:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const prompts = await getPrompts();
    const collections = getCollections(prompts);
    const collection = collections.find((c) => c.slug === slug);

    if (!collection) {
      return {
        title: "Collection Not Found",
      };
    }

    const collectionPrompts = getCollectionPrompts(prompts, collection);
    const keywords = [
      `${collection.title} ai prompts`,
      `${collection.title} prompt collection`,
      `${collection.title} ChatGPT prompts`,
      `${collection.title} Gemini prompts`,
      "ai prompt collection",
      "curated prompts",
    ];

    return {
      title: `${collection.title} - Curated AI Prompt Collection | PhotoPromptsHub`,
      description: `${collection.description} Browse ${collectionPrompts.length} professional AI image prompts for ChatGPT and Gemini. Curated collection.`,
      keywords: keywords.join(", "),
      alternates: {
        canonical: `https://photopromptshub.in/collection/${slug}`,
      },
      openGraph: {
        title: `${collection.title} - Curated AI Prompts Collection`,
        description: `${collection.description} ${collectionPrompts.length}+ professional curated prompts.`,
        type: "website",
        url: `https://photopromptshub.in/collection/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: `${collection.title} - AI Prompts`,
        description: collection.description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for collection:", error);
    return {
      title: "Collection",
    };
  }
}

export default async function CollectionPage({ params }) {
  try {
    const { slug } = params;
    const prompts = await getPrompts();
    const collections = getCollections(prompts);
    
    if (!Array.isArray(collections) || collections.length === 0) {
      notFound();
    }

    const collection = collections.find((c) => c.slug === slug);

    if (!collection) {
      notFound();
    }

    const collectionPrompts = getCollectionPrompts(prompts, collection);

    if (!Array.isArray(collectionPrompts) || collectionPrompts.length === 0) {
      notFound();
    }

    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Collections", href: "/collections" },
      { label: collection.title, href: `/collection/${slug}` },
    ];

    return (
      <>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{collection.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {collection.description}
          </p>
        </div>

        <AdSlot slot={`collection_${slug}_top`} />

        <MasonryGrid>
          {collectionPrompts.map((prompt) => (
            <PromptCardServer key={prompt.id} prompt={prompt} />
          ))}
        </MasonryGrid>
        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          {collectionPrompts.length} prompts in this collection
        </p>

        <AdSlot slot={`collection_${slug}_bottom`} />
      </>
    );
  } catch (error) {
    console.error("Error rendering collection page:", error);
    notFound();
  }
}
