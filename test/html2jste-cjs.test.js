import test from 'ava'
import { html2jste } from '../lib/html2jste.js'

test('element', t => {
  const html = '<div></div>'
  const sample = `
const { div } = require('jste')

module.exports = () => div()
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('void element', t => {
  const html = '<input>'
  const sample = `
const { input } = require('jste')

module.exports = () => input()
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('attributes', t => {
  const html = '<div id="id1" class="App"></div>'
  const sample = `
const { div } = require('jste')

module.exports = () => div({
  id : 'id1',
  className : 'App',
})
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('quoted attribute', t => {
  const html = `<span aria-label="the 'quot' example"></span>`
  const sample = `
const { span } = require('jste')

module.exports = () => span({
  'aria-label' : 'the 'quot' example',
})
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('attribute + text child', t => {
  const html = '<div role="heading">Hello world!</div>'
  const sample = `
const { div } = require('jste')

module.exports = () => div({
  role : 'heading',
  children : 'Hello world!',
})
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('text child', t => {
  const html = '<h1>Hello world!</h1>'
  const sample = `
const { h1 } = require('jste')

module.exports = () => h1('Hello world!')
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('children: elements', t => {
  const html = '<ul><li>One</li><li>Two</li><li>Three</li></ul>'
  const sample = `
const { li, ul } = require('jste')

module.exports = () => ul([
  li('One'),
  li('Two'),
  li('Three'),
])
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})

test('complex', t => {
  const html = `
<form action="//google.com/search" target="_blank">
    <label>
        Search 
        <input type="search" name="q">
    </label>
    <button>Find</button>
</form>
`.trim()
  const sample = `
const { button, form, input, label } = require('jste')

module.exports = () => form({
  action : '//google.com/search',
  target : '_blank',
  children : [
    label([
      'Search ',
      input({
        type : 'search',
        name : 'q',
      }),
    ]),
    button('Find'),
  ],
})
`.trim()

  t.is(html2jste(html, 'cjs'), sample)
})
