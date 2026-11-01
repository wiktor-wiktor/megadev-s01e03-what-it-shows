# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## Day 3 investigation

The supplied export is preserved above and under `src/`; this project adds a signed
review at `/kb/incidents/4471-review/`, with separate issues for the parser and form hint.
The review does not change the old accepted decision.

- Install dependencies: `npm ci`
- Reproduce export counts: `node tools/analyze.mjs .`
- Build all knowledge-base pages: `npm run build`
- View the built site: `npm run preview` (open the printed local URL and append `/kb/incidents/4471-review/`)
- Built review: `build/kb/incidents/4471-review/index.html`
- Recorded analysis: `evidence/analysis-export.json`
- Issue descriptions: `issues/`

Build output is committed so the course can inspect the page as rendered, including its desk reference.
Only the frontmatter signature required by the challenge is included; private course logs live outside this repo.
