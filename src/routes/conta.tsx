import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, MapPin, Package, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Minha conta — Drogaria Triunfo" },
      { name: "description", content: "Gerencie seus dados, endereços e preferências de notificação." },
      { property: "og:title", content: "Minha conta — Drogaria Triunfo" },
      { property: "og:description", content: "Seus dados, pedidos e notificações em um só lugar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, logout, orders, pushEnabled, setPushEnabled, notify } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16 text-center">
        <User className="mx-auto size-12 text-muted-foreground" strokeWidth={1.5} />
        <h1 className="mt-4 text-xl font-extrabold">Entre na sua conta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Para ver pedidos, endereços e ofertas personalizadas.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/cadastro">Criar conta</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-5">
      <div className="flex items-center gap-3 rounded-2xl bg-brand p-4 text-primary-foreground">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-foreground/15 text-lg font-bold">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="font-bold">{user.name}</p>
          <p className="text-xs opacity-85">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Link to="/pedidos" className="flex items-center gap-3 rounded-2xl border bg-card p-4 text-sm font-semibold">
          <Package className="size-5 text-primary" /> Meus pedidos
          <span className="ml-auto text-xs text-muted-foreground">{orders.length}</span>
        </Link>
        <div className="flex items-center gap-3 rounded-2xl border bg-card p-4 text-sm">
          <MapPin className="size-5 text-primary" />
          <span>
            <span className="block font-semibold">Endereço principal</span>
            <span className="block text-xs text-muted-foreground">
              Rua Vicente de Paula Lima, 1545 · Matriz · Serrana - SP
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
          <Bell className="size-5 text-primary" />
          <span className="flex-1">
            <span className="block text-sm font-semibold">Notificações push</span>
            <span className="block text-xs text-muted-foreground">Promoções e status do pedido</span>
          </span>
          <Switch
            checked={pushEnabled}
            onCheckedChange={(v) => {
              setPushEnabled(v);
              if (v) notify("Notificações ativadas", "Você receberá promoções e status dos pedidos.");
            }}
          />
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-5 w-full rounded-full"
        onClick={() => {
          logout();
          navigate({ to: "/" });
        }}
      >
        <LogOut className="size-4" /> Sair da conta
      </Button>
    </div>
  );
}
