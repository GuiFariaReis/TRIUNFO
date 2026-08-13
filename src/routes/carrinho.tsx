import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { brl } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Sacola — Drogaria Triunfo" },
      { name: "description", content: "Revise os itens da sua sacola e finalize em poucos toques." },
      { property: "og:title", content: "Sacola — Drogaria Triunfo" },
      { property: "og:description", content: "Checkout rápido com Pix, cartão ou pagamento na entrega." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartDetailed, setQty, remove, subtotal } = useStore();
  const frete = subtotal >= 99 || subtotal === 0 ? 0 : 9.9;

  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" strokeWidth={1.5} />
        <h1 className="mt-4 text-xl font-extrabold">Sua sacola está vazia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore as ofertas do dia e economize na sua compra.
        </p>
        <Button asChild className="mt-5 rounded-full">
          <Link to="/">Começar a comprar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-5">
      <h1 className="text-xl font-extrabold">Sua sacola</h1>

      <ul className="mt-4 space-y-3">
        {cartDetailed.map(({ product, qty }) => (
          <li key={product.id} className="flex gap-3 rounded-2xl border bg-card p-3">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 border border-slate-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-contain"
                />
              ) : (
                <ShoppingBag className="size-7 text-primary/50" strokeWidth={1.5} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-snug">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.unit}</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center rounded-full border">
                  <button className="p-2" onClick={() => setQty(product.id, qty - 1)} aria-label="Diminuir">
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                  <button className="p-2" onClick={() => setQty(product.id, qty + 1)} aria-label="Aumentar">
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary-dark">{brl(product.price * qty)}</span>
                  <button onClick={() => remove(product.id)} aria-label="Remover">
                    <Trash2 className="size-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 rounded-2xl border bg-card p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{brl(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Entrega</span>
          <span className={frete === 0 ? "font-semibold text-success" : ""}>
            {frete === 0 ? "Grátis" : brl(frete)}
          </span>
        </div>
        <div className="flex justify-between border-t pt-2 text-base font-extrabold">
          <span>Total</span>
          <span className="text-primary-dark">{brl(subtotal + frete)}</span>
        </div>
      </div>

      <Button asChild size="lg" className="mt-4 w-full rounded-full">
        <Link to="/checkout">Finalizar compra</Link>
      </Button>
    </div>
  );
}
