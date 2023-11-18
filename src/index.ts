import vscode from 'vscode'
import commandSource from './command'

type CommandSourceKey = keyof typeof commandSource

export function activate(context: vscode.ExtensionContext) {
  const disposables = Object.keys(commandSource).map((command) => {
    return vscode.commands.registerCommand(`cornucopia.${command}`, () => {
      commandSource[command as CommandSourceKey]()
    })
  })

  context.subscriptions.push(...disposables)
}

export function deactivate() {

}
