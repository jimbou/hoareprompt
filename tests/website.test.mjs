import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const rootUrl = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, rootUrl), 'utf8');

test('publishes the paper, presentation, artifacts, award, and citation', async () => {
  const html = await read('index.html');

  assert.match(html, /ACM Distinguished Paper Award/);
  assert.match(html, /HoarePrompt\.pdf/);
  assert.match(html, /Hoareprompt ICSE \(1\)\.pdf/);
  assert.match(html, /https:\/\/github\.com\/msv-lab\/HoarePrompt/);
  assert.match(html, /10\.1145\/3744916\.3773206/);
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
    'hoareprompt_logo.png',
    'HoarePrompt.pdf',
    'Hoareprompt ICSE (1).pdf',
  ]) {
    await access(new URL(path, rootUrl));
  }
});
