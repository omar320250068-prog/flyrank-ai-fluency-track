# FL-01 — Workflow Audit & Target Tasks

**Owner:** Omar Hindawy
**Context:** Working professional (full-time role) + personal side projects
**Date:** 2026-09-21
**Phase:** Setup (est. 4 hours)

---

## 1. Workflow Audit (10–15 recurring weekly tasks)

Classification key (Ethan Mollick, *On-boarding your AI Intern*, oneusefulthing.org):
- **JM** = Just Me — AI gets in the way, or the task should stay human (per Mollick: "the AI is not useful and only gets in the way… or tasks that you believe strongly should remain human").
- **DR** = Delegated — assign the AI, but review and offer oversight ("the AI makes stuff up all the time").
- **CA** = Centaur — human + AI integrated deeply into the workflow (Mollick: "Centaur tasks are where AI becomes most valuable").
- **FA** = Automated — leave it completely to the tool, no checking.

Mapping to the task brief: Just Me = "just me"; Delegated = "delegate to AI with review"; Centaur = "collaborate with AI"; Automated = "fully automate".

| # | Recurring task (my real week) | Class | One-line rationale |
|---|-------------------------------|:-----:|--------------------|
| 1 | Write daily/weekly status updates to my manager | DR | AI drafts structure from my bullet points, but I must verify every claim and commitment before it becomes an official record. |
| 2 | Draft routine emails to colleagues/clients | CA | Going back and forth with AI on tone and length is faster than starting cold, while I keep ownership of the relationship. |
| 3 | Weekly planning & prioritization of my workload | JM | Requires org politics, who is waiting on what, and unwritten context that AI simply does not have. |
| 4 | Summarize meeting recordings into decisions + action items | DR | AI extracts owners and dates quickly, but I must confirm names, deadlines, and that nothing was fabricated. |
| 5 | Prepare the monthly performance/status report | CA | AI builds the narrative skeleton; I supply the real metrics and the "why" behind them. |
| 6 | Clean, merge, and reformat spreadsheet data | FA | Deterministic formulas/scripts produce the same correct result every time; no judgment is involved. |
| 7 | Proofread and tighten my writing for grammar/clarity | DR | AI catches errors, but I reject edits that flatten my voice or change meaning. |
| 8 | Research tools, vendors, or competitors before a decision | CA | AI gathers breadth fast; I judge source credibility and business fit. |
| 9 | Turn rough notes into slides/deck outline | DR | AI formats and structures, yet I must fix claims, numbers, and visual priorities. |
| 10 | Brainstorm options for an open problem | CA | AI is a strong sparring partner for breadth; the final choice and trade-offs stay mine. |
| 11 | Schedule/coordinate meetings via calendar | FA | A rule-based scheduler sends invites and finds slots with zero judgment required. |
| 12 | Sensitive feedback / HR or performance conversations | JM | Accountability, confidentiality, and empathy are human; AI wording could cause real harm. |
| 13 | Handling confidential data (PII, contracts, salaries) | JM | Privacy and compliance risk mean this data must never leave my control. |
| 14 | Writing personal/creative side-project content | CA | I use AI as a sounding board for ideas but the voice and final words must be mine. |
| 15 | Career learning & interview preparation | CA | AI quizzes me and fills gaps; I do the actual practice and reflection. |

**Honest "just me" count:** 3 (tasks 3, 12, 13) — all justified above.
**Fully automate:** 2 (tasks 6, 11).
**Delegate with review:** 4 (tasks 1, 4, 7, 9).
**Collaborate:** 6 (tasks 2, 5, 8, 10, 14, 15).

> Total = 3 JM + 2 FA + 4 DR + 6 CA = **15 tasks**.

---

## 2. Tooling & Account Evidence

| Item | Status | Evidence to attach |
|------|--------|--------------------|
| Claude account (free) | ☐ To do | Screenshot of logged-in claude.ai home |
| ChatGPT account (free) | ☐ To do | Screenshot of logged-in chat.openai.com |
| Anthropic Academy account | ☐ To do | Screenshot of profile/dashboard at anthropic.skilljar.com |
| Enrolled: **AI Fluency: Framework & Foundations** (FREE) | ☐ To do | Screenshot of course page: `anthropic.skilljar.com/ai-fluency-framework-foundations` |
| Completed **Module 1 — Introduction to AI Fluency** | ☐ To do | Screenshot of Module 1 marked complete |

**Why these:** Ethan Mollick's *On-boarding your AI Intern* supplies the four-category classification framework above; Anthropic Academy's *AI Fluency: Framework & Foundations* (built with Prof. Joseph Feller and Prof. Rick Dakan) is the free, certified course on collaborating with AI effectively, efficiently, ethically, and safely.

**Course structure (verified from the Academy page).** The course is built on the **4D Framework**:
1. **Delegation** — deciding what work to give an AI and how to divide it.
2. **Description** — communicating the task clearly (the prompting deep-dive).
3. **Discernment** — critically evaluating what the AI returns.
4. **Diligence** — using AI responsibly, ethically, and safely.

