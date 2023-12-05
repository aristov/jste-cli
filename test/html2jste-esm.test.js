import test from 'ava'
import { html2jste } from '../lib/html2jste.js'

test('element', t => {
  const html = '<div></div>'
  const sample = `
import { div } from 'jste'

export default () => div()
`.trim()

  t.is(html2jste(html, 'esm'), sample)
})

test('void element', t => {
  const html = '<input>'
  const sample = `
import { input } from 'jste'

export default () => input()
`.trim()

  t.is(html2jste(html, 'esm'), sample)
})

test('attributes', t => {
  const html = '<div id="id1" class="App"></div>'
  const sample = `
import { div } from 'jste'

export default () => div({
  id : 'id1',
  className : 'App',
})
`.trim()

  t.is(html2jste(html, 'esm'), sample)
})

test('quoted attribute', t => {
  const html = `<span aria-label="the 'quot' example"></span>`
  const sample = `
import { span } from 'jste'

export default () => span({
  'aria-label' : 'the \\'quot\\' example',
})
`.trim()

  t.is(html2jste(html, 'esm'), sample)
})

test('attribute + text child', t => {
  const html = '<div role="heading">Hello world!</div>'
  const sample = `
import { div } from 'jste'

export default () => div({
  role : 'heading',
  children : 'Hello world!',
})
`.trim()

  t.is(html2jste(html, 'esm'), sample)
})

test('text child', t => {
  const html = '<h1>Hello world!</h1>'
  const sample = `
import { h1 } from 'jste'

export default () => h1('Hello world!')
`.trim()

  t.is(html2jste(html, 'esm'), sample)
})

test('children: elements', t => {
  const html = '<ul><li>One</li><li>Two</li><li>Three</li></ul>'
  const sample = `
import { li, ul } from 'jste'

export default () => ul([
  li('One'),
  li('Two'),
  li('Three'),
])
`.trim()

  t.is(html2jste(html, 'esm'), sample)
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
import { button, form, input, label } from 'jste'

export default () => form({
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

  t.is(html2jste(html, 'esm'), sample)
})
