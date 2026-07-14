# HoarePrompt Research Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a HoarePrompt research website that preserves the Gordian paper site's template while publishing the supplied ICSE 2026 paper, slides, artifacts, award, results, citation, and authors.

**Architecture:** A dependency-free static site is served directly from the repository root. Semantic HTML contains all content; the reference stylesheet and small progressive-enhancement script provide the established Gordian presentation and interactions; Node's built-in test runner verifies the public contract and the GitHub Pages workflow deploys the root directory.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, GitHub Actions/Pages.

---

## File map

- Create `index.html`: complete semantic research page and links.
- Create `styles.css`: Gordian-derived responsive presentation plus HoarePrompt-specific flow adjustments.
- Create `script.js`: scroll progress, citation-copying, and reveal behavior.
- Create `tests/website.test.mjs`: static public-contract, accessibility, stale-content, and deployment tests.
- Create `package.json`: local test command.
- Create `.github/workflows/pages.yml`: root-directory GitHub Pages deployment.
- Create `.nojekyll`: disable Jekyll processing.
- Create `README.md`: preview, source-of-truth, resource, and deployment instructions.
- Reuse `hoareprompt_logo.png`, `HoarePrompt.pdf`, and `Hoareprompt ICSE (1).pdf` in place so the supplied originals remain the published assets.

### Task 1: Establish the static-site contract

**Files:**
- Create: `tests/website.test.mjs`
- Create: `package.json`

- [ ] **Step 1: Write the failing content and accessibility tests**

Create tests that load root files with:

```js
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const rootUrl = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, rootUrl), 'utf8');

test('publishes the HoarePrompt paper, presentation, artifacts, award, and citation', async () => {
  const html = await read('index.html');
  assert.match(html, /ACM Distinguished Paper Award/);
  assert.match(html, /HoarePrompt\.pdf/);
  assert.match(html, /Hoareprompt ICSE \(1\)\.pdf/);
  assert.match(html, /https:\/\/github\.com\/msv-lab\/HoarePrompt/);
  assert.match(html, /10\.1145\/3744916\.3773206/);
  assert.match(html, /61%/);
  assert.match(html, /72%/);
  assert.match(html, /106%/);
});

test('credits all authors and exposes only supplied public profiles', async () => {
  const html = await read('index.html');
  for (const author of ['Dimitrios Stamatios Bouras', 'Yihan Dai', 'Tairan Wang', 'Yingfei Xiong', 'Sergey Mechtaev']) {
    assert.match(html, new RegExp(author));
  }
  assert.match(html, /https:\/\/xiongyingfei\.github\.io\//);
  assert.match(html, /kiG3fBsAAAAJ/);
});

test('keeps the reference structure accessible and progressively enhanced', async () => {
  const [html, css, script] = await Promise.all([read('index.html'), read('styles.css'), read('script.js')]);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /<main id="main-content">/);
  assert.equal((html.match(/class="example-figure/g) ?? []).length, 3);
  assert.match(html, /id="copy-cite"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(script, /copy-cite/);
  assert.doesNotMatch(html, /LogicBombs|Flight-ID|Ring-shaped skiplist|Gordian/);
});

test('references local assets that exist', async () => {
  for (const path of ['hoareprompt_logo.png', 'HoarePrompt.pdf', 'Hoareprompt ICSE (1).pdf']) {
    await access(new URL(path, rootUrl));
  }
});
```

- [ ] **Step 2: Add the test command**

Create `package.json`:

```json
{
  "name": "hoareprompt-paper-site",
  "private": true,
  "scripts": {
    "test": "node --test tests/website.test.mjs"
  }
}
```

- [ ] **Step 3: Run the tests and verify the intended failure**

Run: `npm test`

Expected: FAIL because `index.html`, `styles.css`, and `script.js` do not exist.

- [ ] **Step 4: Commit the test contract without including the user's staged source assets**

Run:

```bash
git add package.json tests/website.test.mjs
git commit --only package.json tests/website.test.mjs -m "test: define HoarePrompt website contract"
```

### Task 2: Build the research page

**Files:**
- Create: `index.html`

- [ ] **Step 1: Implement the page shell and hero**

Use the Gordian document head, font imports, skip link, progress bar, top navigation, hero grid, and summary-note markup. Substitute:

```html
<p class="eyebrow">ACM Distinguished Paper Award · ICSE 2026</p>
<h1>Structural reasoning about program correctness <em>in natural language.</em></h1>
<div class="hero-actions">
  <a class="button button-primary" href="HoarePrompt.pdf">Read the paper <span aria-hidden="true">↗</span></a>
  <a class="button button-secondary" href="Hoareprompt ICSE (1).pdf">View ICSE slides <span aria-hidden="true">↗</span></a>
  <a class="button button-secondary" href="https://github.com/msv-lab/HoarePrompt" target="_blank" rel="noopener">Artifacts <span aria-hidden="true">↗</span></a>
</div>
```

Use `hoareprompt_logo.png` for favicon, header wordmark, and footer wordmark.

- [ ] **Step 2: Implement abstract and approach cards**

Add the concise published abstract and three reference-style strategy cards titled:

```html
<h3>Natural Hoare triples</h3>
<h3>Compositional NSP</h3>
<h3>Few-shot k-induction</h3>
```

Each card defines what it receives, produces, and contributes to correctness classification.

- [ ] **Step 3: Implement three worked examples**

Retain three `<figure class="example-figure reveal">` blocks and the reference classes. Render these concrete flows:

```text
{x is a full name} → x = x.split()[0] → {x is the first name}
{numbers are unread} → numbers = list(map(int, input().split())) → {numbers is an integer list}
loop pre-state → k = 3 unrollings → generalized postcondition → annotated correctness judgment
```

