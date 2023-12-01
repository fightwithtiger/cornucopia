import vscode from 'vscode'

export function writeToClipboard(text: string) {
  vscode.env.clipboard.writeText(text)
}

export function isVueFile(fileName: string) {
  return /\.vue$/.test(fileName)
}

export function isHtmlFile(fileName: string) {
  return /\.html$/.test(fileName)
}
