# Sahiraé by Sana

A small, responsive storefront for handmade flower bouquets and bouquet keychains. The flower guide helps visitors choose a bloom by its meaning, with bouquet sizes, catalog prices, color ideas, and a WhatsApp order builder.

## Run locally

```sh
npm run dev
```

This starts a static preview at `http://localhost:3000` (Python 3 is required; there are no npm dependencies).

## Project structure

- `index.html` — storefront sections and order form
- `styles.css` — responsive layout and visual styles
- `catalog.js` — flower descriptions, color names, bouquet and glitter prices
- `app.js` — storefront rendering and order interaction
- `tests/catalog.test.js` — catalog pricing and size-order regression tests
- `images/` — product photos used on the page

The keepsake gallery shows seven product styles from the supplied photos, grouping the two bouquet-keychain images together. The contact section uses the supplied logo, a click-to-call number, and an Instagram QR image.
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow

## Bouquet price list

Prices are transcribed from the supplied bouquet catalog and shown in Indian rupees (₹). Each size contains the listed number of stems. Glitter prices are shown separately; the Soleil mini sunflower option has no glitter price listed.

| Flower | Mini (5) | Classic (10) | Full (20) | Grand (30) | Luxe (50) | Premium Statement (100) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Rose | ₹499 / ₹549 glitter | ₹969 / ₹1,069 glitter | ₹1,879 / ₹2,079 glitter | ₹2,819 / ₹3,119 glitter | ₹4,649 / ₹5,149 glitter | ₹9,249 / ₹10,249 glitter |
| Tulip | ₹499 / ₹549 glitter | ₹969 / ₹1,069 glitter | ₹1,879 / ₹2,079 glitter | ₹2,819 / ₹3,119 glitter | ₹4,649 / ₹5,149 glitter | ₹9,249 / ₹10,249 glitter |
| Sunflower | ₹699 / ₹749 glitter | ₹1,369 / ₹1,469 glitter | ₹2,679 / ₹2,879 glitter | ₹4,019 / ₹4,319 glitter | ₹6,649 / ₹7,149 glitter | ₹13,249 / ₹14,249 glitter |
| Daisy | ₹449 / ₹499 glitter | ₹869 / ₹969 glitter | ₹1,679 / ₹1,879 glitter | ₹2,519 / ₹2,819 glitter | ₹4,149 / ₹4,649 glitter | ₹8,249 / ₹9,249 glitter |
| Lavender | ₹649 / ₹699 glitter | ₹1,269 / ₹1,369 glitter | ₹2,479 / ₹2,679 glitter | ₹3,719 / ₹4,019 glitter | ₹6,149 / ₹6,649 glitter | ₹12,249 / ₹13,249 glitter |
| Cherry blossom | ₹499 / ₹549 glitter | ₹969 / ₹1,069 glitter | ₹1,879 / ₹2,079 glitter | ₹2,819 / ₹3,119 glitter | ₹4,649 / ₹5,149 glitter | ₹9,249 / ₹10,249 glitter |
| Carnation | ₹499 / ₹549 glitter | ₹969 / ₹1,069 glitter | ₹1,879 / ₹2,079 glitter | ₹2,819 / ₹3,119 glitter | ₹4,649 / ₹5,149 glitter | ₹9,249 / ₹10,249 glitter |
| Lily | ₹799 / ₹849 glitter | ₹1,569 / ₹1,669 glitter | ₹3,079 / ₹3,279 glitter | ₹4,619 / ₹4,919 glitter | ₹7,649 / ₹8,149 glitter | ₹15,249 / ₹16,249 glitter |
| Mini sunflower (Soleil) | ₹549 | ₹1,069 | ₹2,079 | ₹3,119 | ₹5,149 | ₹10,249 |

Each cell lists the standard price followed by the glitter price where available. Per-stem prices are: Rose, Tulip, Cherry blossom, and Carnation ₹89 (₹99 with glitter); Sunflower ₹129 (₹139 with glitter); Daisy ₹79 (₹89 with glitter); Lavender ₹119 (₹129 with glitter); Lily ₹149 (₹159 with glitter); Mini sunflower (Soleil) ₹99. Soleil glitter pricing is not listed. Bouquet keychain prices are also not listed and should be confirmed directly. Flower colors are suggestions, not a live inventory list.

## WhatsApp ordering and delivery address

Customers can send an order to **+91 70390 06392** on WhatsApp. Include a typed delivery address; sharing a location pin is optional and should only happen when the customer explicitly chooses to share it and grants location permission. A location pin does not replace the typed address. The customer should review and confirm the order and address before sending. The site does not automatically geocode or verify addresses or locations.

## Verification

Run `npm test` for the exact catalog price and size/count regression tests. No npm packages are required.

With the managed preview running and the `agent-browser` CLI available:

```sh
agent-browser open http://127.0.0.1:3000/
agent-browser eval --stdin < tests/order.browser.js
```

The browser checks use synthetic customer details and mocked location/clipboard results. They verify pricing, required address confirmation, WhatsApp recipient/message encoding, location errors and cancellation, stale-order invalidation, and copying. They do not send any WhatsApp messages.

## Public hosting

The public storefront is at `https://uses990-dev.github.io/Sahirae/`. GitHub Pages can serve these static files directly from `main` at the repository root (the current hosting configuration). The repository also includes an Actions deployment workflow; to use that instead, select **Build and deployment → Source: GitHub Actions** in Pages settings. Both paths include `catalog.js` alongside `app.js`.

## Browser cache compatibility

`index.html` versions `catalog.js`, `app.js` and `styles.css` with the first 12 characters of each file’s SHA-256 hash. After editing one of those files, update its `?v=` value in the HTML. `npm test` checks the hashes so a release cannot accidentally reuse an old browser cache entry. This prevents the pre-catalog app script from conflicting with the new catalog declarations. A loading notice provides a refresh link and direct WhatsApp fallback if scripts fail to initialize.

Flower cards have explicit selection buttons. Location requests prefer an available network-based fix rather than requiring high accuracy; the customer must still review the pin and accuracy. Chrome users who deny location get instructions to restore permission. The site cannot override device permissions or guarantee a GPS fix.
