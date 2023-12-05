import window from './window.js'
import { node2jste } from './node2jste.js'

const { DOMParser } = window
const parser = new DOMParser
const DOCTYPE_RE = /^<!doctype\shtml>/i

/**
 * @param {string} html
 * @param {string} type
 * @return {string}
 */
export function html2jste(html, type = 'esm') {
  const document = parser.parseFromString(html, 'text/html')
  const doctype = DOCTYPE_RE.test(html)
  const root = doctype ?
    document.documentElement :
    document.body.firstChild || document.head.firstChild
  const imports = new Set
  const body = node2jste(root, '', imports, doctype)
  const head = Array.from(imports).sort().join(', ')
  return type === 'esm' ?
    `import { ${ head } } from 'jste'\n\nexport default () => ${ body }` :
    `const { ${ head } } = require('jste')\n\nmodule.exports = () => ${ body }`
}
