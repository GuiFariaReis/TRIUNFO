import { Link } from "@tanstack/react-router";
import { Plus, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { brl, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { add } = useStore();
  const off = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-card p-3 transition-shadow hover:shadow-soft",
        className,
      )}
    >
      {off > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-promo px-2 py-0.5 text-[11px] font-bold text-promo-foreground">
          -{off}%
        </span>
      )}
      <Link
        to="/produto/$id"
        params={{ id: product.id }}
        className="flex flex-1 flex-col"
        aria-label={product.name}
      >
        <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-2 border border-slate-100 shadow-2xs group-hover:border-primary/20 transition-colors">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ShoppingBasket className="size-10 text-primary/50" strokeWidth={1.5} />
          )}
        </div>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{product.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.unit}</p>
        <div className="mt-auto pt-2">
          {product.oldPrice && (
            <span className="block text-xs text-muted-foreground line-through">
              {brl(product.oldPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-primary-dark">{brl(product.price)}</span>
        </div>
      </Link>
      <Button
        size="sm"
        className="mt-2 w-full rounded-xl"
        onClick={() => {
          add(product.id);
          toast.success("Adicionado à sacola", { description: product.name });
        }}
      >
        <Plus className="size-4" /> Adicionar
      </Button>
    </div>
  );
}
