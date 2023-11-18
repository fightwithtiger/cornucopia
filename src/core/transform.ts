export function genStyleText(obj: any, topKey?: string) {
  const ignoreTopKey = !topKey
  const { children, classList = [] } = obj
  const matched = classList.find((item: any) => item.key === topKey)
  const { className, key } = ignoreTopKey ? classList[0] : matched || {}

  const isSameKey = (key: string) => (ignoreTopKey || key === topKey)

  let peerStr = ''
  const peersInTopKey = classList.filter((item: any) => isSameKey(item.key) && item.className !== className)
  for (const peer of peersInTopKey) {
    peerStr += ` ${peer.className} {}`
  }
  let childStr = ''
  for (const child of children) {
    childStr += genStyleText(child, topKey)
  }
  return isSameKey(key) ? `.${className} {${childStr}} ${peerStr}` : childStr
}
