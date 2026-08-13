import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronRight, Cross, MapPin, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { categories, searchProducts } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center group">
      <div className="flex items-center justify-center px-2 py-1.5 transition-transform group-hover:scale-105">
        <img
          src="/logo.png"
          alt="Drogaria Triunfo"
          className="h-16 sm:h-22 max-h-24 w-auto object-contain brightness-0 invert"
        />
      </div>
    </Link>
  );
}

function SearchBar({ autoFocusHint }: { autoFocusHint?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const suggestions = q.length > 1 ? searchProducts(q).slice(0, 5) : [];

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) navigate({ to: "/busca", search: { q: q.trim() } });
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={autoFocusHint ?? "Busque por produto, marca ou sintoma"}
          className="h-11 rounded-full border-0 bg-card pl-9 text-sm shadow-sm"
          aria-label="Buscar produtos"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute inset-x-0 top-12 z-50 overflow-hidden rounded-2xl border bg-popover shadow-soft">
          {suggestions.map((p) => (
            <li key={p.id}>
              <Link
                to="/produto/$id"
                params={{ id: p.id }}
                onClick={() => setQ("")}
                className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-muted"
              >
                <span className="line-clamp-1">{p.name}</span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NotificationsSheet() {
  const { notifications, markAllRead, pushEnabled, setPushEnabled } = useStore();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Sheet onOpenChange={(o) => o && markAllRead()}>
      <SheetTrigger asChild>
        <button className="relative text-primary-foreground" aria-label="Notificações">
          <Bell className="size-6" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex min-w-4 justify-center rounded-full bg-promo px-1 text-[10px] font-bold text-promo-foreground">
              {unread}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Notificações</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 overflow-y-auto px-4 pb-6">
          <div className="flex items-center justify-between rounded-2xl bg-primary-soft p-3">
            <div>
              <p className="text-sm font-semibold">Notificações push</p>
              <p className="text-xs text-muted-foreground">Promoções e status do pedido</p>
            </div>
            <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
          </div>
          {notifications.length === 0 && (
            <p className="text-sm text-muted-foreground">Você ainda não tem notificações.</p>
          )}
          {notifications.map((n) => (
            <div key={n.id} className="rounded-2xl border p-3">
              <p className="text-sm font-semibold">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {new Date(n.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CategoryMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-semibold text-primary-foreground">
          <Menu className="size-5" /> Categorias
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>Categorias</SheetTitle>
        </SheetHeader>
        <nav className="px-4 pb-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="flex items-center justify-between border-b py-3 text-sm"
            >
              {c.name}
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const { cartCount, user } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-brand">
      <div className="mx-auto max-w-6xl px-4 pb-3 pt-3">
        {/* Mobile: Category Menu (Left) | Centered Logo (Middle) | Icons (Right) */}
        <div className="relative flex items-center justify-between md:gap-4">
          <div className="flex items-center md:gap-5">
            <span className="md:hidden">
              <CategoryMenu />
            </span>
            <span className="hidden md:block">
              <Logo />
            </span>
            <span className="hidden md:block">
              <CategoryMenu />
            </span>
          </div>

          {/* Centered Logo on Mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:hidden">
            <Logo />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <NotificationsSheet />
            <Link
              to={user ? "/conta" : "/login"}
              className="hidden items-center gap-2 text-sm font-medium text-primary-foreground md:flex"
            >
              <User className="size-5" />
              {user ? user.name.split(" ")[0] : "Entrar"}
            </Link>
            <Link to="/carrinho" className="relative text-primary-foreground" aria-label="Sacola">
              <ShoppingBag className="size-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1 flex min-w-4 justify-center rounded-full bg-promo px-1 text-[10px] font-bold text-promo-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <SearchBar autoFocusHint="Buscar em toda a farmácia" />
        </div>

        <div className="mt-2 flex items-center justify-center sm:justify-start gap-1 text-xs text-primary-foreground/85 truncate">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">Entrega em até 60 min · Serrana - SP</span>
        </div>
      </div>
    </header>
  );
}

export function DesktopFooter() {
  return (
    <footer className="mt-12 border-t bg-card text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-base font-extrabold text-primary-dark">DROGARIA TRIUNFO DE SERRANA</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Farmácia / Drogaria · Beleza, cosméticos e cuidados pessoais. Entrega rápida e atendimento farmacêutico dedicado.
          </p>
          <div className="mt-3 text-xs space-y-1 text-muted-foreground">
            <p><strong>Matriz:</strong> Rua Vicente de Paula Lima, 1545</p>
            <p><strong>Filial 01:</strong> Rua Deolinda Rosa, 1068</p>
            <p>CEP 14150-000 · Serrana - SP</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Institucional & Horários</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Horário de Funcionamento</p>
              <p>Segunda a Sábado: 8h às 22h</p>
              <p>Domingo: 8h às 20h</p>
            </div>
            <ul className="space-y-1 pt-1">
              <li>Sobre nós</li>
              <li>Política de privacidade</li>
              <li>Termos de uso</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Ajuda & Atendimento</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>Central de atendimento</li>
            <li>Trocas e devoluções</li>
            <li>Rastrear pedido</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Informações Legais</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong>CNPJ:</strong> 04.995.669/0001-11</p>
            <p><strong>Farmacêutico Responsável:</strong><br />LEONARDO CONCEIÇÃO DE OLIVEIRA<br />CRF-SP: 106247</p>
            <p><strong>Autorização ANVISA CEVS:</strong><br />355150424-477-000008-1-7</p>
            <p><strong>Certidão de Regularidade CFF:</strong> 38.124</p>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DROGARIA TRIUNFO DE SERRANA · CNPJ 04.995.669/0001-11 · Todos os direitos reservados.
      </div>
      <div className="h-16 md:hidden" />
    </footer>
  );
}

export { Button as _Button };