Each figure must include a meaningful `role="img"` description, three explanatory columns, and a caption distinguishing natural-language semantic reasoning from execution or formal proof.

- [ ] **Step 4: Implement evidence, citation, people, and footer**

Add benchmark cards for `645 submissions`, `163 problems`, and `46 Codeforces contests`. Add the MCC callout and a copyable citation:

```bibtex
@inproceedings{bouras2026hoareprompt,
  author    = {Dimitrios Stamatios Bouras and Yihan Dai and Tairan Wang and Yingfei Xiong and Sergey Mechtaev},
  title     = {HoarePrompt: Structural Reasoning About Program Correctness in Natural Language},
  booktitle = {Proceedings of the 48th IEEE/ACM International Conference on Software Engineering},
  year      = {2026},
  doi       = {10.1145/3744916.3773206}
}
```

Create five person cards from the paper's affiliations and emails. Use the supplied Yingfei profile links and the already established Dimitrios/Sergey links from the reference site.

- [ ] **Step 5: Run the contract tests**

Run: `npm test`

Expected: the HTML assertions pass; CSS/script reads still fail until Task 3.

### Task 3: Reproduce the reference presentation and behavior

**Files:**
- Create: `styles.css`
- Create: `script.js`
- Modify: `index.html`

- [ ] **Step 1: Copy the reference stylesheet as the exact presentation baseline**

Copy `/home/jim/gordian/website/styles.css` to `styles.css`. Preserve its variables, typography, breakpoints, grids, panels, reduced-motion rules, and focus states.

- [ ] **Step 2: Add only required HoarePrompt layout adaptations**

Append focused rules for the portrait logo, three hero buttons, five-person grid, and loop-flow block:

```css
.wordmark-mark { object-fit: contain; }
.hero-actions { flex-wrap: wrap; }
.people-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.person:last-child:nth-child(odd) { grid-column: 1 / -1; }
@media (max-width: 720px) {
  .people-grid { grid-template-columns: 1fr; }
  .person:last-child:nth-child(odd) { grid-column: auto; }
}
```

Reuse existing flow classes wherever possible; add a small `.induction-flow` grid only if the third worked example cannot be expressed with the existing `.example-flow` or `.inversion-flow` classes.

- [ ] **Step 3: Copy and simplify the progressive-enhancement script**

Copy the reference `script.js`, retaining scroll progress, citation copying, reduced-motion detection, reveal observation, and the final visibility fallback. Remove the obsolete artifact-dialog trigger because artifacts are a direct public link.

- [ ] **Step 4: Verify behavior tests and syntax**

Run: `npm test`

Expected: PASS for all website contract tests.

Run: `node --check script.js`

Expected: exit code 0 with no output.

- [ ] **Step 5: Commit the site implementation without including unrelated staged originals**

Run:

```bash
git add index.html styles.css script.js
git commit --only index.html styles.css script.js -m "feat: build HoarePrompt research website"
```

### Task 4: Add root GitHub Pages deployment

**Files:**
- Modify: `tests/website.test.mjs`
- Create: `.github/workflows/pages.yml`
- Create: `.nojekyll`

- [ ] **Step 1: Add a failing workflow contract test**

Append:

```js
test('deploys the repository root with GitHub Pages Actions', async () => {
  const workflow = await read('.github/workflows/pages.yml');
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /path: \./);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
```

- [ ] **Step 2: Run the workflow test and verify it fails**

Run: `npm test`

Expected: FAIL with `ENOENT` for `.github/workflows/pages.yml`.

- [ ] **Step 3: Create the Pages workflow**

Create a workflow triggered by pushes to `main` and manual dispatch, with `contents: read`, `pages: write`, and `id-token: write`. Use checkout v4, configure-pages v5, upload-pages-artifact v3 with `path: .`, and deploy-pages v4. Exclude no files at upload time because the repository root is the intended site root.

- [ ] **Step 4: Add `.nojekyll` and rerun tests**

Create the empty `.nojekyll` file.

Run: `npm test`

Expected: PASS for every test.

- [ ] **Step 5: Commit deployment files**

Run:

```bash
git add .github/workflows/pages.yml .nojekyll tests/website.test.mjs
git commit --only .github/workflows/pages.yml .nojekyll tests/website.test.mjs -m "ci: deploy website with GitHub Pages"
```

### Task 5: Document and visually verify the release

**Files:**
- Create: `README.md`

- [ ] **Step 1: Add project and preview documentation**

Document the paper title, ICSE 2026 award, source-of-truth files, public artifact URL, local preview command `python3 -m http.server 8080`, test command `npm test`, and Pages setup requirement to select GitHub Actions as the deployment source.

- [ ] **Step 2: Start a local static server**

Run: `python3 -m http.server 8080`

Expected: server listens on port 8080 and serves `index.html` from the repository root.

- [ ] **Step 3: Inspect desktop and mobile renderings**

Capture the page at approximately 1440×900 and 390×844. Check navigation, hero wrapping, logo containment, all three approach cards, all three diagrams, five author cards, citation overflow, and footer. Correct only template regressions or overflow problems found during inspection.

- [ ] **Step 4: Run final automated verification**

Run: `npm test`

Expected: all tests pass.

Run: `node --check script.js`

Expected: exit code 0 with no output.

Run: `git diff --check`

Expected: exit code 0 with no whitespace errors.

- [ ] **Step 5: Commit documentation**

Run:

```bash
git add README.md
git commit --only README.md -m "docs: document HoarePrompt website"
```
