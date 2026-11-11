const flowerGrid = document.querySelector('#flower-grid');
const priceRows = document.querySelector('#price-rows');
const flowerSelect = document.querySelector('#order-flower');
const sizeSelect = document.querySelector('#order-size');
const finishSelect = document.querySelector('#order-finish');
const colorSelect = document.querySelector('#order-color');
const form = document.querySelector('#order-form');
const address = document.querySelector('#delivery-address');
const confirmation = document.querySelector('#confirm-address');
const review = document.querySelector('#order-review');
const whatsappLink = document.querySelector('#whatsapp-order');
const message = document.querySelector('#order-message');
const status = document.querySelector('#order-status');
const locationButton = document.querySelector('#use-location');
const removeLocation = document.querySelector('#remove-location');
const locationStatus = document.querySelector('#location-status');
const locationMap = document.querySelector('#location-map');
let locationPin = null;
let locationRequest = 0;

for (const flower of flowers) {
  const card = document.createElement('article');
  card.className = 'flower-card';
  const unit = `${formatPrice(flower.unitPrice)} each${flower.unitGlitterPrice ? ` · ${formatPrice(flower.unitGlitterPrice)} with glitter` : ''}`;
  card.innerHTML = `<div class="flower-top"><span class="flower-icon" aria-hidden="true">${flower.symbol}</span><span class="flower-from">Bouquets from<strong>${formatPrice(flower.prices[0])}</strong></span></div><h3>${flower.name}</h3><div class="flower-meaning">${flower.meaning}</div><p class="flower-recipient">${flower.recipients}</p><p class="flower-unit">${unit}</p><div class="flower-colors" aria-label="Catalog colors">${flower.colors.map((color) => `<span class="color-chip">${color}</span>`).join('')}</div>`;
  flowerGrid.append(card);
  const row = document.createElement('tr');
  row.innerHTML = `<th scope="row">${flower.name}</th>${flower.prices.map((price, index) => `<td>${formatPrice(price)}<small>${flower.glitterPrices ? `${formatPrice(flower.glitterPrices[index])} with glitter` : 'Glitter not listed'}</small></td>`).join('')}`;
  priceRows.append(row);
  flowerSelect.add(new Option(flower.name, flower.name));
}

sizes.forEach((size, index) => sizeSelect.add(new Option(`${size} · ${stemCounts[index]} flowers`, String(index))));
const selectedFlower = () => flowers.find((flower) => flower.name === flowerSelect.value);

function invalidateReview() {
  review.hidden = true;
  whatsappLink.removeAttribute('href');
  message.value = '';
  status.textContent = 'No payment is taken here. Review your details before opening WhatsApp; delivery charges and availability will be confirmed in chat.';
}

function updatePrice() {
  const flower = selectedFlower();
  const glitter = finishSelect.value === 'glitter' && flower.glitterPrices;
  document.querySelector('#order-price').textContent = formatPrice((glitter ? flower.glitterPrices : flower.prices)[Number(sizeSelect.value)]);
  invalidateReview();
}

function updateFlower() {
  const flower = selectedFlower();
  colorSelect.replaceChildren(...flower.colors.map((color) => new Option(color, color)));
  finishSelect.querySelector('[value="glitter"]').disabled = !flower.glitterPrices;
  if (!flower.glitterPrices) finishSelect.value = 'standard';
  document.querySelector('#finish-help').textContent = flower.glitterPrices ? 'Bouquet prices include wrapping.' : 'Soleil mini sunflower prices include wrapping. Glitter pricing is not listed.';
  updatePrice();
}

flowerSelect.addEventListener('change', updateFlower);
sizeSelect.addEventListener('change', updatePrice);
finishSelect.addEventListener('change', updatePrice);
form.addEventListener('input', (event) => {
  if (event.target === message) return;
  invalidateReview();
  if (event.target === address || event.target.id === 'delivery-notes') confirmation.checked = false;
  if (event.target === address || event.target.id === 'customer-name') event.target.setCustomValidity('');
});
form.addEventListener('change', invalidateReview);

function clearPin() {
  locationPin = null;
  locationMap.hidden = true;
  locationMap.removeAttribute('href');
  confirmation.checked = false;
  invalidateReview();
}

