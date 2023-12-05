import path from 'node:path'
import fs from 'node:fs/promises'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { html2jste } from './lib/html2jste.js'

const argv = yargs(hideBin(process.argv)).argv
const [
  input = argv.input,
  output = argv.output,
  type = argv.type,
] = argv._

if(!input) {
  throw new Error('The "input" argument is required')
}

/**
 * @param {string} input
 * @param {string} output
 * @param {string} type
 * @return {Promise<void>}
 */
async function convert(input, output, type) {
  const inputPath = path.join(process.cwd(), input)
  const html = await fs.readFile(inputPath, 'utf-8')
  const result = html2jste(html, type) + '\n'
  if(!output) {
    process.stdout.write(result)
    return
  }
  const outputPath = path.join(process.cwd(), output)
  await fs.writeFile(outputPath, result)
}

void convert(input, output, type)
