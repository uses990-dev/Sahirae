const sizes = ["Mini", "Classic", "Full", "Grand", "Luxe", "Premium Statement"];
const stemCounts = [5, 10, 20, 30, 50, 100];

const flowers = [
  {
    name: "Rose",
    symbol: "✿",
    meaning: "Love · passion · appreciation",
    recipients: "For partners, parents, close friends, or someone you admire.",
    colors: ["Amore (Red)", "Solara (Yellow)", "Primavera (Pink)", "Amity (White)", "Serenity (Purple)", "Valor (Orange)", "Aurelia (Blue)", "Élan (Peach)"],
    prices: [499, 969, 1879, 2819, 4649, 9249],
    glitterPrices: [549, 1069, 2079, 3119, 5149, 10249],
    unitPrice: 89,
    unitGlitterPrice: 99
  },
  {
    name: "Tulip",
    symbol: "❀",
    meaning: "Perfect love · affection · new beginnings",
    recipients: "For partners, family, close friends, and fresh starts.",
    colors: ["Fiore (Red)", "Dolce (Pink)", "Gioia (Yellow)", "Purezza (White)", "Regale (Purple)"],
    prices: [499, 969, 1879, 2819, 4649, 9249],
    glitterPrices: [549, 1069, 2079, 3119, 5149, 10249],
    unitPrice: 89,
    unitGlitterPrice: 99
  },
  {
    name: "Sunflower",
    symbol: "✺",
    meaning: "Happiness · loyalty · warmth",
    recipients: "For best friends, siblings, teachers, or a little cheering up.",
    colors: ["Luce (Classic yellow)", "Aria (Orange)"],
    prices: [699, 1369, 2679, 4019, 6649, 13249],
    glitterPrices: [749, 1469, 2879, 4319, 7149, 14249],
    unitPrice: 129,
    unitGlitterPrice: 139
  },
  {
    name: "Daisy",
    symbol: "✿",
    meaning: "Innocence · friendship · cheerfulness",
    recipients: "For friends, siblings, children, or someone you want to make smile.",
    colors: ["Innocenza (White)", "Fiora (Pink)", "Allegra (Yellow)", "Serena (Mixed)"],
    prices: [449, 869, 1679, 2519, 4149, 8249],
    glitterPrices: [499, 969, 1879, 2819, 4649, 9249],
    unitPrice: 79,
    unitGlitterPrice: 89
  },
  {
    name: "Lavender",
    symbol: "❋",
    meaning: "Calmness · devotion · serenity",
    recipients: "For someone you love, or anyone who could use a calmer day.",
    colors: ["Calma (Purple)", "Amoretta (Pink)", "Velata (White)"],
    prices: [649, 1269, 2479, 3719, 6149, 12249],
    glitterPrices: [699, 1369, 2679, 4019, 6649, 13249],
    unitPrice: 119,
    unitGlitterPrice: 129
  },
  {
    name: "Cherry blossom",
    symbol: "✾",
    meaning: "Renewal · beauty · new beginnings",
    recipients: "For graduates, new jobs, goodbyes, and exciting next chapters.",
    colors: ["Sakura (Soft pink)", "Hanami (White)", "Akari (Darker pink)"],
    prices: [499, 969, 1879, 2819, 4649, 9249],
    glitterPrices: [549, 1069, 2079, 3119, 5149, 10249],
    unitPrice: 89,
    unitGlitterPrice: 99
  },
  {
    name: "Carnation",
    symbol: "✽",
    meaning: "Love · gratitude · admiration",
    recipients: "A lovely appreciation gift for mothers, teachers, friends, or partners.",
    colors: ["Velour (Red)", "Gratitude (Pink)", "Grace (White)", "Mellow (Yellow)", "Mystique (Purple)"],
    prices: [499, 969, 1879, 2819, 4649, 9249],
    glitterPrices: [549, 1069, 2079, 3119, 5149, 10249],
    unitPrice: 89,
    unitGlitterPrice: 99
  },
  {
    name: "Lily",
    symbol: "❀",
    meaning: "Purity · elegance · devotion",
    recipients: "For family, partners, and important celebrations.",
    colors: ["Étoile (White)", "Roselle (Pink)", "Fervor (Orange)", "Soleia (Yellow)"],
    prices: [799, 1569, 3079, 4619, 7649, 15249],
    glitterPrices: [849, 1669, 3279, 4919, 8149, 16249],
    unitPrice: 149,
    unitGlitterPrice: 159
  },
  {
    name: "Mini sunflower (Soleil)",
    symbol: "✺",
    meaning: "Happiness · loyalty · warmth",
    recipients: "For best friends, siblings, teachers, or a little cheering up.",
    colors: ["Soleil (Mini sunflower)"],
    prices: [549, 1069, 2079, 3119, 5149, 10249],
    glitterPrices: null,
    unitPrice: 99,
    unitGlitterPrice: null
  }
];

const formatPrice = (amount) => `₹${amount.toLocaleString("en-IN")}`;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { flowers, sizes, stemCounts, formatPrice };
}
