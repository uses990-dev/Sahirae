const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { flowers, sizes, stemCounts, formatPrice } = require("../catalog.js");

const expected = [
  ["Rose", [499, 969, 1879, 2819, 4649, 9249], [549, 1069, 2079, 3119, 5149, 10249], 89, 99],
  ["Tulip", [499, 969, 1879, 2819, 4649, 9249], [549, 1069, 2079, 3119, 5149, 10249], 89, 99],
  ["Sunflower", [699, 1369, 2679, 4019, 6649, 13249], [749, 1469, 2879, 4319, 7149, 14249], 129, 139],
  ["Daisy", [449, 869, 1679, 2519, 4149, 8249], [499, 969, 1879, 2819, 4649, 9249], 79, 89],
  ["Lavender", [649, 1269, 2479, 3719, 6149, 12249], [699, 1369, 2679, 4019, 6649, 13249], 119, 129],
  ["Cherry blossom", [499, 969, 1879, 2819, 4649, 9249], [549, 1069, 2079, 3119, 5149, 10249], 89, 99],
  ["Carnation", [499, 969, 1879, 2819, 4649, 9249], [549, 1069, 2079, 3119, 5149, 10249], 89, 99],
  ["Lily", [799, 1569, 3079, 4619, 7649, 15249], [849, 1669, 3279, 4919, 8149, 16249], 149, 159],
  ["Mini sunflower (Soleil)", [549, 1069, 2079, 3119, 5149, 10249], null, 99, null]
];

test("catalog includes every flower and the exact size/count ordering", () => {
  assert.deepEqual(sizes, ["Mini", "Classic", "Full", "Grand", "Luxe", "Premium Statement"]);
  assert.deepEqual(stemCounts, [5, 10, 20, 30, 50, 100]);
  assert.deepEqual(flowers.map(({ name }) => name), expected.map(([name]) => name));
});

test("every catalog bouquet, glitter and unit price matches the provided price list", () => {
  for (const [name, prices, glitterPrices, unitPrice, unitGlitterPrice] of expected) {
    const flower = flowers.find((item) => item.name === name);
    assert.ok(flower, `${name} is present`);
    assert.deepEqual(flower.prices, prices, `${name} bouquet prices`);
    assert.deepEqual(flower.glitterPrices, glitterPrices, `${name} glitter prices`);
    assert.equal(flower.unitPrice, unitPrice, `${name} unit price`);
    assert.equal(flower.unitGlitterPrice, unitGlitterPrice, `${name} glitter unit price`);
  }
  assert.equal(flowers.find(({ name }) => name === "Mini sunflower (Soleil)").glitterPrices, null);
});

test("price formatting uses Indian rupee grouping", () => {
  assert.equal(formatPrice(10249), "₹10,249");
});

test("catalog declarations are available to a browser classic script", () => {
  const context = {};
  vm.runInNewContext(fs.readFileSync(require.resolve("../catalog.js"), "utf8"), context);
  const browserCatalog = vm.runInContext("({ flowers, sizes, stemCounts, formatPrice })", context);
  assert.equal(browserCatalog.flowers.length, 9);
  assert.deepEqual(Array.from(browserCatalog.sizes), sizes);
  assert.deepEqual(Array.from(browserCatalog.stemCounts), stemCounts);
  assert.equal(browserCatalog.formatPrice(10249), "₹10,249");
});
