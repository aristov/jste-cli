import window from './window.js'

const { Node } = window
const attrNameMap = {
  'accept-charset' : 'acceptCharset',
  accesskey : 'accessKey',
  allowfullscreen : 'allowFullScreen',
  class : 'className',
  colspan : 'colSpan',
  contenteditable : 'contentEditable',
  crossorigin : 'crossOrigin',
  datetime : 'dateTime',
  checked : 'defaultChecked',
  muted : 'defaultMuted',
  selected : 'defaultSelected',
  value : 'defaultValue',
  dirname : 'dirName',
  formaction : 'formAction',
  formenctype : 'formEnctype',
  formmethod : 'formMethod',
  formnovalidate : 'formNoValidate',
  formtarget : 'formTarget',
  for : 'htmlFor',
  'http-equiv' : 'httpEquiv',
  inputmode : 'inputMode',
  ismap : 'isMap',
  maxlength : 'maxLength',
  minlength : 'minLength',
  nomodule : 'noModule',
  novalidate : 'noValidate',
  readonly : 'readOnly',
  referrerpolicy : 'referrerPolicy',
  rowspan : 'rowSpan',
  tabindex : 'tabIndex',
  usemap : 'useMap',
}

/**
 * @param {Element|Text} node
 * @param {string} indent
 * @param {Set} imports
 * @param {boolean} doctype
 * @return {string}
 */
export function node2jste(node, indent, imports, doctype) {
  let chunk
  if(node.nodeType === Node.TEXT_NODE) {
    return `'${ node.data.replace(/\n\s*/g, '') }'`
  }
  if(node.nodeType !== Node.ELEMENT_NODE) {
    return ''
  }
  imports.add(node.localName)
  let result = node.localName + '('
  if(!node.attributes.length && !node.childNodes.length) {
    return result + ')'
  }
  let child
  if(!node.attributes.length) {
    if(node.childNodes.length === 1) {
      chunk = node2jste(node.childNodes[0], indent, imports)
      return result + chunk + ')'
    }
    result += '['
    for(child of node.childNodes) {
      if(child.data?.trim() === '') {
        continue
      }
      chunk = node2jste(child, indent + '  ', imports)
      if(chunk) {
        result += `\n  ${ indent + chunk },`
      }
    }
    return result + `\n${ indent }])`
  }
  result += '{'
  if(doctype) {
    result += `\n  ${ indent }doctype : true,`
  }
  let attr, name, value
  for(attr of node.attributes) {
    name = attrNameMap[attr.name] || attr.name
    name = /-/.test(name) ? `'${ name }'` : name
    value = attr.value.replace(/'/g, '\\\'')
    result += `\n  ${ indent + name } : '${ value }',`
  }
  if(!node.childNodes.length) {
    return result + `\n${ indent }})`
  }
  if(node.childNodes.length === 1) {
    chunk = node2jste(node.childNodes[0], indent + '  ', imports)
    return result + `\n  ${ indent }children : ${ chunk },\n${ indent }})`
  }
  result += `\n  ${ indent }children : [`
  for(child of node.childNodes) {
    if(child.data?.trim() === '') {
      continue
    }
    chunk = node2jste(child, indent + '    ', imports)
    result += `\n    ${ indent + chunk },`
  }
  result += `\n  ${ indent }],`
  return result + `\n${ indent }})`
}
