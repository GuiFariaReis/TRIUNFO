import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./catalog";

export type CartItem = { id: string; qty: number };
export type User = { name: string; email: string; phone?: string };

export type OrderStatus = "confirmado" | "separacao" | "rota" | "entregue";

export type Order = {
  id: string;
  createdAt: string;
  items: { id: string; name: string; qty: number; price: number }[];
  total: number;
  address: string;
  payment: string;
  status: OrderStatus;
  eta: string;
  courier: string;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

type Ctx = {
  ready: boolean;
  cart: CartItem[];
  cartDetailed: { product: Product; qty: number }[];
  cartCount: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  orders: Order[];
  placeOrder: (data: { address: string; payment: string }) => Order;
  advanceOrder: (id: string) => void;
  notifications: AppNotification[];
  pushEnabled: boolean;
  setPushEnabled: (v: boolean) => void;
  notify: (title: string, body: string) => void;
  markAllRead: () => void;
};

const StoreCtx = createContext<Ctx | null>(null);

const KEY = "triunfo:v1";

const STATUS_FLOW: OrderStatus[] = ["confirmado", "separacao", "rota", "entregue"];

const nextStatus = (s: OrderStatus): OrderStatus =>
  STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(s) + 1, STATUS_FLOW.length - 1)] ?? "entregue";

const statusMessage: Record<OrderStatus, string> = {
  confirmado: "Pedido confirmado",
  separacao: "Seu pedido está sendo separado na loja",
  rota: "Saiu para entrega",
  entregue: "Pedido entregue",
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setCart(s.cart ?? []);
        setUser(s.user ?? null);
        setOrders(s.orders ?? []);
        setNotifications(s.notifications ?? []);
        setPushEnabled(s.pushEnabled ?? false);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      KEY,
      JSON.stringify({ cart, user, orders, notifications, pushEnabled }),
    );
  }, [ready, cart, user, orders, notifications, pushEnabled]);

  const notify = useCallback((title: string, body: string) => {
    setNotifications((n) => [
      { id: crypto.randomUUID(), title, body, createdAt: new Date().toISOString(), read: false },
      ...n,
    ]);
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  }, []);

  const remove = useCallback((id: string) => setCart((c) => c.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((i) => ({ product: getProduct(i.id)!, qty: i.qty }))
        .filter((i) => Boolean(i.product)),
    [cart],
  );

  const subtotal = useMemo(
    () => cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cartDetailed],
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const login = useCallback((email: string, name?: string) => {
    setUser({ name: name || email.split("@")[0] || "Cliente", email });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const placeOrder = useCallback(
    ({ address, payment }: { address: string; payment: string }) => {
      const order: Order = {
        id: "DT" + Math.floor(100000 + Math.random() * 899999),
        createdAt: new Date().toISOString(),
        items: cartDetailed.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          qty: i.qty,
          price: i.product.price,
        })),
        total: subtotal,
        address,
        payment,
        status: "confirmado",
        eta: "40-60 min",
        courier: "Rafael S.",
      };
      setOrders((o) => [order, ...o]);
      setCart([]);
      notify("Pedido confirmado", `Pedido ${order.id} confirmado. Chega em ${order.eta}.`);
      return order;
    },
    [cartDetailed, subtotal, notify],
  );

  const advanceOrder = useCallback((id: string) => {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, status: nextStatus(o.status) } : o)));
  }, []);

  // Rastreio "em tempo real": avança o status do pedido mais recente
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => {
      setOrders((list) => {
        const first = list[0];
        if (!first || first.status === "entregue") return list;
        const next = nextStatus(first.status);
        setNotifications((n) => [
          {
            id: crypto.randomUUID(),
            title: `Pedido ${first.id}`,
            body: statusMessage[next],
            createdAt: new Date().toISOString(),
            read: false,
          },
          ...n,
        ]);
        return [{ ...first, status: next }, ...list.slice(1)];
      });
    }, 25000);
    return () => clearInterval(t);
  }, [ready]);

  const markAllRead = useCallback(
    () => setNotifications((n) => n.map((i) => ({ ...i, read: true }))),
    [],
  );

  const value: Ctx = {
    ready,
    cart,
    cartDetailed,
    cartCount,
    subtotal,
    add,
    setQty,
    remove,
    clearCart,
    user,
    login,
    logout,
    orders,
    placeOrder,
    advanceOrder,
    notifications,
    pushEnabled,
    setPushEnabled,
    notify,
    markAllRead,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}

export const statusLabel: Record<OrderStatus, string> = {
  confirmado: "Pedido confirmado",
  separacao: "Em separação",
  rota: "Saiu para entrega",
  entregue: "Entregue",
};
