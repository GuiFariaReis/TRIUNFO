import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingBasket, Truck } from "lucide-react";
import { toast } from "sonner";
import { brl, getProduct, products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Produto — Drogaria Triunfo" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name} — Drogaria Triunfo`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useStore();
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const off = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link to="/" className="hover:underline">Início</Link> ·{" "}
        <Link to="/categoria/$slug" params={{ slug: product.category }} className="hover:underline">
          {product.category}
        </Link>
      </nav>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-white p-4 border border-slate-100 shadow-sm">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <ShoppingBasket className="size-24 text-primary/40" strokeWidth={1.2} />
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight">{product.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>

          {product.rx && (
            <p className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
              Venda sob prescrição médica. A receita será solicitada na entrega.
            </p>
          )}

          <div className="mt-4 flex items-end gap-3">
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">{brl(product.oldPrice)}</span>
            )}
            <span className="text-3xl font-extrabold text-primary-dark">{brl(product.price)}</span>
            {off > 0 && (
              <span className="rounded-full bg-promo px-2 py-0.5 text-xs font-bold text-promo-foreground">
                -{off}%
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">ou 3x de {brl(product.price / 3)} sem juros</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-full border">
              <button className="p-2.5" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button className="p-2.5" onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 rounded-full"
              onClick={() => {
                add(product.id, qty);
                toast.success("Adicionado à sacola", { description: product.name });
              }}
            >
              Adicionar à sacola
            </Button>
          </div>

          <div className="mt-5 space-y-2 rounded-2xl border bg-card p-4 text-sm">
            <p className="flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Entrega em até 60 min · grátis acima de R$ 99
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> Produto original com nota fiscal
            </p>
          </div>

          <div className="mt-5">
            <h2 className="text-sm font-bold">Descrição</h2>
            <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-extrabold">Você também pode gostar</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
