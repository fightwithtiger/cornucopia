import vscode from 'vscode'

function getEditor() {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    throw new Error('No active text editor')
  }
  return editor
}

export function getActiveDocumentText() {
  const editor = getEditor()
  return editor.document.getText()
}

export function getSelectedText() {
  const editor = getEditor()
  const doc = editor.document.getText()
  const arr = doc.split('\n')
  const {
    start,
    end,
  } = editor.selection
  let str = ''
  for (let i = start.line; i <= end.line; i++) {
    if (i === start.line) {
      str += arr[i].slice(start.character)
    } else if (i === end.line) {
      str += arr[i].slice(0, end.character)
    } else {
      str += arr[i]
    }
  }
  return str
}

export function getCurrentFilePath() {
  const editor = getEditor()
  return editor.document.fileName
}
