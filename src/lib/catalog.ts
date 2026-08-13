export type Category = {
  slug: string;
  name: string;
  icon: string;
  color: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  unit: string;
  image?: string;
  rx?: boolean;
  tags: string[];
  description: string;
};

export const categories: Category[] = [
  { slug: "medicamentos", name: "Medicamentos", icon: "Pill", color: "oklch(0.93 0.05 250)" },
  { slug: "dermocosmeticos", name: "Dermocosméticos", icon: "Sparkles", color: "oklch(0.93 0.05 200)" },
  { slug: "vitaminas", name: "Vitaminas", icon: "Leaf", color: "oklch(0.93 0.05 150)" },
  { slug: "higiene", name: "Higiene", icon: "Droplets", color: "oklch(0.93 0.05 230)" },
  { slug: "mamae-bebe", name: "Mamãe e Bebê", icon: "Baby", color: "oklch(0.94 0.05 30)" },
  { slug: "saude-sexual", name: "Saúde Sexual", icon: "Heart", color: "oklch(0.93 0.05 10)" },
  { slug: "cuidados-diarios", name: "Cuidados Diários", icon: "Stethoscope", color: "oklch(0.93 0.05 280)" },
  { slug: "beleza", name: "Beleza", icon: "Palette", color: "oklch(0.94 0.05 330)" },
];

