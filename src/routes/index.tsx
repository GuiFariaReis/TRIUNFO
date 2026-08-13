import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Baby,
  Clock,
  Droplets,
  Heart,
  Leaf,
  Palette,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Truck,
} from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Drogaria Triunfo — Farmácia online com entrega em até 60 min" },
      {
        name: "description",
        content:
          "Compre medicamentos, dermocosméticos, vitaminas e higiene na Drogaria Triunfo. Ofertas diárias, atendimento farmacêutico e entrega rápida.",
      },
      { property: "og:title", content: "Drogaria Triunfo — Farmácia online" },
      {
        property: "og:description",
        content: "Ofertas diárias, atendimento farmacêutico e entrega em até 60 minutos.",
      },
    ],
  }),
  component: Home,
});

const icons: Record<string, typeof Pill> = {
  Pill,
  Sparkles,
  Leaf,
  Droplets,
  Baby,
  Heart,
  Stethoscope,
  Palette,
};

const banners = [
  {
    type: "image",
    src: "/banners/banner-ninho.png",
    alt: "Ninho Fases — Seu filho nutrido e saudável",
    slug: "mamae-bebe",
  },
  {
    type: "image",
    src: "/banners/banner-loreal.png",
    alt: "Revitalift Laser X3 L'Oréal Paris",
    slug: "dermocosmeticos",
  },
  {
    type: "image",
    src: "/banners/banner-juba.png",
    alt: "Linha Juba Widi Care",
    slug: "dermocosmeticos",
  },
  {
    type: "overlay",
    src: "/banner_40off.png",
    alt: "Ofertas em medicamentos",
    title: "Até 40% OFF em genéricos",
    sub: "Economize no uso contínuo",
    slug: "medicamentos",
  },
  {
    type: "overlay",
    src: "/banner2.png",
    alt: "Dermocosméticos",
    title: "Dermo com 30% OFF",
    sub: "Proteção solar e skincare",
    slug: "dermocosmeticos",
  },
  {
    type: "image",
    src: "/bannerentrega.png",
    alt: "Entrega rápida",
    slug: "medicamentos",
  },
];

function Home() {
  const ofertas = products.filter((p) => p.oldPrice);
  const maisVendidos = products.slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Banners */}
      <section className="pt-4">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {banners.map((b, i) => (
              <CarouselItem key={b.alt + i}>
                {b.type === "image" ? (
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: b.slug }}
                    className="block overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm transition-transform hover:scale-[1.005]"
                  >
                    <img
                      src={b.src}
                      alt={b.alt}
                      width={1600}
                      height={700}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="aspect-[2.4/1] w-full object-cover sm:aspect-auto sm:h-56 md:h-72"
                    />
                  </Link>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
                    <img
                      src={b.src}
                      alt={b.alt}
                      width={1600}
                      height={700}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="aspect-[2.4/1] w-full object-cover sm:aspect-auto sm:h-56 md:h-72"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/85 via-primary-dark/40 to-transparent" />
                    <div className="absolute inset-y-0 left-0 flex max-w-[70%] flex-col justify-center gap-1 p-4 sm:p-5 text-primary-foreground">
                      <p className="text-base font-extrabold leading-tight sm:text-2xl">{b.title}</p>
                      <p className="text-[11px] opacity-90 sm:text-sm">{b.sub}</p>
                      <Link
                        to="/categoria/$slug"
                        params={{ slug: b.slug }}
                        className="mt-1.5 w-fit rounded-full bg-card px-3 py-1 text-[11px] font-semibold text-primary-dark sm:mt-2 sm:px-4 sm:py-1.5 sm:text-xs"
                      >
                        Ver ofertas
                      </Link>
                    </div>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* Selos */}
      <section className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
        {[
          { icon: Truck, text: "Entrega em 60 min" },
          { icon: ShieldCheck, text: "Farmácia licenciada" },
          { icon: Clock, text: "Atendimento 7h-22h" },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex shrink-0 items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-medium"
          >
            <Icon className="size-4 text-primary" /> {text}
          </div>
        ))}
      </section>

      {/* Categorias */}
      <section className="mt-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold">Categorias</h2>
          <Link to="/categorias" className="text-sm font-semibold text-primary">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8 sm:gap-2">
          {categories.map((c) => {
            const Icon = icons[c.icon] ?? Pill;
            return (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="flex flex-col items-center justify-between gap-1.5 rounded-2xl border bg-card p-1.5 text-center transition-shadow hover:shadow-soft sm:p-2"
              >
                <span
                  className="flex size-10 items-center justify-center rounded-2xl sm:size-12"
                  style={{ backgroundColor: c.color }}
                >
                  <Icon className="size-5 text-primary-dark sm:size-6" />
                </span>
                <span className="px-0.5 text-[10px] font-semibold leading-tight text-center break-words line-clamp-2 sm:text-[11px]">
                  {c.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ofertas */}
      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold">Ofertas do dia</h2>
          <span className="rounded-full bg-promo/10 px-2 py-1 text-xs font-bold text-promo">
            Só hoje
          </span>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:px-0">
          {ofertas.map((p) => (
            <ProductCard key={p.id} product={p} className="w-40 shrink-0 md:w-auto" />
          ))}
        </div>
      </section>

      {/* Banner secundário */}
      <section className="mt-8 overflow-hidden rounded-3xl bg-brand p-5 text-primary-foreground">
        <p className="text-sm font-semibold opacity-90">Programa Triunfo Mais</p>
        <h3 className="mt-1 text-xl font-extrabold">Descontos exclusivos em uso contínuo</h3>
        <p className="mt-1 text-sm opacity-90">
          Cadastre-se grátis e receba avisos de promoção direto no celular.
        </p>
        <Link
          to="/cadastro"
          className="mt-3 inline-block rounded-full bg-card px-4 py-2 text-sm font-bold text-primary-dark"
        >
          Criar conta grátis
        </Link>
      </section>

      {/* Mais vendidos */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-extrabold">Mais vendidos</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {maisVendidos.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
