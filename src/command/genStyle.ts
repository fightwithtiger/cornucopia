import { inspect } from 'util'
import vscode from 'vscode'
import { parse } from '@babel/parser'
// import fs from 'fs'
import { genStyleText, getJSXElements, jsx2ClassNameTree } from '../core'
import { formatScss, getSelectedText, writeToClipboard } from '../utils'

export default async function genStyle() {
  try {
    const sourceCode = `
    function Component() {
      return (<>${getSelectedText()}</>)
    }
    `

    const ast = parse(sourceCode, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
      ],
    })

    const jsxElementNodes = getJSXElements(ast)
    const classMap = jsx2ClassNameTree(jsxElementNodes)

    // fs.writeFileSync('E:\\work\\demo\\vscode-ext-demo\\demo\\classMap.json', JSON.stringify(classMap))

    let str = ''
    for (const item of classMap.children) {
      str += genStyleText(item)
    }

    const scssCode = await formatScss(str)
    writeToClipboard(scssCode)

    vscode.window.showInformationMessage('Successfully wrote to clipboard')
  } catch (e) {
    console.error(`e: ${inspect(e)}`)
    vscode.window.showErrorMessage('Please check your JSX syntax')
  }
}
