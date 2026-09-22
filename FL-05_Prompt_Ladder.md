# FL-05 — Prompt Ladder: weak baseline → engineered prompt

**Owner:** Omar Hindawy — **Track:** 2 (AI Fluency) — **Date:** 2026-09-21
**Voice card:** direct, plain, no buzzwords, honest.
**Task used for the ladder:** my real internship project (numbers → monthly
report workflow, same one pinned on the portfolio). Every run below is a real
run — one change at a time, output compared on the spot.

---

## Baseline — the weak prompt (what I'd have typed a month ago)

**Prompt:**
```
Write a case study for my project.
```

**Output (verbatim):**
> In today's fast-paced digital landscape, staying ahead means leveraging the
> latest technology. My project helps people work smarter and more efficiently,
> empowering teams to achieve more with less effort. By combining innovation
> with a user-centric approach, it delivers measurable, results-driven value.
> It is a thing I am proud of and believe in.

**Notes (start point):** no change to compare against. It describes nobody's
work — no project named, no problem, no decisions, no outcome. It could
introduce any tool on the internet.

---

## Version 1 — layer: **clearer goal**

**Change:** replaced "write a case study" with a goal the piece must hit.

**Prompt:**
```
Write a portfolio case study about my project. The goal of the piece is to
prove that I ship things that work, end to end — not that I have good ideas.
```
Wait — one layer only. The goal is the only addition; content is untouched.

**Output (verbatim):**
> This case study is about a project that went from idea to something that
> actually works. It was built, tested, and finished. It does a job today
> instead of promising one. The value was never the concept — the concept got
> out the door.

**Notes:**
- **What changed in the prompt:** added a clear goal (prove shipping, not describe ideas).
- **What actually improved in the output:** it now argues *"built, tested, finished — it does a job today."* The empty praise ("empowering teams") is gone because the goal forbade it. There's a thesis now.
- **What still failed:** anonymous — no project, no problem, no verifiable fact. A reviewer can't tell what was built or check anything.
- **Try next:** say who I'm writing for, so the piece stops explaining basics a technical reader knows.

---

## Version 2 — layer: **defined audience**

**Change:** added exactly one thing — who reads it and what they're deciding.

**Prompt:**
```
Write a portfolio case study about my project. The goal: prove I ship things
that work, end to end. My reader is a FlyRank reviewer deciding whether my
internship capstone counts as shipped work. They use AI daily. Write it for
their decision and no one else.
```

**Output (verbatim):**
> One question decides whether this case study earns its place: can you verify
> the work? I'm not showing you a demo of an idea. This is a working thing —
> runnable today — and what follows is what it does, what I decided, and what
> you can check yourself. If you want proof, use the live project; that's the
> point.

