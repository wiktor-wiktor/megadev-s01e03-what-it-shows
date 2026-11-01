## Problem and report count

**33 distinct reports** merged into #4471 belong to a separate booking-v3 date-hint problem. They need their own ticket, because fixing the shared parser does not correct what the form tells users to type.

For day-first tenants, booking-v3 prints `MM/DD/YYYY`, while its form reads input in the tenant's local convention. Users follow the month-first hint and receive a swapped date. Affected tenant configurations: Alder Physio (`de-DE`), Copper Studio (`es-ES`), Pale Harbour (`pt-PT`), all booking-v3, channel `form`.

## Scope and evidence

- Source: knowledge-base export dated 4 October 2026, `src/lib/data/reports-4471.json`.
- Deduplicate the 427 exported rows by report ID: 412 distinct reports, all merged into #4471.
- Join tenant records; evaluate the exported `causeOf` logic. Only day-first + booking-v3 + form is assigned to hint: **33 reports** from **3 tenants**, received 17 April through 22 September.
- Intake tags would mislead: 15 of these reports were tagged parser; 18 hint. Browser locale is not the tenant's input convention.
- Example R-41230: Copper Studio, form, intended 6 January, actual 1 June, tagged parser.
- Example R-41241: Alder Physio, form, intended 6 August, actual 8 June; browser locale en-US, tenant locale de-DE.
- Example R-41251: Pale Harbour, form, 7 January becomes 1 July.

## Proposed resolution and verification

Make the displayed format, accepted input and date validation agree with the tenant locale. Verify all three affected tenants using asymmetric dates. Compare booking-v2 and app/email reports as controls; those remain in the separate parser group. Confirm an entered date survives form submission and invite generation unchanged.

## Counting boundary

The parser group has 379 reports and this group 33: together 412, with no shared IDs. Five parser-assigned reports have unusual one-day wording and need investigation; none is included in this hint group. These counts describe the supplied export, not a live support queue.

Run `node tools/analyze.mjs .` to reproduce the counts. See `/kb/incidents/4471-review/` and `evidence/analysis-export.json`.
