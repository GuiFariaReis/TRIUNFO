import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { categories, products } from "@/lib/catalog";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias — Drogaria Triunfo" },
      {
        name: "description",
        content: "Navegue por medicamentos, dermocosméticos, vitaminas, higiene, beleza e mais.",
      },
      { property: "og:title", content: "Categorias — Drogaria Triunfo" },
      { property: "og:description", content: "Todas as categorias da Drogaria Triunfo." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <h1 className="text-xl font-extrabold">Categorias</h1>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/categoria/$slug"
            params={{ slug: c.slug }}
            className="flex items-center justify-between rounded-2xl border bg-card p-4"
          >
            <span>
              <span className="block text-sm font-semibold">{c.name}</span>
              <span className="block text-xs text-muted-foreground">
                {products.filter((p) => p.category === c.slug).length} produtos
              </span>
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