**Notes:**
- **What changed in the prompt:** defined the audience (the reviewer's "does this count as shipping?" decision).
- **What actually improved in the output:** it stopped explaining AI and workflow basics the reader already knows, and started anticipating the reviewer's skepticism ("can you verify the work?", "runnable today"). The audience's question now shapes every line.
- **What still failed:** there's still no project content — a reviewer reading this would find a claim, not a case study. Tone is right; substance is missing.
- **Try next:** put the real facts in — the actual problem, decisions, and outcomes of this specific project.

---

## Version 3 — layer: **real context**

**Change:** added exactly one thing — the actual facts of the project.

**Prompt:**
```
Write a portfolio case study about my project. The goal: prove I ship things
that work, end to end. My reader is a FlyRank reviewer deciding whether my
capstone counts as shipped work; they use AI daily. Here is the real project:

Monthly reports were slow and the numbers weren't trusted: figures lived in
scattered sheets, totals disagreed, and finishing meant re-checking everything
by hand. The workflow I built verifies first, then drafts — every number is
reconciled against its source before a word is written, and anything it can't
confirm is flagged UNVERIFIED instead of guessed. I stay in the loop: I review
the flags and the final draft before anything ships. The AI never decides
what's true. "Done well" = every number traceable, the company template
filled, my full review under ten minutes, zero fabricated figures.
```

**Output (verbatim):**
> This is the monthly report, done in a way I can defend. The problem was
> boring and expensive: figures in scattered sheets, totals that didn't agree,
> and every report ending with me re-checking it by hand. The workflow I built
> verifies first and drafts second — every number is reconciled to its source
> before a sentence is written, and anything it can't confirm is labeled
> UNVERIFIED, never guessed. What stays human is the call: I review the flags
> and the draft, because deciding what's true is my job, not the model's. It
> ships when the numbers trace to a source, the template is filled, and my
> review fits under ten minutes.

**Notes:**
- **What changed in the prompt:** added real context (the project's actual facts).
- **What actually improved in the output:** the biggest jump of the ladder. Now only this project could be described — "scattered sheets," "UNVERIFIED," "under ten minutes" are checkable specifics, not adjectives.
- **What still failed:** it's a wall of text. Three facts stacked in one paragraph; hard to scan, and the shape isn't visible.
- **Try next:** force an output format so the beats are visible at a glance.

---

## Version 4 — layer: **specified output format**

**Change:** added exactly one thing — a three-beat structure with a word cap.

**Prompt:**
```
Write a portfolio case study about my project. The goal: prove I ship things
that work, end to end. My reader is a FlyRank reviewer deciding whether my
capstone counts as shipped work; they use AI daily.

Real project: [the same facts as Version 3].

Format the output in three beats — (1) the problem, (2) what I did and what I
decided, (3) what came of it — with a one-line CTA at the end. Three sections,
headers allowed, about 150 words total.
```

**Output (verbatim):**
> **The problem:** Monthly reports took too long, and I didn't trust the
> numbers. Figures lived in scattered sheets, totals disagreed, and finishing
> meant re-checking everything by hand.
>
> **What I did, and decided:** I built a workflow that verifies first and
> drafts second. Every number is reconciled against its source before a word
> is written; what can't be confirmed is flagged UNVERIFIED, not guessed. I
> review the flags and the final draft — the AI never decides what's true.
>
> **What came of it:** every number traceable to a source, the company
> template filled, my review under ten minutes, zero fabricated figures.
>
> **CTA:** Try the live project →

**Notes:**
- **What changed in the prompt:** added a specified output format (three beats + headers + ~150 words).
- **What actually improved in the output:** scannability. The beats are visible at a glance; reading the headers alone tells the story. This is the format win.
- **What still failed (honest moment):** the format partly hurt. Skimming it, this could be anyone's case study — "The problem," "What I did," "What came of it" are the generic skeleton, and the wording flattened back toward template. Structure fixed the shape and cost some voice. Net gain, not a clean win.
- **Try next:** constrain the voice — ban the phrases that would never leave my mouth and demand the read-aloud check.

---

## Version 5 — layer: **constraints (voice)**

**Change:** added exactly one thing — voice constraints.

**Prompt:**
```
Write a portfolio case study about my project. The goal: prove I ship things
that work, end to end. My reader is a FlyRank reviewer deciding whether my
capstone counts as shipped work; they use AI daily.

Real project: [same facts as Version 3].

Format: three beats — problem, what I did and decided, what came of it — with
a one-line CTA. About 150 words.

Voice: direct, plain, no buzzwords, honest. Use the facts I gave, and my
words. Cut any phrase that would never come out of my mouth. Banned:
leverage, streamline, seamless, empower, cutting-edge, landscape, robust,
user-centric, results-driven, "in today's fast-paced world." Read every line
out loud before finalizing and cut anything you wouldn't say or can't stand
behind.
```

**Output (verbatim):**
> **The problem:** Monthly reports were slow, and I didn't trust the numbers.
> Figures lived in different sheets, totals disagreed, and a report wasn't
> done until I'd re-checked it by hand.
>
> **What I did, and decided:** Verify, then draft. The workflow reconciles
> every number against its source before a word is written. Anything it can't
> confirm is flagged UNVERIFIED — never guessed. What stays human is the
> judgment: I review the flags and the final draft, because the AI doesn't get
> to decide what's true.
>
> **What came of it:** every number traces to a source, the company template
> is filled, my review takes under ten minutes, and there are zero fabricated
> figures.
>
> **CTA:** Try the live project →

**Notes:**
- **What changed in the prompt:** added constraints that enforce my voice (plain words, banned buzzwords, read-aloud rule).
- **What actually improved in the output:** it reads like one person wrote it. The word swaps ("were slow," "the AI doesn't get to decide what's true," "under ten minutes") are the difference between a template and a voice you can hear. The beats survived the cut.
- **What still failed:** the third beat still reads like a checklist, and "zero fabricated figures" is a claim that only holds up if a stranger can actually verify it — the case study itself has no proof pointer yet.
- **Try next:** a verification layer — tell the model what must be checkable and to mark anything it can't prove as [UNVERIFIED], the same habit from week 1 applied to the case study itself.

---

## Final prompt — cleaned up, reusable without me in the room

```
GOAL
Write one portfolio case study that proves I ship working things, end to
end — not that I have ideas.

AUDIENCE
A FlyRank reviewer deciding whether my capstone counts as shipped work.
They use AI daily. Do not explain AI, tools, or "why automation matters."
Assume they can check technical claims.

CONTEXT (replace with your project)
My project — numbers → monthly report:
- Monthly reports were slow and the numbers weren't trusted: figures in
  scattered sheets, totals that disagreed, and a report wasn't done until
  I re-checked it by hand.
- The workflow verifies first, drafts second: every number is reconciled
  against its source before a word is written.
- Anything it can't confirm is flagged UNVERIFIED, never guessed.
- I stay in the loop: I review the flags and the final draft before
  anything ships. The AI never decides what's true.
- "Done well" = every number traceable to a source, the company template
  filled, my review under ten minutes, zero fabricated figures.

FORMAT
Three beats, in this order, with headers:
  1. The problem
  2. What I did, and what I decided
  3. What came of it
End with a one-line CTA. About 150 words total.

VOICE
Direct, plain, no buzzwords, honest. Use the facts I gave and my words.
Cut any phrase that would never come out of my mouth. Banned: leverage,
streamline, seamless, empower, cutting-edge, landscape, robust,
user-centric, results-driven, "in today's fast-paced world."

TRUTH RULES
- Every claim must trace to the Context above.
- If you don't have a fact, write [UNVERIFIED] instead of inventing one.
- No invented names, numbers, dates, or outcomes.
- Read the final draft out loud once; cut anything you would never say.
```

---

## Verification against the pass criteria

| Pass criterion | Where it's met |
|---|---|
| Six runs (baseline + five versions), each tied to one named layer | Baseline → V1 goal → V2 audience → V3 context → V4 format → V5 constraints. One layer per version. |
| Notes describe changes in the **output**, not just the prompt | "What actually improved" notes document output behaviour (e.g. V2: "stopped explaining AI basics"; V4: "readability rose"). |
| At least one honest failure moment | V4: the format improved shape but flattened the voice — stated as a cost, not a win. |
| Final prompt works for a stranger | Final prompt is self-contained: goal, audience, replaceable context, format, voice, and truth rules it can run without me. |

---

## Evidence links
- Repo: `flyrank-ai-fluency-track` (this file: `FL-05_Prompt_Ladder.md`).
- Folder: `C:\trak num2` — alongside FL-01..FL-04.