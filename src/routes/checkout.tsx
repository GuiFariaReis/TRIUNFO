import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Banknote, CheckCircle2, CreditCard, QrCode } from "lucide-react";
import { brl } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout rápido — Drogaria Triunfo" },
      { name: "description", content: "Finalize seu pedido em 3 passos com Pix, cartão ou pagamento na entrega." },
      { property: "og:title", content: "Checkout — Drogaria Triunfo" },
      { property: "og:description", content: "Pagamento em poucos toques e entrega em até 60 minutos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const payments = [
  { id: "pix", label: "Pix", hint: "Aprovação imediata", icon: QrCode },
  { id: "credito", label: "Cartão de crédito", hint: "Até 3x sem juros", icon: CreditCard },
  { id: "entrega", label: "Pagar na entrega", hint: "Dinheiro ou maquininha", icon: Banknote },
];

function CheckoutPage() {
  const { cartDetailed, subtotal, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [cep, setCep] = useState("14150-000");
  const [rua, setRua] = useState("Rua Vicente de Paula Lima, 1545");
  const [complemento, setComplemento] = useState("Matriz");
  const [payment, setPayment] = useState("pix");

  const frete = subtotal >= 99 ? 0 : 9.9;
  const total = subtotal + frete;

  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-xl font-extrabold">Nada para finalizar</h1>
        <Button asChild className="mt-4 rounded-full">
          <Link to="/">Ver produtos</Link>
        </Button>
      </div>
    );
  }

  const steps = ["Entrega", "Pagamento", "Revisão"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-5">
      <h1 className="text-xl font-extrabold">Checkout rápido</h1>

      <ol className="mt-4 flex gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            <span className={`mt-1 block text-[11px] ${i <= step ? "font-semibold text-primary" : "text-muted-foreground"}`}>
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-5 space-y-4 rounded-2xl border bg-card p-4">
        {step === 0 && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" value={cep} onChange={(e) => setCep(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="rua">Endereço</Label>
                <Input id="rua" value={rua} onChange={(e) => setRua(e.target.value)} className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="comp">Complemento</Label>
                <Input id="comp" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="mt-1" />
              </div>
            </div>
            <p className="rounded-xl bg-primary-soft p-3 text-xs">
              Entrega expressa estimada: <strong>40-60 minutos</strong>
            </p>
          </>
        )}

        {step === 1 && (
          <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
            {payments.map(({ id, label, hint, icon: Icon }) => (
              <Label
                key={id}
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 ${
                  payment === id ? "border-primary bg-primary-soft" : ""
                }`}
              >
                <RadioGroupItem id={id} value={id} />
                <Icon className="size-5 text-primary" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-muted-foreground">{hint}</span>
                </span>
              </Label>
            ))}
          </RadioGroup>
        )}

        {step === 2 && (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Entrega</p>
              <p>{rua}, {complemento} · {cep}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Pagamento</p>
              <p>{payments.find((p) => p.id === payment)?.label}</p>
            </div>
            <ul className="space-y-1 border-t pt-2">
              {cartDetailed.map(({ product, qty }) => (
                <li key={product.id} className="flex justify-between">
                  <span className="text-muted-foreground">{qty}x {product.name}</span>
                  <span>{brl(product.price * qty)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-1 border-t pt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Entrega</span>
            <span>{frete === 0 ? "Grátis" : brl(frete)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold">
            <span>Total</span>
            <span className="text-primary-dark">{brl(total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {step > 0 && (
          <Button variant="outline" className="rounded-full" onClick={() => setStep((s) => s - 1)}>
            Voltar
          </Button>
        )}
        <Button
          size="lg"
          className="flex-1 rounded-full"
          onClick={() => {
            if (step < 2) return setStep((s) => s + 1);
            const order = placeOrder({
              address: `${rua}, ${complemento} · ${cep}`,
              payment: payments.find((p) => p.id === payment)?.label ?? "Pix",
            });
            navigate({ to: "/pedidos/$id", params: { id: order.id } });
          }}
        >
          {step < 2 ? "Continuar" : (
            <>
              <CheckCircle2 className="size-4" /> Confirmar pedido
            </>
          )}
        </Button>
      </div>

      {!user && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Compre como visitante ou{" "}
          <Link to="/login" className="font-semibold text-primary">
            entre na sua conta
          </Link>{" "}
          para salvar endereços.
        </p>
      )}
    </div>
  );
}
