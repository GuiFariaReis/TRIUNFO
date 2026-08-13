import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { searchProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/busca")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Busca — Drogaria Triunfo" },
      { name: "description", content: "Encontre medicamentos e produtos de saúde na Drogaria Triunfo." },
      { property: "og:title", content: "Busca — Drogaria Triunfo" },
      { property: "og:description", content: "Busca inteligente por produto, marca ou sintoma." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchProducts(q ?? "");

  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <h1 className="text-xl font-extrabold">
        Resultados para “{q}”
      </h1>
      <p className="text-sm text-muted-foreground">{results.length} produtos encontrados</p>

      {results.length === 0 ? (
        <p className="mt-8 rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
          Não encontramos esse item. Tente buscar pelo princípio ativo, marca ou sintoma
          (ex.: “dor de cabeça”).
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
