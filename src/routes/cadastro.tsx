import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — Drogaria Triunfo" },
      { name: "description", content: "Cadastro simplificado: nome, e-mail e celular. Leva menos de um minuto." },
      { property: "og:title", content: "Criar conta — Drogaria Triunfo" },
      { property: "og:description", content: "Cadastro rápido para acompanhar pedidos e receber promoções." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { login, setPushEnabled } = useStore();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [push, setPush] = useState(true);

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <h1 className="text-xl font-extrabold">Criar conta</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Só três campos. Sem burocracia.
      </p>

      <form
        className="mt-6 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nome || !email) {
            toast.error("Informe nome e e-mail");
            return;
          }
          login(email, nome);
          setPushEnabled(push);
          toast.success("Conta criada!", { description: "Você já pode comprar." });
          navigate({ to: "/conta" });
        }}
      >
        <div>
          <Label htmlFor="nome">Nome completo</Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="tel">Celular</Label>
          <Input id="tel" value={tel} onChange={(e) => setTel(e.target.value)} className="mt-1" placeholder="(11) 90000-0000" />
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <Checkbox checked={push} onCheckedChange={(v) => setPush(Boolean(v))} className="mt-0.5" />
          Quero receber notificações de promoções e status dos meus pedidos.
        </label>
        <Button type="submit" size="lg" className="w-full rounded-full">
          Criar conta
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Entrar
        </Link>
      </p>
    </div>
  );
}
