import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Package } from "lucide-react";
import { brl } from "@/lib/catalog";
import { statusLabel, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pedidos/")({
  head: () => ({
    meta: [
      { title: "Meus pedidos — Drogaria Triunfo" },
      { name: "description", content: "Acompanhe o histórico de pedidos e o rastreio das entregas em tempo real." },
      { property: "og:title", content: "Meus pedidos — Drogaria Triunfo" },
      { property: "og:description", content: "Histórico de compras e rastreio em tempo real." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useStore();

  return (
    <div className="mx-auto max-w-2xl px-4 py-5">
      <h1 className="text-xl font-extrabold">Meus pedidos</h1>

      {orders.length === 0 ? (
        <div className="mt-10 text-center">
          <Package className="mx-auto size-12 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-muted-foreground">Você ainda não fez nenhum pedido.</p>
          <Button asChild className="mt-4 rounded-full">
            <Link to="/">Comprar agora</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                to="/pedidos/$id"
                params={{ id: o.id }}
                className="flex items-center gap-3 rounded-2xl border bg-card p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-bold">Pedido {o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString("pt-BR")} · {o.items.length} itens ·{" "}
                    {brl(o.total)}
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      o.status === "entregue"
                        ? "bg-success/15 text-success"
                        : "bg-primary-soft text-primary-dark"
                    }`}
                  >
                    {statusLabel[o.status]}
                  </span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
