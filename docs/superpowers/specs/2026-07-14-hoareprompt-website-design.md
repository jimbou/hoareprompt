# HoarePrompt Research Website Design

## Goal

Build the public project website for *HoarePrompt: Structural Reasoning About Program Correctness in Natural Language*, an ACM Distinguished Paper Award recipient at ICSE 2026. The site must follow the existing Gordian paper website's template and visual format while replacing all Gordian-specific content with claims and resources from the supplied HoarePrompt paper, presentation, and logo.

## Reference and source material

- `/home/jim/gordian/website/` is the structural, visual, and interaction reference.
- `HoarePrompt.pdf` is the source of truth for the publication, claims, results, author list, and citation.
- `Hoareprompt ICSE (1).pdf` supplies the public presentation and concise explanatory framing.
- `hoareprompt.tex` supplies archival metadata, affiliations, emails, and the DOI.
- `hoareprompt_logo.png` is the project mark.
- `https://github.com/msv-lab/HoarePrompt` is the public artifact repository.

## Architecture

The website is a dependency-free static site served from the repository root. It consists of:

- `index.html` for semantic page structure and all research content.
- `styles.css`, based on the Gordian stylesheet, for the same typography, grid, responsive behavior, cards, figures, and color system.
- `script.js`, based on the Gordian script, for scroll progress, citation copying, reveal animations, and progressive-enhancement fallbacks.
- `assets/hoareprompt-logo.png` for header and footer branding.
- Local paper and presentation PDFs linked from the hero and navigation.
- `.github/workflows/pages.yml` for GitHub Pages deployment from the repository root.

No framework, build step, analytics, or third-party runtime JavaScript is needed. Google Fonts remain the only externally hosted presentation dependency, matching the reference site.

## Page structure and content

### Navigation and hero

Retain the Gordian top bar, section navigation, scroll progress indicator, two-column hero, and action styles. Replace the brand with HoarePrompt and its supplied logo. The hero identifies the paper as an ACM Distinguished Paper Award recipient at ICSE 2026, shows the full paper title and all five authors, and links to:

- the local paper PDF;
- the local ICSE presentation PDF;
- the public HoarePrompt artifact repository.

The summary note explains the central idea: use natural-language descriptions of reachable program states to give LLM correctness judgments the structure of Hoare-style reasoning.

### Abstract

Use a faithful, concise version of the published abstract. It must explain the problem, strongest-postcondition inspiration, natural postconditions, loop handling through few-shot-driven k-induction, and correctness classification.

### Approach

Map the reference site's three strategy cards to the three key stages of HoarePrompt:

1. Natural Hoare triples express preconditions and postconditions in natural language.
2. Compositional natural strongest postconditions propagate reachable-state descriptions statement by statement.
3. Few-shot-driven k-induction handles loops before an annotated program is passed to a correctness classifier.

Retain the three worked-example blocks and adapt their internal panels to show:

1. conversion of a code statement and natural precondition into a natural strongest postcondition;
2. compositional propagation across a short sequence of statements;
3. loop unrolling, induction/generalization, and final correctness assessment.

The examples use HTML/CSS and text rather than rasterized presentation screenshots so they remain responsive, accessible, and visually consistent with the Gordian template.

### Evidence

Retain the benchmark grid and results callout. The three benchmark cards report the CoCoClaNeL scope:

- 645 submissions;
- 163 problems;
- 46 Codeforces contests from 2024.

The results callout reports the paper's average MCC improvements: 61% over Zero-shot-CoT, 72% over Vanilla, and 106% over the LLM-based Tester classifier. Supporting copy may also mention the 26% gain from inductive loop reasoning and the no-unroll cost/quality trade-off.

### Citation

Provide a copyable ICSE 2026 BibTeX entry using DOI `10.1145/3744916.3773206`, all five authors, the conference title, dates, and location. Link the DOI and local paper.

### People

List all five authors with the affiliations and email addresses from the paper:

- Dimitrios Stamatios Bouras — Peking University;
- Yihan Dai — Peking University;
- Tairan Wang — University College London;
- Yingfei Xiong — Peking University;
- Sergey Mechtaev — Peking University, corresponding author.

Use known public links from the reference site for Dimitrios and Sergey. Add Yingfei Xiong's supplied website and Google Scholar links. Do not invent profile links for Yihan Dai or Tairan Wang.

### Footer

Retain the reference footer composition with the HoarePrompt brand, shortened title, and DOI link.

## Interaction and accessibility

- Preserve the skip link, landmarks, semantic headings, accessible navigation, and textual descriptions of diagrams.
- Preserve responsive layouts for desktop, tablet, and mobile.
- Preserve reduced-motion support and make content visible without JavaScript.
- Citation copying must use the Clipboard API where available and the reference site's fallback otherwise.
- External links open in a new tab with `rel="noopener"`; local PDFs may open directly.
- The tall project logo must use `object-fit: contain` so it remains legible without distorting the navigation height.

## Deployment

The Pages workflow runs on pushes to `main` that affect site files or the workflow itself, supports manual dispatch, configures Pages, uploads the repository root as the static artifact, and deploys it with the standard official GitHub actions. A `.nojekyll` file prevents unwanted Jekyll processing.

## Verification

Automated contract tests will check:

- required sections, navigation targets, paper/slides/artifact links, author names, DOI, award text, and key result claims;
- absence of stale Gordian research content;
- local asset references resolve;
- the Pages workflow uploads the repository root and has required permissions;
- the JavaScript parses successfully.

The finished page will also be served locally and inspected at desktop and mobile viewport sizes for visual regressions, overflow, readability, and correct logo treatment.
