import vscode from 'vscode'

export function writeToClipboard(text: string) {
  vscode.env.clipboard.writeText(text)
}
