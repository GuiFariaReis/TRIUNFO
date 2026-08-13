import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Package, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/store";

const items = [
  { to: "/", label: "Início", icon: Home },
  { to: "/categorias", label: "Categorias", icon: LayoutGrid },
  { to: "/carrinho", label: "Sacola", icon: ShoppingBag },
  { to: "/pedidos", label: "Pedidos", icon: Package },
  { to: "/conta", label: "Conta", icon: User },
] as const;

export function BottomNav() {
  const { cartCount } = useStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-lg items-stretch">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2 text-[11px] text-muted-foreground"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: to === "/" }}
            >
              <span className="relative">
                <Icon className="size-5" />
                {to === "/carrinho" && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex min-w-4 justify-center rounded-full bg-promo px-1 text-[10px] font-bold text-promo-foreground">
                    {cartCount}
                  </span>
                )}
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
