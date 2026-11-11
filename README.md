# Sahiraé by Sana

A small, responsive storefront for handmade flower bouquets and bouquet keychains. The flower guide helps visitors choose a bloom by its meaning, with bouquet sizes, catalog prices, color ideas, and an order-note helper.

## Run locally

```sh
npm run dev
```

This starts a static preview at `http://localhost:3000` (Python 3 is required; there are no npm dependencies).

## Project structure

- `index.html` — storefront sections and order form
- `styles.css` — responsive layout and visual styles
- `app.js` — flower data, price table, and order-note interaction
- `images/` — product photos used on the page
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment workflow

## Bouquet price list

Prices are transcribed from the handwritten catalog and shown in Indian rupees (₹). Confirm bouquet counts and details when ordering.

| Flower | Mini | Medium Classic | Large Full | Luxe | Premium Statement | Grand |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Rose | ₹299 | ₹599 | ₹999 | ₹1,599 | ₹2,499 | ₹1,249 |
| Tulip | ₹249 | ₹549 | ₹949 | ₹1,549 | ₹2,399 | ₹1,199 |
| Sunflower | ₹349 | ₹649 | ₹949 | ₹1,799 | ₹2,699 | ₹1,399 |
| Daisy | ₹279 | ₹529 | ₹799 | ₹1,599 | ₹2,499 | ₹1,199 |
| Lavender | ₹399 | ₹699 | ₹1,299 | ₹1,999 | ₹2,999 | ₹1,599 |
| Cherry blossom | ₹299 | ₹549 | ₹799 | ₹1,599 | ₹2,499 | ₹1,199 |
| Carnation | ₹279 | ₹579 | ₹979 | ₹1,579 | ₹2,479 | ₹1,299 |
| Lily | ₹399 | ₹799 | ₹1,199 | ₹1,999 | ₹2,999 | ₹1,599 |

Bouquet keychains are also offered; their prices were not included in the catalog and should be confirmed directly. Flower colors on the site are suggestions, not a live inventory list.

## Public hosting

The repository includes a GitHub Pages workflow that deploys on pushes to `main`. GitHub Pages must first be enabled in the repository settings with **Build and deployment → Source: GitHub Actions**. The storefront can then be published at `https://uses990-dev.github.io/Sahirae/`.
