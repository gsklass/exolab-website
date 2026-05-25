// Unit tests for the Otter.ai transcript viewer data layer.
// Mirrors the pure-logic functions from the IIFE in index.html.
// No DOM required — uses a local mock for localStorage.

const assert = require('assert');

// ── mock localStorage ──────────────────────────────────────
const _store = {};
const localStorage = {
  getItem:    k     => _store[k] ?? null,
  setItem:    (k,v) => { _store[k] = v; },
  removeItem: k     => { delete _store[k]; },
  clear:      ()    => { for (const k in _store) delete _store[k]; }
};

// ── functions under test (replicated from index.html IIFE) ──
const KEY = 'otterAI';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── tiny test runner ───────────────────────────────────────
let passed = 0, failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓  ${name}`);
    passed++;
  } catch (e) {
    console.error(`  ✗  ${name}`);
    console.error(`     ${e.message}`);
    failed++;
  }
  localStorage.clear();
}

// ── test suite ─────────────────────────────────────────────
console.log('\nOtterAI data-layer tests\n');

test('load() returns {} when store is empty', () => {
  assert.deepStrictEqual(load(), {});
});

test('load() returns {} on malformed JSON', () => {
  _store[KEY] = '{broken';
  assert.deepStrictEqual(load(), {});
});

test('save() + load() round-trips data correctly', () => {
  const data = { 'Robotics Summit 2026': [{ name: 'notes.txt', content: 'hello', date: '2026-05-27' }] };
  save(data);
  assert.deepStrictEqual(load(), data);
});

test('adding a file to a new origin creates the origin key', () => {
  const data = load();
  data['TestEvent'] = [{ name: 'a.txt', content: 'abc', date: '2026-01-01' }];
  save(data);
  const result = load();
  assert.strictEqual(result['TestEvent'].length, 1);
  assert.strictEqual(result['TestEvent'][0].name, 'a.txt');
});

test('adding two files under same origin keeps both', () => {
  const data = { 'Conf': [{ name: 'f1.txt', content: 'x', date: '2026-01-01' }] };
  save(data);
  const d = load();
  d['Conf'].push({ name: 'f2.txt', content: 'y', date: '2026-01-02' });
  save(d);
  assert.strictEqual(load()['Conf'].length, 2);
});

test('deleting a file keeps origin when other files remain', () => {
  const data = { 'Conf': [
    { name: 'a.txt', content: '1', date: '2026-01-01' },
    { name: 'b.txt', content: '2', date: '2026-01-01' }
  ]};
  save(data);
  const d = load();
  d['Conf'] = d['Conf'].filter(f => f.name !== 'a.txt');
  save(d);
  const result = load();
  assert.ok(result['Conf'], 'origin key should still exist');
  assert.strictEqual(result['Conf'].length, 1);
  assert.strictEqual(result['Conf'][0].name, 'b.txt');
});

test('deleting the last file in an origin removes the origin key', () => {
  const data = { 'Solo': [{ name: 'only.txt', content: 'x', date: '2026-01-01' }] };
  save(data);
  const d = load();
  d['Solo'] = d['Solo'].filter(f => f.name !== 'only.txt');
  if (!d['Solo'].length) delete d['Solo'];
  save(d);
  assert.strictEqual(load()['Solo'], undefined);
});

test('uploading duplicate filename replaces existing entry', () => {
  const data = { 'Ev': [{ name: 'dup.txt', content: 'old', date: '2026-01-01' }] };
  save(data);
  const d = load();
  const idx = d['Ev'].findIndex(f => f.name === 'dup.txt');
  d['Ev'][idx] = { name: 'dup.txt', content: 'new', date: '2026-05-25' };
  save(d);
  const result = load();
  assert.strictEqual(result['Ev'].length, 1);
  assert.strictEqual(result['Ev'][0].content, 'new');
});

test('multiple origins are stored and retrieved independently', () => {
  const data = {
    'Event A': [{ name: 'a.txt', content: '1', date: '2026-01-01' }],
    'Event B': [{ name: 'b.txt', content: '2', date: '2026-01-02' }]
  };
  save(data);
  const result = load();
  assert.strictEqual(Object.keys(result).length, 2);
  assert.strictEqual(result['Event A'][0].name, 'a.txt');
  assert.strictEqual(result['Event B'][0].name, 'b.txt');
});

test('esc() encodes < > " & characters', () => {
  assert.strictEqual(esc('<script>'), '&lt;script&gt;');
  assert.strictEqual(esc('"hi"'),     '&quot;hi&quot;');
  assert.strictEqual(esc('a & b'),    'a &amp; b');
});

test('esc() coerces non-string input', () => {
  assert.strictEqual(esc(42),   '42');
  assert.strictEqual(esc(null), 'null');
});

test('file entry preserves all fields', () => {
  const entry = { name: 'session.txt', content: 'transcript text', date: '2026-05-27' };
  const data = { 'Robotics Summit 2026': [entry] };
  save(data);
  const result = load()['Robotics Summit 2026'][0];
  assert.strictEqual(result.name,    entry.name);
  assert.strictEqual(result.content, entry.content);
  assert.strictEqual(result.date,    entry.date);
});

// ── summary ────────────────────────────────────────────────
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
