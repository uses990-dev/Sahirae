const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const { resolve } = require('node:path');

test('HTML asset versions match file contents to prevent mixed cached releases', () => {
  const root = resolve(__dirname, '..');
  const html = readFileSync(resolve(root, 'index.html'), 'utf8');
  for (const file of ['catalog.js', 'app.js', 'styles.css']) {
    const hash = createHash('sha256').update(readFileSync(resolve(root, file))).digest('hex').slice(0, 12);
    assert.ok(html.includes(`"${file}?v=${hash}"`), `Update ${file} cache version to ${hash}`);
  }
  assert.ok(html.indexOf('src="catalog.js?') < html.indexOf('src="app.js?'), 'Catalog loads before app');
});
