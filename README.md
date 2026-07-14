# HoarePrompt — project website

The public research page for *HoarePrompt: Structural Reasoning About Program Correctness in Natural Language*, an ACM Distinguished Paper Award recipient at ICSE 2026.

`hoareprompt.tex` and `HoarePrompt.pdf` are the sources of truth for paper claims, author details, and benchmark scope. The public paper link points to [arXiv:2503.19599](https://arxiv.org/abs/2503.19599), and the artifact link points to [github.com/msv-lab/HoarePrompt](https://github.com/msv-lab/HoarePrompt).

## Preview locally

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>. Run `npm test` to check the public-page contract and GitHub Pages workflow.

## Deployment

`.github/workflows/pages.yml` publishes the repository root after commits reach `main`. In the repository's GitHub Pages settings, select **GitHub Actions** as the build and deployment source.
