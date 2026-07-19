export type ProductCategory =
  | "hardware"
  | "tools"
  | "home"
  | "kitchen"
  | "outdoor";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  inStock: boolean;
  aisle: string;
  summary: string;
};

export const store = {
  name: "Northside Supply Co.",
  shortName: "Northside Supply",
  phone: "(586) 555-0163",
  phoneHref: "tel:+15865550163",
  email: "hello@northsidesupply.demo",
  address: "130 South Main Street, Romeo, MI 48065",
  hours: "Mon–Sat 8am–6pm · Sun 10am–4pm",
  tagline: "Hardware, home goods, and the odd thing you can't find anywhere else.",
};

export const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hardware", label: "Hardware" },
  { id: "tools", label: "Tools" },
  { id: "home", label: "Home" },
  { id: "kitchen", label: "Kitchen" },
  { id: "outdoor", label: "Outdoor" },
];

export const categoryLabels: Record<ProductCategory, string> = {
  hardware: "Hardware",
  tools: "Tools",
  home: "Home",
  kitchen: "Kitchen",
  outdoor: "Outdoor",
};

export const products: Product[] = [
  {
    id: "brass-hinge",
    name: "Solid Brass Door Hinge",
    sku: "NS-1042",
    category: "hardware",
    price: 18,
    inStock: true,
    aisle: "A3",
    summary: "3.5\" ball-bearing hinge. Warm brass finish for interior doors.",
  },
  {
    id: "cabinet-pulls",
    name: "Matte Black Cabinet Pulls",
    sku: "NS-1188",
    category: "hardware",
    price: 9,
    inStock: true,
    aisle: "A3",
    summary: "5\" center-to-center. Sold individually — match your kitchen set.",
  },
  {
    id: "wood-screws",
    name: "Assorted Wood Screw Bin",
    sku: "NS-0901",
    category: "hardware",
    price: 6,
    inStock: true,
    aisle: "A1",
    summary: "Grab-bag of #6–#10 screws. Refilled every Monday.",
  },
  {
    id: "claw-hammer",
    name: "16oz Hickory Claw Hammer",
    sku: "NS-2204",
    category: "tools",
    price: 32,
    inStock: true,
    aisle: "B2",
    summary: "Balanced head, shock-reducing hickory handle.",
  },
  {
    id: "tape-measure",
    name: "25ft Locking Tape Measure",
    sku: "NS-2219",
    category: "tools",
    price: 14,
    inStock: true,
    aisle: "B2",
    summary: "High-contrast markings. Survives a drop off the ladder.",
  },
  {
    id: "hand-saw",
    name: "Japanese Pull Saw",
    sku: "NS-2280",
    category: "tools",
    price: 28,
    inStock: false,
    aisle: "B2",
    summary: "Fine crosscut. Backordered — call to reserve the next shipment.",
  },
  {
    id: "wool-blanket",
    name: "Hudson Bay Style Throw",
    sku: "NS-3401",
    category: "home",
    price: 78,
    inStock: true,
    aisle: "C1",
    summary: "Heavy wool blend in mustard stripe. Couch or cabin ready.",
  },
  {
    id: "ceramic-vase",
    name: "Stoneware Bud Vase",
    sku: "NS-3444",
    category: "home",
    price: 22,
    inStock: true,
    aisle: "C1",
    summary: "Hand-glazed, soft oatmeal finish. One-of-a-kind glaze runs.",
  },
  {
    id: "scented-candle",
    name: "Cedar & Smoke Candle",
    sku: "NS-3510",
    category: "home",
    price: 26,
    inStock: true,
    aisle: "C2",
    summary: "Soy blend, 40-hour burn. Smells like a woodstove without the ash.",
  },
  {
    id: "cast-skillet",
    name: "10\" Cast Iron Skillet",
    sku: "NS-4102",
    category: "kitchen",
    price: 45,
    inStock: true,
    aisle: "D1",
    summary: "Pre-seasoned. The pan your grandparents still swear by.",
  },
  {
    id: "enamel-mug",
    name: "Speckled Enamel Camp Mug",
    sku: "NS-4120",
    category: "kitchen",
    price: 12,
    inStock: true,
    aisle: "D1",
    summary: "12oz. Survives the porch, the boat, and the dishwasher.",
  },
  {
    id: "maple-cutting",
    name: "Michigan Maple Cutting Board",
    sku: "NS-4188",
    category: "kitchen",
    price: 54,
    inStock: false,
    aisle: "D1",
    summary: "Local mill end-grain board. Next batch arrives mid-month.",
  },
  {
    id: "garden-trowel",
    name: "Forged Garden Trowel",
    sku: "NS-5105",
    category: "outdoor",
    price: 24,
    inStock: true,
    aisle: "E2",
    summary: "One-piece forged steel with ash handle. Digs through clay.",
  },
  {
    id: "bird-feeder",
    name: "Cedar Platform Bird Feeder",
    sku: "NS-5172",
    category: "outdoor",
    price: 36,
    inStock: true,
    aisle: "E2",
    summary: "Untreated cedar. Hang it and watch the cardinals argue.",
  },
  {
    id: "work-gloves",
    name: "Leather Palm Work Gloves",
    sku: "NS-5220",
    category: "outdoor",
    price: 16,
    inStock: true,
    aisle: "E1",
    summary: "Sized S–XL. Good for splitting wood or hauling mulch.",
  },
  {
    id: "twine-spool",
    name: "Mustard Cotton Twine Spool",
    sku: "NS-0908",
    category: "hardware",
    price: 8,
    inStock: true,
    aisle: "A2",
    summary: "200ft. Packages, tomato vines, and gift wrap that looks intentional.",
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function filterProducts(
  items: Product[],
  {
    query,
    category,
    inStockOnly,
  }: {
    query: string;
    category: ProductCategory | "all";
    inStockOnly: boolean;
  },
): Product[] {
  const q = query.trim().toLowerCase();

  return items.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (inStockOnly && !product.inStock) return false;
    if (!q) return true;

    const haystack = [
      product.name,
      product.sku,
      product.summary,
      categoryLabels[product.category],
      product.aisle,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}
