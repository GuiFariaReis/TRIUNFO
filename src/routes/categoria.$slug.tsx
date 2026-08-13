import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Categoria — Drogaria Triunfo" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.category.name} — Drogaria Triunfo`;
    const description = `Compre ${loaderData.category.name.toLowerCase()} com entrega rápida na Drogaria Triunfo.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [sort, setSort] = useState("relevancia");

  const list = products
    .filter((p) => p.category === category.slug)
    .sort((a, b) =>
      sort === "menor" ? a.price - b.price : sort === "maior" ? b.price - a.price : 0,
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold">{category.name}</h1>
          <p className="text-sm text-muted-foreground">{list.length} produtos</p>
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44 rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevancia">Mais relevantes</SelectItem>
            <SelectItem value="menor">Menor preço</SelectItem>
            <SelectItem value="maior">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
