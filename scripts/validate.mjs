import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, sep } from 'node:path';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const index = JSON.parse(await readFile(resolve(root, 'index.json'), 'utf8'));
assert.deepEqual(Object.keys(index).sort(), ['packages', 'schemaVersion']);
assert.equal(index.schemaVersion, 1);
assert.ok(Array.isArray(index.packages) && index.packages.length <= 100);
const ids = new Set();
const allowed = ['schemaVersion','id','kind','name','version','author','description','instructions','panel','capabilities','permissions'];
for (const entry of index.packages) {
  assert.deepEqual(Object.keys(entry).sort(), ['id','manifest','sha256','version']);
  assert.match(entry.id, /^[a-z0-9]+(?:[.-][a-z0-9]+)+$/);
  assert.match(entry.version, /^\d+\.\d+\.\d+$/);
  assert.equal(entry.manifest, 'agents/' + entry.id + '/' + entry.version + '/manifest.json');
  assert.ok(!ids.has(entry.id), 'Duplicate package ID');
  ids.add(entry.id);
  assert.match(entry.sha256, /^[a-f0-9]{64}$/);
  const path = resolve(root, entry.manifest);
  assert.ok(path.startsWith(root.endsWith(sep) ? root : root + sep), 'Path outside registry');
  const bytes = await readFile(path);
  assert.ok(bytes.length <= 64000);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256, 'Manifest hash mismatch');
  const manifest = JSON.parse(bytes.toString('utf8'));
  assert.ok(Object.keys(manifest).every(key => allowed.includes(key)), 'Unknown manifest field');
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.id, entry.id);
  assert.equal(manifest.version, entry.version);
  assert.ok(['agent','skill','plugin'].includes(manifest.kind));
  for (const [key, max] of [['name',64],['author',80],['description',4000]]) {
    assert.ok(typeof manifest[key] === 'string' && manifest[key].trim().length > 0 && manifest[key].length <= max, 'Invalid ' + key);
  }
  assert.ok(manifest.instructions === undefined || typeof manifest.instructions === 'string' && manifest.instructions.length <= 12000);
  assert.ok(manifest.panel === undefined || /^[a-z0-9.-]+$/.test(manifest.panel));
  assert.ok(manifest.capabilities === undefined || Array.isArray(manifest.capabilities) && manifest.capabilities.length <= 32 && manifest.capabilities.every(item => typeof item === 'string' && item.length <= 64));
  assert.ok(manifest.permissions === undefined || Array.isArray(manifest.permissions) && manifest.permissions.every(item => ['network','files.read','files.write'].includes(item)));
}
console.log('Validated ' + index.packages.length + ' package(s), manifests and SHA-256 hashes.');
