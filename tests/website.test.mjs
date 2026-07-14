import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const rootUrl = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, rootUrl), 'utf8');

test('publishes the named paper, artifacts, award, and arXiv citation', async () => {
  const html = await read('index.html');

  assert.match(html, /<h1>HoarePrompt:/);
  assert.match(html, /ACM Distinguished Paper Award/);
  assert.match(html, /https:\/\/arxiv\.org\/abs\/2503\.19599/);
  assert.match(html, /https:\/\/github\.com\/msv-lab\/HoarePrompt/);
  assert.doesNotMatch(html, /Hoareprompt ICSE \(1\)\.pdf|10\.1145\/3744916\.3773206/);
});

test('publishes the paper results and CoCoClaNeL scope', async () => {
  const html = await read('index.html');

  assert.match(html, /645/);
  assert.match(html, /163/);
  assert.match(html, /46/);
  assert.match(html, /61%/);
  assert.match(html, /72%/);
  assert.match(html, /106%/);
  assert.match(html, /26%/);
  assert.match(html, /CoCOCLaNeL/);
});

test('credits every author and exposes the supplied public profiles', async () => {
  const html = await read('index.html');
  const authors = [
    'Dimitrios Stamatios Bouras',
    'Yihan Dai',
    'Tairan Wang',
    'Yingfei Xiong',
    'Sergey Mechtaev',
  ];

  for (const author of authors) assert.match(html, new RegExp(author));
  assert.match(html, /https:\/\/xiongyingfei\.github\.io\//);
  assert.match(html, /kiG3fBsAAAAJ/);
  assert.match(html, /Ra2pxQUAAAAJ/);
});

test('explains few-shot k-induction with the presentation example', async () => {
  const html = await read('index.html');

  assert.match(html, /cur_num &lt; n/);
  assert.match(html, /sum_n = sum_n \+ cur_num/);
  assert.match(html, /cur_num is 1, sum_n is 1/);
  assert.match(html, /cur_num is 2, sum_n is 3/);
  assert.match(html, /few-shot examples/i);
});

test('gives the award line more visual weight than the reference eyebrow', async () => {
  const css = await read('styles.css');

  assert.match(css, /\.hero \.eyebrow\s*\{[^}]*font-size:\s*0\.9rem/s);
});

test('keeps the reference structure accessible and progressively enhanced', async () => {
  const [html, css, script] = await Promise.all([
    read('index.html'),
    read('styles.css'),
    read('script.js'),
  ]);

  assert.match(html, /class="skip-link"/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /role="img"/);
  assert.equal((html.match(/class="example-figure/g) ?? []).length, 3);
  assert.equal((html.match(/class="example-explanation"/g) ?? []).length, 3);
  assert.match(html, /id="copy-cite"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(script, /copy-cite/);
});

test('contains no stale Gordian research content', async () => {
  const html = await read('index.html');

  assert.doesNotMatch(html, /LogicBombs|Flight-ID|Ring-shaped skiplist|Gordian/);
});

test('references supplied local assets that exist', async () => {
  for (const path of [
    'assets/hoareprompt-logo.png',
    'HoarePrompt.pdf',
    'Hoareprompt ICSE (1).pdf',
  ]) {
    await access(new URL(path, rootUrl));
  }
});

test('uses the published HoarePrompt mark for the tab and wordmarks', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.match(html, /href="assets\/hoareprompt-logo\.png"/);
  assert.equal((html.match(/src="assets\/hoareprompt-logo\.png"/g) ?? []).length, 3);
  assert.match(
    html,
    /<aside class="hero-note"[^>]*>\s*<img class="hero-note-mark"[^>]*>\s*<p class="note-kicker">The HoarePrompt idea<\/p>/s,
  );
  assert.match(css, /\.hero-note-mark\s*\{[^}]*width:\s*118px;[^}]*height:\s*163px;/s);
});

test('deploys the repository root with GitHub Pages Actions', async () => {
  const workflow = await read('.github/workflows/pages.yml');

  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /path: \./);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});
