// Run against the managed preview: agent-browser eval --stdin < tests/order.browser.js
(async () => {
  const $ = (selector) => document.querySelector(selector);
  let assertions = 0;
  const assert = (condition, label) => {
    if (!condition) throw new Error(label);
    assertions += 1;
  };
  const set = (selector, value) => {
    const element = $(selector);
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const submit = () => $('#order-form').requestSubmit();
  const confirm = () => { $('#confirm-address').checked = true; };
  const isHidden = () => $('#order-review').hidden && !$('#whatsapp-order').hasAttribute('href');
  const geolocation = Object.getOwnPropertyDescriptor(navigator, 'geolocation');
  const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
  const mockLocation = (getCurrentPosition) => Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition } });
  try {
    assert(document.querySelectorAll('#price-rows tr').length === 9, 'Nine catalog rows rendered');
    assert($('#loading-status').hidden, 'Loading warning clears only when app initializes');
    for (const [index, button] of [...document.querySelectorAll('.choose-flower')].entries()) {
      button.click();
      assert($('#order-flower').value === flowers[index].name, `Card selects ${flowers[index].name}`);
      assert(document.activeElement === $('#order-flower'), 'Card focuses the flower selector');
    }
    for (const flower of flowers) {
      set('#order-flower', flower.name);
      for (const [index, price] of flower.prices.entries()) {
        set('#order-size', String(index));
        set('#order-finish', 'standard');
        assert($('#order-price').textContent === formatPrice(price), `${flower.name} standard ${index}`);
        if (flower.glitterPrices) {
          set('#order-finish', 'glitter');
          assert($('#order-price').textContent === formatPrice(flower.glitterPrices[index]), `${flower.name} glitter ${index}`);
        }
      }
    }
    set('#order-flower', 'Rose');
    set('#order-finish', 'glitter');
    set('#order-flower', 'Mini sunflower (Soleil)');
    assert($('#order-finish').value === 'standard' && $('#order-finish option[value=glitter]').disabled, 'No invented Soleil glitter price');
    submit();
    assert(isHidden(), 'Required address and name prevent review');
    set('#customer-name', '   ');
    set('#delivery-address', '   ');
    confirm();
    submit();
    assert(isHidden(), 'Whitespace-only details rejected');
    set('#order-flower', 'Lily');
    set('#order-size', '5');
    set('#order-finish', 'glitter');
    set('#customer-name', 'Demo Customer');
    set('#delivery-address', 'DEMO ONLY — Flat 1 & 2\nSample Road, Test City 000000');
    set('#delivery-notes', 'Test landmark & gate #2');
    submit();
    assert(isHidden(), 'Address confirmation required');
    confirm();
    submit();
    let url = new URL($('#whatsapp-order').href);
    let note = url.searchParams.get('text');
    assert(url.origin === 'https://wa.me' && url.pathname === '/917039006392', 'Correct WhatsApp recipient');
    for (const link of document.querySelectorAll('a[href^="https://wa.me/"]')) {
      assert(new URL(link.href).pathname === '/917039006392', 'Every WhatsApp link uses the corrected recipient');
    }
    assert(note === $('#order-message').value, 'Unicode, newlines and special characters survive URL encoding');
    assert(note.includes('Lily — Premium Statement (100 flowers)') && note.includes('₹16,249') && note.includes('With glitter'), 'Correct bouquet and glitter total in message');
    assert(note.includes('DEMO ONLY') && note.includes('Test landmark & gate #2') && !note.includes('maps?q='), 'Manual address order without GPS');
    set('#order-size', '0');
    assert(isHidden(), 'Changing bouquet invalidates stale WhatsApp link');
    confirm(); submit();
    set('#delivery-address', 'DEMO ONLY — Another Sample Street, Test City 000000');
    assert(!$('#confirm-address').checked && isHidden(), 'Address edits require fresh confirmation');

    for (const [code, text] of [[1, 'denied'], [2, 'could not be found'], [3, 'timed out']]) {
      mockLocation((success, error) => error({ code }));
      $('#use-location').click();
      assert($('#location-status').textContent.includes(text) && !$('#use-location').disabled, `Geolocation error ${code} has actionable fallback`);
      if (code === 1) assert($('#location-status').textContent.includes('Chrome') && $('#location-status').textContent.includes('allow Location'), 'Chrome permission recovery guidance');
      confirm(); submit();
      assert(!$('#order-review').hidden && !$('#order-message').value.includes('maps?q='), `Manual ordering works after location error ${code}`);
    }
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: undefined });
    $('#use-location').click();
    assert($('#location-status').textContent.includes('unavailable'), 'Unsupported geolocation fallback');
    mockLocation((success) => success({ coords: { latitude: 999, longitude: 0, accuracy: 10 } }));
    $('#use-location').click();
    assert($('#location-map').hidden && $('#location-status').textContent.includes('could not be found'), 'Invalid coordinates rejected');
    let pending;
    mockLocation((success) => { pending = success; });
    $('#use-location').click();
    assert($('#location-status').textContent.includes('Finding your location') && $('#use-location').disabled, 'Location tap immediately reports progress');
    $('#remove-location').click();
    pending({ coords: { latitude: 0, longitude: 0, accuracy: 12 } });
    assert($('#location-map').hidden && $('#remove-location').hidden, 'Cancelled request cannot reattach a pin');
    mockLocation((success, error, options) => {
      assert(options.timeout === 20000 && options.maximumAge === 0 && options.enableHighAccuracy === false, 'Fresh location with bounded timeout and no GPS-only preference');
      success({ coords: { latitude: 0, longitude: 0, accuracy: 12.5 } });
    });
    $('#use-location').click();
    assert(!$('#location-map').hidden && $('#location-map').href.endsWith('q=0.000000,0.000000'), 'Explicit location request creates a map link (synthetic coordinates)');
    assert(!$('#confirm-address').checked && isHidden(), 'New pin requires customer confirmation');
    confirm(); submit();
    note = new URL($('#whatsapp-order').href).searchParams.get('text');
    assert(note.includes('https://www.google.com/maps?q=0.000000,0.000000') && note.includes('accuracy: 13 m'), 'Pin and accuracy included in reviewed WhatsApp order');
    $('#remove-location').click();
    assert(isHidden() && !$('#confirm-address').checked, 'Removing location invalidates confirmation and message');
    confirm(); submit();
    assert(!$('#order-message').value.includes('maps?q='), 'Removed location absent from final message');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Permission denied'); } } });
    $('#copy-order').click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert($('#order-status').textContent.includes('Automatic copying is unavailable'), 'Clipboard denial offers manual copy');
    let copied;
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value) => { copied = value; } } });
    $('#copy-order').click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert(copied === $('#order-message').value && $('#order-status').textContent.includes('copied'), 'Clipboard success');
    return `${assertions} browser assertions passed. No WhatsApp messages sent; location and customer details were synthetic.`;
  } finally {
    if (geolocation) Object.defineProperty(navigator, 'geolocation', geolocation);
    else delete navigator.geolocation;
    if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard);
    else delete navigator.clipboard;
  }
})()