Full curriculum: Intro to AI Fluency → The AI Fluency Framework (incl. the 4D Framework) → Deep Dive 1: What is Generative AI? → Delegation → Description → Deep Dive 2: Effective Prompting → Discernment → The Description–Discernment Loop → Diligence → Conclusion & Certificate.

**Module 1 recap (Introduction to AI Fluency):** why AI fluency is a durable skill, not prompt tricks; you stay the "human in the loop," responsible for judgment and the final output.

---

## 3. Claude Project — Configuration

**Project name:** `Work Hub — Omar`
**Files to add to the Knowledge base:** my role description, report template, glossary of internal terms (no confidential/PII data).

Paste these into **Project → Instructions** (also saved in `Claude_Project_Instructions.md`):

```
WHO I AM
I am Omar, a working professional managing recurring reporting, stakeholder
communication, and project admin. I work in fast loops and value accuracy over
polish. I am the final owner of anything that leaves my desk.

TONE PREFERENCES
- Clear, direct, professional. No fluff, no filler praise.
- Short paragraphs and bullets. Plain language over jargon.
- Ask a clarifying question if context is missing instead of guessing.

HOW TO WORK WITH ME
- Label anything uncertain as "UNVERIFIED".
- Never invent names, numbers, dates, or commitments.
- When summarizing, always list Decisions, Action items (owner + due date),
  and Open questions separately.
- Show your assumptions in one short section at the end.

CURRENT GOALS
1. Cut time spent on recurring status updates and reports.
2. Make meeting follow-ups reliable (nothing dropped).
3. Build a reusable, reviewed AI workflow for research decisions.
```

**Screenshot requirement:** capture the Project open with the Instructions panel visible and the project name `Work Hub — Omar` in view.

---

## 4. Three Target Tasks (reused in FL-02 → FL-04)

Each target is mapped to the course's **4D Framework** so the same task can be re-run as I progress: **Description** (write/clarify the prompt), **Discernment** (evaluate the output), and **Diligence** (use it responsibly); **Delegation** is fixed at audit time.

### Target Task A — Meeting transcript → decisions & action items
- **Input:** a real recorded meeting transcript (or my typed rough notes).
- **4D focus:** Delegation (DR — reviewed) → Description (prompt the extraction) → Discernment (verify owners/dates).
- **Reuse in FL-02/03/04:** prompting, evaluating output quality, and re-running after improving the prompt.
- **"Done well" (measurable):**
  1. Captures **100%** of decisions and action items found in the source (checked line-by-line).
  2. Every action item has an **owner and a due date**, or is explicitly marked "unassigned".
  3. **Zero fabricated** items (0 hallucinated facts) after my review.
  4. Turnaround **≤ 10 minutes** from transcript to reviewed summary.

### Target Task B — Monthly status/performance report draft
- **Input:** my bullet notes + the real metrics spreadsheet.
- **4D focus:** Description (brief + template) → Discernment (fact-check every number) → Diligence (keep internal/PII data out).
- **Reuse in FL-02/03/04:** test prompting styles, rubric-based review, and safe/ethical handling of internal data.
- **"Done well" (measurable):**
  1. Draft ready in **≤ 30 minutes**.
  2. Contains **every required section** of the standard report template (100% coverage).
  3. **All numbers match** the source sheet (100% accuracy; errors = 0).
  4. Needs **< 2 rounds** of my edits before it is send-ready.

### Target Task C — Tool/vendor research brief for a decision
- **Input:** a real decision I face (e.g., choosing a scheduling or reporting tool).
- **4D focus:** Delegation (CA — centaur) → Description (criteria + sources) → Discernment (bias/credibility) → Diligence (honest citation).
- **Reuse in FL-02/03/04:** practice source evaluation, bias checking, and ethical citation.
- **"Done well" (measurable):**
  1. Covers a fixed set of **5 criteria** defined before the search.
  2. Cites **≥ 4 credible sources** with links, each verified to exist.
  3. Includes a **risks/limitations** section and a clear recommendation with a confidence level.
  4. Completed in **≤ 45 minutes**, with every factual claim marked verified or unverified.

---

## 5. Linked Resources (visited & used)

| Resource | Key takeaway used in this audit |
|----------|--------------------------------|
| *On-boarding your AI Intern* — Ethan Mollick (oneusefulthing.org) | The four task categories: **Just Me, Delegated, Centaur, Automated**; "the AI makes stuff up all the time," so Delegated work needs review. |
| *AI Fluency: Framework & Foundations* — Anthropic Academy (`anthropic.skilljar.com/ai-fluency-framework-foundations`) | Free, certificate-bearing course built on the **4D Framework**; Module 1 is *Introduction to AI Fluency*. |
| *What are projects?* — Claude Help Center (`support.claude.com`) | Projects hold custom instructions + a knowledge base so recurring work keeps consistent context. |

---

## 6. Submission Checklist
- [ ] Workflow audit table (this file) — 15 tasks, all classified, all with rationale, 3 honest "just me".
- [ ] Screenshot of configured Claude Project (`Work Hub — Omar`).
- [ ] Three target tasks with measurable success definitions (Section 4).
- [ ] Screenshots: Claude, ChatGPT, Anthropic Academy accounts + course enrollment + Module 1 complete.
