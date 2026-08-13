import { useEffect, useRef, useState } from "react";
import { Headset, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { from: "bot" | "me"; text: string };

const QUICK = ["Rastrear pedido", "Falar com farmacêutico", "Formas de pagamento", "Trocas e devoluções"];

function reply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("rastre") || t.includes("pedido"))
    return "Você pode acompanhar a entrega em tempo real na aba Pedidos. Se preferir, me informe o número do pedido (ex.: DT123456).";
  if (t.includes("farmac") || t.includes("receita") || t.includes("remédio"))
    return "Nossa farmacêutica Dra. Camila responde em instantes. Enquanto isso, medicamentos com tarja exigem receita no ato da entrega.";
  if (t.includes("pagamento") || t.includes("pix") || t.includes("cart"))
    return "Aceitamos Pix (aprovação imediata), cartão de crédito em até 3x sem juros e pagamento na entrega.";
  if (t.includes("troca") || t.includes("devolu"))
    return "Trocas em até 7 dias para produtos lacrados. É só me enviar o número do pedido que eu abro a solicitação.";
  if (t.includes("entrega") || t.includes("frete"))
    return "Entregamos em até 60 minutos na região e o frete é grátis acima de R$ 99,00.";
  return "Certo! Já encaminhei para nossa equipe de atendimento. Posso ajudar em algo mais enquanto isso?";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Olá! Aqui é a Drogaria Triunfo. Como posso ajudar você hoje?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { from: "me", text: value }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: reply(value) }]), 700);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir chat de atendimento"
          className="fixed bottom-20 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-soft transition-transform active:scale-95 md:bottom-6"
        >
          <Headset className="size-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[80vh] w-full flex-col overflow-hidden rounded-t-3xl border bg-card shadow-soft sm:bottom-6 sm:right-6 sm:h-[520px] sm:w-[380px] sm:rounded-3xl">
          <header className="flex items-center gap-3 bg-brand px-4 py-3 text-primary-foreground">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
              <Headset className="size-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Atendimento Triunfo</p>
              <p className="text-xs opacity-80">Online agora · resposta em ~1 min</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar chat">
              <X className="size-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/40 p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "me"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground shadow-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t bg-card px-3 py-2">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="whitespace-nowrap rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t bg-card p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua mensagem..."
              className="rounded-full"
            />
            <Button type="submit" size="icon" className="rounded-full" aria-label="Enviar">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
