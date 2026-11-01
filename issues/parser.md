## Problem and report count

**379 distinct reports** merged into support ticket #4471 are assigned to the shared month-first parser by the exported tenant-aware classifier. This includes **5 reports whose wording needs separate verification**, described below; it is not a claim that all 379 have a proven parser reproduction.

A day-first tenant enters a date in its local convention, but the shared parser reads it month first. For example, Harbour Dental (`en-GB`, booking-v2), report R-41200: 7 April becomes 4 July; R-41201 reports the reverse.

## Scope and evidence

- Source: knowledge-base export dated 4 October 2026, `src/lib/data/reports-4471.json`.
- Deduplicate by report ID before filtering `mergedInto === 4471`: 427 rows become 412 unique reports.
- Resolve tenant locale and form from `src/lib/data/tenants/*.json`, not browser locale or intake tag.
- Run `causeOf` and `groupByCause` in `src/lib/kb/causes.ts`: parser 379, hint 33, unplaced 0.
- Parser group spans 11 tenants, first received 1 April, last received 4 October. Intake tagged 356 as parser and 23 as hint.

## Uncertainty that must stay visible

`desk-notes.json` lists R-41202, R-41209, R-41236, R-41344 and R-41620 as reports read as a one-day move. They remain in the parser total under the existing classifier. Their text describes a one-day shift, June-only behavior, an invite arriving before booking, and a cross-city date discrepancy. Those symptoms do not establish a month/day swap. Investigate original timestamps, timezone and calendar payloads before asserting a shared cause; timezone handling is a hypothesis, not a confirmed diagnosis. Do not silently drop or double-count these five.

## Proposed resolution and verification

Parse dates using an explicit input convention or structured date fields and preserve the intended calendar date. Verify app, email and booking-v2 paths for day-first tenants using asymmetric dates such as 7 April and 4 July, plus invalid and unambiguous dates. Verify the five flagged reports separately. Fixing the parser does not fix booking-v3's misleading hint.

## Reproduce the count

Run `node tools/analyze.mjs .` from this repository. See the signed investigation page at `/kb/incidents/4471-review/` and the recorded export analysis in `evidence/analysis-export.json`.
