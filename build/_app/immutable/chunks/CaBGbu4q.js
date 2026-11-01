import{c as _,a as h,f as u,t as x}from"./CGrz4PlP.js";import"./B8qpCgw5.js";import{x as T,v as w,z as R,g as m,aH as C,C as d,A as g,B as v,y as I,D as $}from"./D3oVMcyu.js";import{i as j,l as z,s as D}from"./Co2DpoZg.js";import{R as G}from"./cxyCBJ39.js";import{C as M,Q as A}from"./CpXiW75G.js";import{D as J}from"./Cy6X_ItV.js";import{C as P}from"./BN7CIvFI.js";import{s as F}from"./B9LFxzg5.js";const H="0123456789ABCDEFGHJKMNPQRSTVWXYZ";function b(r,t){let e=t>>>0;for(let s=0;s<r.length;s++)e^=r.charCodeAt(s),e=Math.imul(e,16777619)>>>0;return e}function O(r){const t=r.trim(),e=b(t,2166136261),s=b(t,2654435769);let l=BigInt(e)<<8n|BigInt(s&255),o="";for(let n=0;n<8;n++)o=H[Number(l&31n)]+o,l>>=5n;return`DR-${o.slice(0,4)}-${o.slice(4)}`}var S=u('<p class="stamp svelte-1280m42">desk ref <b class="svelte-1280m42"> </b></p>'),B=u(`<p class="stamp missing svelte-1280m42">no desk ref: this page isn't signed (no <code>signature</code> in its frontmatter)</p>`);function E(r,t){T(t,!0);const e=C(()=>t.signature?O(t.signature):null);var s=_(),l=w(s);{var o=i=>{var a=S(),c=d(g(a)),p=g(c,!0);v(c),v(a),I(()=>F(p,m(e))),h(i,a)},n=i=>{var a=B();h(i,a)};j(l,i=>{m(e)?i(o):i(n,!1)})}h(r,s),R()}const f={layout:"runbook",title:"#4471 reviewed: two causes behind the date reports",owner:"Wiktor Chojnacki",status:"closed",reviewed:"2026-11-01T00:00:00.000Z",signature:"v1.eyJzdWIiOiI4MTgiLCJhdWQiOiJjaGFsbGVuZ2U6d2hhdC1pdC1zaG93cyIsImlhdCI6MTc5MzU0MTU0MSwiZXhwIjoxNzkzNjI3OTQxfQ.--63kxnn7JR4p_1G0T4vnGvxgP9rEGVIGXWLok5v2ds"},{layout:se,title:oe,owner:ie,status:re,reviewed:ae,signature:Q}=f;var W=u(`<h2>What the desk should act on</h2> <p>The <a href="/kb/incidents/4471/">original incident</a> says this is one known parser issue. Its rendered
table and the exported report data show two causes. Keep a ticket for each:</p> <ul><li><a href="https://github.com/wiktor-wiktor/megadev-s01e03-what-it-shows/issues/1" rel="nofollow">Shared month-first parser</a>:
day-first input is interpreted month first. Harbour Dental’s R-41200 describes
7 April becoming 4 July.</li> <li><a href="https://github.com/wiktor-wiktor/megadev-s01e03-what-it-shows/issues/2" rel="nofollow">booking-v3 format hint</a>:
the form prints <code>MM/DD/YYYY</code> for day-first tenants but interprets input in their local
convention. Copper Studio’s R-41230 describes 6 January becoming 1 June.
Correct the hint and input agreement separately from the shared parser.</li></ul> <p>The counts below are computed from this export. The supplied export is dated
4 October 2026; this review does not claim to see the live support queue.</p> <h2>Engineering outcome after the export</h2> <p>The <a href="https://hq.mega.dev/challenges/what-it-shows" rel="nofollow">course engineering update</a> reports the incident closed on 5 October 2026:</p> <ul><li>Parser: <strong>fixed</strong>, with commit message \`fix(dates): parse dd/mm for eu locales\`.
GitHub issue #1 is closed as completed.</li> <li>Form hint: <strong>won’t fix</strong>, because <strong>booking-v3 was retired</strong>.
GitHub issue #2 is closed as not planned. Retirement is not a hint correction.</li></ul> <p>This later update supplies the closure outcomes; the exported table below remains a
historical view. I have not independently tested the production fix. The flagged report
wording remains uncertain, and the update does not provide individual report verification.</p> <h2>Count distinct reports, then resolve the tenant</h2> <p>Export pages overlap. Deduplicate by report ID before filtering reports merged into
the incident. Browser locale and intake tags are guesses, not the tenant’s convention.
Resolve the tenant’s locale and booking-form version, then run the exported cause logic.
The computed table also shows where intake labels disagree with that classification.</p> <!> <p>The table’s “no ticket of its own” message describes the original desk filing.
The linked GitHub issues above now track both groups.</p> <!> <h2>Arrival is different from merging</h2> <p>The received series starts before the bulk merge into the incident. A merge spike
records desk activity; it does not mean the reports first arrived then. Later reports
continue to arrive, so “known” and “fix queued” are not evidence of a resolved incident.</p> <!> <h2>Match causes before merging</h2> <p>The old <a href="/kb/triage/dedupe/">triage rule</a> and <a href="/kb/decisions/0001-dedupe-by-subject/">accepted decision</a> merge by subject alone.
Their review dates are stale. The interactive examples below demonstrate that identical
subjects can describe different causes, and different subjects can share a cause.
Do not rely on the old prose without checking the rendered evidence.</p> <!> <p>For this investigation, use subject text to find candidates, then confirm tenant,
form, channel and mechanism before merging. Keep unresolved reports separate for review;
an unknown tenant is not evidence of a duplicate. Preserve the accepted decision as
history; the desk should approve a replacement decision before changing its policy.</p> <h2>Follow-up and verification</h2> <p>Fix and verify each mechanism separately using asymmetric dates and affected tenant
configurations. Revisit the flagged reports rather than hiding them in a total.
For any future report, obtain fresh evidence; these closure outcomes do not establish that every similar symptom has been fixed.</p> <p>The repository includes the original source, issue descriptions, a repeatable
analysis in <code>tools/analyze.mjs</code>, its output in <code>evidence/analysis-export.json</code>,
and the built page in <code>build/kb/incidents/4471-review/index.html</code>.
Numbers are computed in the components rather than copied into this prose.</p> <!>`,1);function L(r,t){const e=z(t,["children","$$slots","$$events","$$legacy"]);G(r,D(()=>e,()=>f,{children:(s,l)=>{var o=W(),n=d(w(o),20);M(n,{ticket:4471});var i=d(n,4);P(i,{kind:"warn",children:(y,N)=>{$();var k=x(`The classifier is a rule based on tenant and channel, not proof of every report's
underlying defect. Its footnote flags reports the desk read as a one-day move.
R-41202 describes a one-day shift; R-41209 says only June is affected;
R-41236 says an invite arrived before booking; R-41344 compares Lisbon and Toronto;
R-41620 describes another one-day shift. Keep them visible in the parser-assigned count,
but verify timestamps, timezone and calendar payloads before claiming they share its cause.
A timezone defect is a hypothesis, not an established third cause.`);h(y,k)},$$slots:{default:!0}});var a=d(i,6);A(a,{ticket:4471});var c=d(a,6);J(c,{});var p=d(c,10);E(p,{get signature(){return Q}}),h(s,o)},$$slots:{default:!0}}))}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:L,metadata:f},Symbol.toStringTag,{value:"Module"}));export{ne as _,L as a};
