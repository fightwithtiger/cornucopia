import copyPaste from 'copy-paste'

export function writeToClipboard(text: string) {
  return new Promise((resolve) => {
    copyPaste.copy(text, () => {
      resolve(true)
    })
  })
}
