import { inspect } from 'util'
import { basename } from 'path'
import vscode from 'vscode'
import { parse } from '@babel/parser'
// import fs from 'fs'
import { compile } from 'vue-template-compiler'
import { genStyleText, getJSXElements, jsx2ClassNameTree, vueTemplate2ClassNameTree } from '../core'
import { formatScss, getCurrentFilePath, getSelectedText, isHtmlFile, isVueFile, writeToClipboard } from '../utils'

export default async function genStyle() {
  try {
    let classMap = { children: [] }
    const fileName = basename(getCurrentFilePath())
    if (isVueFile(fileName) || isHtmlFile(fileName)) {
      const { ast } = compile(`<template>${getSelectedText()}</template`)
      classMap = vueTemplate2ClassNameTree(ast)
    } else {
      const ast = parse(`
      function Component() {
        return (<>${getSelectedText()}</>)
      }
      `, {
        sourceType: 'module',
        plugins: [
          'jsx',
          'typescript',
        ],
      })
      const jsxElementNodes = getJSXElements(ast)
      classMap = jsx2ClassNameTree(jsxElementNodes)
    }

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
    vscode.window.showErrorMessage('Please check your syntax or your file suffix, support: tsx, jsx, vue, html')
  }
}
