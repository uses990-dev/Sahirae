const flowers = [
  { name: "Rose", symbol: "✿", meaning: "Love · passion · appreciation", recipients: "For partners, parents, close friends, or someone you admire.", colors: ["Red", "Pink", "Ivory"], prices: [299, 599, 999, 1599, 2499, 1249] },
  { name: "Tulip", symbol: "❀", meaning: "Perfect love · affection · new beginnings", recipients: "For partners, family, close friends, and fresh starts.", colors: ["Pink", "Yellow", "Purple"], prices: [249, 549, 949, 1549, 2399, 1199] },
  { name: "Sunflower", symbol: "✺", meaning: "Happiness · loyalty · warmth", recipients: "For best friends, siblings, teachers, or a little cheering up.", colors: ["Sunshine yellow"], prices: [349, 649, 949, 1799, 2699, 1399] },
  { name: "Daisy", symbol: "✿", meaning: "Innocence · friendship · cheerfulness", recipients: "For friends, siblings, children, or someone you want to make smile.", colors: ["White", "Pink", "Yellow"], prices: [279, 529, 799, 1599, 2499, 1199] },
  { name: "Lavender", symbol: "❋", meaning: "Calmness · devotion · serenity", recipients: "For someone you love, or anyone who could use a calmer day.", colors: ["Lavender", "Violet"], prices: [399, 699, 1299, 1999, 2999, 1599] },
  { name: "Cherry blossom", symbol: "✾", meaning: "Renewal · beauty · new beginnings", recipients: "For graduates, new jobs, goodbyes, and exciting next chapters.", colors: ["Blush pink", "White"], prices: [299, 549, 799, 1599, 2499, 1199] },
  { name: "Carnation", symbol: "✽", meaning: "Love · gratitude · admiration", recipients: "A lovely appreciation gift for mothers, teachers, friends, or partners.", colors: ["Pink", "Red", "White"], prices: [279, 579, 979, 1579, 2479, 1299] },
  { name: "Lily", symbol: "❀", meaning: "Purity · elegance · devotion", recipients: "For family, partners, and important celebrations.", colors: ["White", "Pink"], prices: [399, 799, 1199, 1999, 2999, 1599] }
];
const sizes = ["Mini", "Medium Classic", "Large Full", "Luxe", "Premium Statement", "Grand"];
const formatPrice = (amount) => `₹${amount.toLocaleString("en-IN")}`;
const flowerGrid = document.querySelector("#flower-grid");
const priceRows = document.querySelector("#price-rows");
const flowerSelect = document.querySelector("#order-flower");
const sizeSelect = document.querySelector("#order-size");

for (const flower of flowers) {
  const card = document.createElement("article");
  card.className = "flower-card";
  card.innerHTML = `<div class="flower-top"><span class="flower-icon" aria-hidden="true">${flower.symbol}</span><span class="flower-from">Bouquets from<strong>${formatPrice(flower.prices[0])}</strong></span></div><h3>${flower.name}</h3><div class="flower-meaning">${flower.meaning}</div><p class="flower-recipient">${flower.recipients}</p><div class="flower-colors" aria-label="Popular color ideas">${flower.colors.map((color) => `<span class="color-chip">${color}</span>`).join("")}</div>`;
  flowerGrid.append(card);
  const row = document.createElement("tr");
  row.innerHTML = `<td>${flower.name}</td>${flower.prices.map((price) => `<td>${formatPrice(price)}</td>`).join("")}`;
  priceRows.append(row);
  const option = document.createElement("option");
  option.value = flower.name;
  option.textContent = flower.name;
  flowerSelect.append(option);
}

for (const [index, size] of sizes.entries()) {
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = size;
  sizeSelect.append(option);
}

function updatePrice() {
  const flower = flowers.find((item) => item.name === flowerSelect.value) ?? flowers[0];
  document.querySelector("#order-price").textContent = formatPrice(flower.prices[Number(sizeSelect.value)]);
}
flowerSelect.addEventListener("change", updatePrice);
sizeSelect.addEventListener("change", updatePrice);

document.querySelector("#order-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const flower = flowers.find((item) => item.name === flowerSelect.value) ?? flowers[0];
  const size = sizes[Number(sizeSelect.value)];
  const color = document.querySelector("#order-color").value.trim();
  const note = `Hi Sahiraé by Sana! I'd love to ask about a ${size} ${flower.name} bouquet${color ? ` in ${color}` : ""} (catalog price ${formatPrice(flower.prices[Number(sizeSelect.value)])}). Please confirm availability and details.`;
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(note);
    status.textContent = "Order note copied! Send it in your preferred messaging app and we’ll confirm the details.";
  } catch {
    status.textContent = note;
  }
});
