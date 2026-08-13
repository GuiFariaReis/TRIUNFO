import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, CheckCircle2, Circle, MapPin, PackageCheck, Store } from "lucide-react";
import { brl } from "@/lib/catalog";
import { statusLabel, useStore, type OrderStatus } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pedidos/$id")({
  head: () => ({
    meta: [
      { title: "Rastreio do pedido — Drogaria Triunfo" },
      { name: "description", content: "Acompanhe em tempo real cada etapa da entrega do seu pedido." },
      { property: "og:title", content: "Rastreio do pedido — Drogaria Triunfo" },
      { property: "og:description", content: "Do preparo à entrega, em tempo real." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderTracking,
});

const steps: { key: OrderStatus; icon: typeof Store; desc: string }[] = [
  { key: "confirmado", icon: CheckCircle2, desc: "Recebemos e confirmamos seu pagamento" },
  { key: "separacao", icon: Store, desc: "Nossa equipe está separando os itens" },
  { key: "rota", icon: Bike, desc: "O entregador está a caminho do seu endereço" },
  { key: "entregue", icon: PackageCheck, desc: "Pedido entregue. Bom tratamento!" },
];

function OrderTracking() {
  const { id } = Route.useParams();
  const { orders, advanceOrder } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-xl font-extrabold">Pedido não encontrado</h1>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/pedidos">Ver meus pedidos</Link>
        </Button>
      </div>
    );
  }

  const current = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="mx-auto max-w-2xl px-4 py-5">
      <p className="text-xs text-muted-foreground">Pedido {order.id}</p>
      <h1 className="text-xl font-extrabold">{statusLabel[order.status]}</h1>
      <p className="text-sm text-muted-foreground">
        {order.status === "entregue" ? "Entregue" : `Previsão de entrega: ${order.eta}`}
      </p>

      <div className="mt-5 rounded-2xl border bg-card p-4">
        <ol className="space-y-4">
          {steps.map((s, i) => {
            const done = i <= current;
            const Icon = done ? s.icon : Circle;
            return (
              <li key={s.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex size-9 items-center justify-center rounded-full ${
                      done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                  </span>
                  {i < steps.length - 1 && (
                    <span className={`w-0.5 flex-1 ${i < current ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
                <div className="pb-2">
                  <p className={`text-sm font-semibold ${done ? "" : "text-muted-foreground"}`}>
                    {statusLabel[s.key]}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {order.status === "rota" && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-primary-soft p-4">
          <Bike className="size-6 text-primary-dark" />
          <div className="text-sm">
            <p className="font-semibold">{order.courier} está a caminho</p>
            <p className="text-xs text-muted-foreground">Chega em aproximadamente 15 minutos</p>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-start gap-2 rounded-2xl border bg-card p-4 text-sm">
        <MapPin className="mt-0.5 size-4 text-primary" />
        <span>
          <span className="block font-semibold">Endereço de entrega</span>
          <span className="block text-xs text-muted-foreground">{order.address}</span>
        </span>
      </div>

      <div className="mt-3 rounded-2xl border bg-card p-4 text-sm">
        <p className="font-semibold">Itens</p>
        <ul className="mt-2 space-y-1">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between">
              <span className="text-muted-foreground">
                {i.qty}x {i.name}
              </span>
              <span>{brl(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t pt-2 font-extrabold">
          <span>Total</span>
          <span className="text-primary-dark">{brl(order.total)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Pagamento: {order.payment}</p>
      </div>

      {order.status !== "entregue" && (
        <Button
          variant="outline"
          className="mt-4 w-full rounded-full"
          onClick={() => advanceOrder(order.id)}
        >
          Simular próxima etapa da entrega
        </Button>
      )}
    </div>
  );
}