removeLocation.addEventListener('click', () => {
  locationRequest += 1;
  clearPin();
  locationButton.disabled = false;
  removeLocation.hidden = true;
  locationStatus.textContent = 'Location removed. You can order using your typed address.';
});

locationButton.addEventListener('click', () => {
  const request = ++locationRequest;
  clearPin();
  if (!window.isSecureContext || !navigator.geolocation) {
    locationStatus.textContent = 'Location is unavailable in this browser. Please enter your full delivery address instead.';
    return;
  }
  locationButton.disabled = true;
  removeLocation.hidden = false;
  locationStatus.textContent = 'Waiting for location permission. You can cancel by choosing Remove location.';
  navigator.geolocation.getCurrentPosition((position) => {
    if (request !== locationRequest) return;
    const { latitude, longitude, accuracy } = position.coords;
    locationButton.disabled = false;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      removeLocation.hidden = true;
      locationStatus.textContent = 'A usable location could not be found. Please enter your delivery address instead.';
      return;
    }
    locationPin = { url: `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`, accuracy: Number.isFinite(accuracy) && accuracy >= 0 ? Math.ceil(accuracy) : null };
    locationMap.href = locationPin.url;
    locationMap.hidden = false;
    confirmation.checked = false;
    invalidateReview();
    locationStatus.textContent = `Location attached${locationPin.accuracy !== null ? ` (estimated accuracy ${locationPin.accuracy} m)` : ''}. Check the pin and confirm it matches your delivery address.`;
  }, (error) => {
    if (request !== locationRequest) return;
    locationButton.disabled = false;
    removeLocation.hidden = true;
    const reason = error.code === 1 ? 'Location permission was denied.' : error.code === 3 ? 'Location request timed out.' : 'Your location could not be found.';
    locationStatus.textContent = `${reason} You can still order using your typed address.`;
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  for (const field of [document.querySelector('#customer-name'), address]) {
    field.setCustomValidity(field.value.trim() ? '' : 'Please fill in this field.');
  }
  if (!form.reportValidity()) return;
  const flower = selectedFlower();
  const index = Number(sizeSelect.value);
  const glitter = finishSelect.value === 'glitter' && flower.glitterPrices;
  const price = (glitter ? flower.glitterPrices : flower.prices)[index];
  const notes = document.querySelector('#delivery-notes').value.trim();
  message.value = [
    'Hi Sahiraé by Sana! I would like to order:',
    `${flower.name} — ${sizes[index]} (${stemCounts[index]} flowers)`,
    `Color: ${colorSelect.value}`,
    `Finish: ${glitter ? 'With glitter' : 'Standard'}`,
    `Catalog price: ${formatPrice(price)} (wrapping included)`,
    '',
    `Customer: ${document.querySelector('#customer-name').value.trim()}`,
    `Delivery address: ${address.value.trim()}`,
    ...(notes ? [`Landmark / notes: ${notes}`] : []),
    ...(locationPin ? [`Customer-shared delivery pin: ${locationPin.url}`, ...(locationPin.accuracy !== null ? [`GPS estimated accuracy: ${locationPin.accuracy} m`] : [])] : []),
    'I confirm the delivery address and any attached pin are correct.',
    '',
    'Please confirm availability, delivery charges and the final total. This is an order request, not a payment or confirmed order.'
  ].join('\n');
  whatsappLink.href = `https://wa.me/917039009392?text=${encodeURIComponent(message.value)}`;
  review.hidden = false;
  status.textContent = 'Your order is ready to review. Nothing has been sent yet.';
  document.querySelector('#review-title').focus();
});

document.querySelector('#copy-order').addEventListener('click', async () => {
  const note = message.value;
  try {
    await navigator.clipboard.writeText(note);
    if (message.value === note) status.textContent = 'Order message copied. Paste it into a chat with +91 7039009392.';
  } catch {
    if (message.value === note) {
      message.focus();
      message.select();
      status.textContent = 'Automatic copying is unavailable. Select and copy the message above, then send it to +91 7039009392.';
    }
  }
});
updateFlower();
