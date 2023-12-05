import path from 'node:path'
import fs from 'node:fs/promises'
import test from 'ava'
import { html2jste } from '../lib/html2jste.js'

async function loadSample(name) {
  const filename = path.join('samples', name)
  const url = new URL(filename, import.meta.url)
  return fs.readFile(url.pathname, 'utf-8')
}

test('element', t => {
  const html = '<div></div>'
  t.snapshot(html2jste(html))
})

test('void element', t => {
  const html = '<input>'
  t.snapshot(html2jste(html))
})

test('attributes', t => {
  const html = '<div id="id1" class="App"></div>'
  t.snapshot(html2jste(html))
})

test('attribute value with quotes', t => {
  const html = `<span aria-label="the 'quot' example"></span>`
  t.snapshot(html2jste(html))
})

test('attribute and text child', t => {
  const html = '<div role="heading">Hello world!</div>'
  t.snapshot(html2jste(html))
})

test('text child', t => {
  const html = '<h1>Hello world!</h1>'
  t.snapshot(html2jste(html))
})

test('child elements', t => {
  const html = '<ul><li>One</li><li>Two</li><li>Three</li></ul>'
  t.snapshot(html2jste(html))
})

test('complex', async t => {
  const html = await loadSample('complex.html')
  t.snapshot(html2jste(html))
})

test('commonjs support', t => {
  const html = '<div></div>'
  t.snapshot(html2jste(html, 'cjs'))
})
