import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Cross } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Drogaria Triunfo" },
      { name: "description", content: "Acesse sua conta para acompanhar pedidos e ofertas exclusivas." },
      { property: "og:title", content: "Entrar — Drogaria Triunfo" },
      { property: "og:description", content: "Login simplificado na Drogaria Triunfo." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
        <Cross className="size-7" />
      </div>
      <h1 className="text-center text-xl font-extrabold">Entrar na sua conta</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Acompanhe pedidos, rastreie entregas e receba promoções.
      </p>

      <form
        className="mt-6 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email || !senha) {
            toast.error("Preencha e-mail e senha");
            return;
          }
          login(email);
          toast.success("Bem-vindo de volta!");
          navigate({ to: "/conta" });
        }}
      >
        <div>
          <Label htmlFor="email">E-mail ou CPF</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="voce@email.com" />
        </div>
        <div>
          <Label htmlFor="senha">Senha</Label>
          <Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="mt-1" placeholder="••••••" />
        </div>
        <Button type="submit" size="lg" className="w-full rounded-full">
          Entrar
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link to="/cadastro" className="font-semibold text-primary">
          Cadastre-se em 1 minuto
        </Link>
      </p>
    </div>
  );
}
