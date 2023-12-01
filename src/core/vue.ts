export function vueTemplate2ClassNameTree(ast: any, head: any = { children: [] }) {
  const { attrsMap = {}, children = [] } = ast
  const classAttr = attrsMap.class || ''
  if (classAttr) {
    const classNames = classAttr.split(/\s/g)
    head = {
      className: classNames[0],
      classList: classNames.map((name: string) => ({ className: name })),
      children: [],
    }
  }

  if (children && children.length > 0) {
    for (const c of children) {
      const child = vueTemplate2ClassNameTree(c)
      if (child.className === head.className) {
        continue
      }
      if (!child.className && child.children) {
        head.children.push(...child.children)
      } else {
        head.children.push(child)
      }
    }
  }

  return head
}
