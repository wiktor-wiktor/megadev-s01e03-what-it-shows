// Run with Node 24+: node analyze.mjs [support-kb directory]
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { stripTypeScriptTypes } from 'node:module';
const root = path.resolve(process.argv[2] ?? new URL('..', import.meta.url).pathname);
const lib = path.join(root, 'src/lib');
const read = (file) => JSON.parse(fs.readFileSync(path.join(lib, file), 'utf8'));
const source = fs.readFileSync(path.join(lib, 'kb/causes.ts'), 'utf8');
const logic = await import('data:text/javascript;base64,' + Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
const raw = read('data/reports-4471.json');
const tenants = fs.readdirSync(path.join(lib, 'data/tenants')).filter(f => f.endsWith('.json')).map(f => read('data/tenants/' + f));
const byHandle = new Map(tenants.map(t => [t.handle, t]));
const notes = read('data/desk-notes.json');
const seen = new Map();
for (const report of raw) {
  if (seen.has(report.id)) assert.deepEqual(report, seen.get(report.id), `Conflicting copies of ${report.id}`);
  seen.set(report.id, report);
}
const reports = logic.uniqueById(raw).filter(r => r.mergedInto === 4471);
assert.ok(reports.every(r => byHandle.has(r.tenant)), 'Every report must resolve to a tenant');
const groups = logic.groupByCause(reports, r => byHandle.get(r.tenant));
assert.equal(groups.reduce((n,g) => n + g.reports.length, 0), reports.length);
const byMonth = {};
for (const report of reports) {
  for (const [field, key] of [['receivedAt','received'],['mergedAt','merged']]) {
    if (!report[field]) continue;
    const month = report[field].slice(0, 7);
    byMonth[month] ??= { received: 0, merged: 0 };
    byMonth[month][key]++;
  }
}
const result = {
  source: 'Knowledge-base export dated 2026-10-04; counts are not live support totals.',
  exportedRows: raw.length,
  uniqueReports: seen.size,
  repeatedRows: raw.length - seen.size,
  mergedInto4471: reports.length,
  groups: groups.map(({reports: rs, ...g}) => ({
    ...g, count: rs.length, readAsOneDay: logic.readAs({ ...g, reports: rs }, notes.oneDayMove),
    reportIds: rs.map(r => r.id),
    intakeDisagreements: rs.filter(r => r.meta.intakeTag !== g.cause).map(r => r.id),
  })),
  deskOneDayReports: reports.filter(r => notes.oneDayMove.includes(r.id)),
  timeline: Object.fromEntries(Object.entries(byMonth).sort()),
};
console.log(JSON.stringify(result, null, 2));