export const products: Product[] = [
  {
    id: "dipirona-1g",
    name: "Dipirona Monoidratada 1g",
    brand: "Genérico EMS",
    category: "medicamentos",
    price: 12.9,
    oldPrice: 19.9,
    unit: "10 comprimidos",
    image: "/foto_remedio.png",
    tags: ["dor", "febre", "analgésico"],
    description: "Analgésico e antitérmico indicado para dores leves a moderadas e redução da febre.",
  },
  {
    id: "paracetamol-750",
    name: "Paracetamol 750mg",
    brand: "Genérico Medley",
    category: "medicamentos",
    price: 9.9,
    oldPrice: 14.5,
    unit: "20 comprimidos",
    image: "/foto_remedio.png",
    tags: ["dor", "febre", "gripe"],
    description: "Indicado para o alívio temporário de dores e febre.",
  },
  {
    id: "amoxicilina-500",
    name: "Amoxicilina 500mg",
    brand: "Genérico Neo Química",
    category: "medicamentos",
    price: 34.9,
    unit: "21 cápsulas",
    image: "/foto_remedio.png",
    rx: true,
    tags: ["antibiótico", "infecção"],
    description: "Antibiótico de amplo espectro. Venda sob prescrição médica com retenção de receita.",
  },
  {
    id: "losartana-50",
    name: "Losartana Potássica 50mg",
    brand: "Genérico Sandoz",
    category: "medicamentos",
    price: 18.5,
    oldPrice: 26.0,
    unit: "30 comprimidos",
    image: "/foto_remedio.png",
    rx: true,
    tags: ["pressão", "hipertensão", "uso contínuo"],
    description: "Anti-hipertensivo de uso contínuo. Necessário apresentar receita médica.",
  },
  {
    id: "protetor-fps70",
    name: "Protetor Solar Facial FPS 70",
    brand: "Sun Care",
    category: "dermocosmeticos",
    price: 74.9,
    oldPrice: 99.9,
    unit: "50g",
    image: "/produtos/protetor-solar.png",
    tags: ["sol", "rosto", "pele"],
    description: "Alta proteção UVA/UVB com toque seco e efeito antioleosidade por até 12 horas.",
  },
  {
    id: "serum-vitc",
    name: "Sérum Facial Vitamina C 10%",
    brand: "Derma Lab",
    category: "dermocosmeticos",
    price: 119.9,
    unit: "30ml",
    image: "/produtos/serum.png",
    tags: ["antioxidante", "manchas", "skincare"],
    description: "Sérum antioxidante que uniformiza o tom da pele e reduz manchas com uso contínuo.",
  },
  {
    id: "hidratante-corporal",
    name: "Hidratante Corporal Pele Seca",
    brand: "Derma Lab",
    category: "dermocosmeticos",
    price: 49.9,
    oldPrice: 62.0,
    unit: "400ml",
    image: "/produtos/hidratante.png",
    tags: ["hidratante", "corpo"],
    description: "Hidratação intensa por 48 horas com ureia e manteiga de karité.",
  },
  {
    id: "vitamina-d3",
    name: "Vitamina D3 2000UI",
    brand: "VitaMais",
    category: "vitaminas",
    price: 39.9,
    oldPrice: 55.0,
    unit: "60 cápsulas",
    image: "/produtos/vitamina-c.png",
    tags: ["imunidade", "ossos", "suplemento"],
    description: "Suplemento de vitamina D3 para saúde óssea e suporte ao sistema imunológico.",
  },
  {
    id: "polivitaminico",
    name: "Polivitamínico A-Z",
    brand: "VitaMais",
    category: "vitaminas",
    price: 59.9,
    unit: "90 comprimidos",
    image: "/produtos/vitamina-c.png",
    tags: ["energia", "imunidade", "multivitamínico"],
    description: "Complexo com 26 vitaminas e minerais para o dia a dia.",
  },
  {
    id: "omega3",
    name: "Ômega 3 1000mg",
    brand: "VitaMais",
    category: "vitaminas",
    price: 69.9,
    oldPrice: 89.9,
    unit: "120 cápsulas",
    image: "/produtos/omega3.png",
    tags: ["coração", "colesterol"],
    description: "Óleo de peixe purificado, rico em EPA e DHA.",
  },
  {
    id: "creme-dental",
    name: "Creme Dental Branqueador",
    brand: "OralPro",
    category: "higiene",
    price: 14.9,
    unit: "90g",
    image: "/produtos/escova-dental.png",
    tags: ["dente", "bucal"],
    description: "Ação branqueadora com proteção anticárie diária.",
  },
  {
    id: "sabonete-liquido",
    name: "Sabonete Líquido Antibacteriano",
    brand: "CleanCare",
    category: "higiene",
    price: 22.9,
    oldPrice: 29.9,
    unit: "250ml",
    image: "/produtos/alcool-gel.png",
    tags: ["banho", "mãos"],
    description: "Limpeza suave com ação antibacteriana e pH balanceado.",
  },
  {
    id: "alcool-gel",
    name: "Álcool em Gel 70%",
    brand: "CleanCare",
    category: "higiene",
    price: 11.9,
    unit: "500ml",
    image: "/produtos/alcool-gel.png",
    tags: ["higienização", "mãos"],
    description: "Higienizador de mãos com hidratantes na fórmula.",
  },
  {
    id: "fralda-g",
    name: "Fralda Descartável Premium G",
    brand: "BabySoft",
    category: "mamae-bebe",
    price: 79.9,
    oldPrice: 99.9,
    unit: "48 unidades",
    image: "/produtos/fralda.png",
    tags: ["bebê", "fralda"],
    description: "Absorção por até 12 horas com barreira antivazamento.",
  },
  {
    id: "lenco-umedecido",
    name: "Lenços Umedecidos Sem Álcool",
    brand: "BabySoft",
    category: "mamae-bebe",
    price: 19.9,
    unit: "96 unidades",
    image: "/produtos/fralda.png",
    tags: ["bebê", "limpeza"],
    description: "Lenços dermatologicamente testados para a pele sensível do bebê.",
  },
  {
    id: "preservativo",
    name: "Preservativo Ultra Sensível",
    brand: "Protege",
    category: "saude-sexual",
    price: 24.9,
    oldPrice: 32.0,
    unit: "12 unidades",
    image: "/produtos/alcool-gel.png",
    tags: ["prevenção"],
    description: "Preservativo lubrificado de látex natural, ultra fino.",
  },
  {
    id: "teste-gravidez",
    name: "Teste de Gravidez Digital",
    brand: "Confirme",
    category: "saude-sexual",
    price: 34.9,
    unit: "1 unidade",
    image: "/produtos/termometro.png",
    tags: ["teste"],
    description: "Resultado digital em 3 minutos com 99% de precisão.",
  },
  {
    id: "termometro",
    name: "Termômetro Digital Infravermelho",
    brand: "MedCheck",
    category: "cuidados-diarios",
    price: 129.9,
    oldPrice: 179.9,
    unit: "1 unidade",
    image: "/produtos/termometro.png",
    tags: ["febre", "medição"],
    description: "Medição sem contato em 1 segundo, com memória das últimas leituras.",
  },
  {
    id: "aparelho-pressao",
    name: "Medidor de Pressão de Braço",
    brand: "MedCheck",
    category: "cuidados-diarios",
    price: 219.9,
    unit: "1 unidade",
    image: "/produtos/termometro.png",
    tags: ["pressão", "monitoramento"],
    description: "Aparelho automático com detecção de arritmia e memória para 2 usuários.",
  },
  {
    id: "batom-hidratante",
    name: "Batom Hidratante Cor Natural",
    brand: "Bella",
    category: "beleza",
    price: 39.9,
    unit: "1 unidade",
    image: "/produtos/serum.png",
    tags: ["maquiagem", "lábios"],
    description: "Cor leve com manteiga de cacau e vitamina E.",
  },
  {
    id: "shampoo-antiqueda",
    name: "Shampoo Antiqueda Fortalecedor",
    brand: "Bella",
    category: "beleza",
    price: 54.9,
    oldPrice: 69.9,
    unit: "300ml",
    image: "/produtos/shampoo.png",
    tags: ["cabelo", "queda"],
    description: "Fortalece os fios desde a raiz com biotina e cafeína.",
  },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return products
    .map((p) => {
      const haystack = `${p.name} ${p.brand} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (p.name.toLowerCase().startsWith(t)) score += 5;
        if (haystack.includes(t)) score += 3;
        else if (haystack.split(/\W+/).some((w) => w.startsWith(t.slice(0, 4)) && t.length > 3))
          score += 1;
      }
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

export const getProduct = (id: string) => products.find((p) => p.id === id);
