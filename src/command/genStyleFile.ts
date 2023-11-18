import { inspect } from 'util'
import { dirname, resolve } from 'path'
import fs from 'fs-extra'
import vscode from 'vscode'
import { parse } from '@babel/parser'
import { genStyleText, getImportDeclarations, getJSXElements, jsx2ClassNameTree } from '../core'
import { formatScss, getActiveDocumentText } from '../utils'

export default async function genStyleFile() {
  try {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      throw new Error('No active text editor')
    }
    const sourceCode = getActiveDocumentText()
    const ast = parse(sourceCode, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
      ],
    })
    const currentFileDirectory = editor.document.uri.fsPath
    if (!currentFileDirectory) {
      return
    }

    const importDeclarations = getImportDeclarations(ast)
    const fileMap: any = {}
    for (const i of importDeclarations) {
      const relativePath = i.source.value
      if (!relativePath || !relativePath.includes('scss')) {
        continue
      }
      const key = i.specifiers[0]?.local.name
      if (key) {
        const dir = dirname(currentFileDirectory)
        const absolutePath = resolve(dir, relativePath)
        if (!fs.existsSync(absolutePath)) {
          fileMap[key] = {
            relativePath,
            absolutePath,
          }
        }
      }
    }

    if (Object.keys(fileMap).length === 0) {
      return
    }

    const jsxElementNodes = getJSXElements(ast)
    const classMap = jsx2ClassNameTree(jsxElementNodes)

    for (const key in fileMap) {
      let str = ''
      for (const item of classMap.children) {
        str += genStyleText(item, key)
      }
      const { absolutePath } = fileMap[key]
      const dir = dirname(absolutePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      const scssCode = await formatScss(str)
      fs.writeFile(absolutePath, scssCode)
    }

    vscode.window.showInformationMessage('Successfully created')
  } catch (e) {
    console.error(`e: ${inspect(e)}`)
    vscode.window.showErrorMessage('Please check your JSX syntax')
  }
}
