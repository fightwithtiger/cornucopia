import traverse from '@babel/traverse'
import { flatten } from '../utils'

export function jsx2ClassNameTree(jsxElementNodes: any) {
  jsxElementNodes = Array.isArray(jsxElementNodes) ? jsxElementNodes : [jsxElementNodes]

  const classMap: any = { children: [] }
  for (let i = 0; i < jsxElementNodes.length; i++) {
    const jsxNode = jsxElementNodes[i]
    const root = {
      children: [],
    }
    const child = resolveJsxElement(jsxNode, root)
    if (child.key && child.className) {
      classMap.children.push(child)
    } else {
      classMap.children.push(...child.children)
    }
  }

  return classMap
}
function resolveJsxElement(jsxNode: any, head: any) {
  const { openingElement = {} } = jsxNode
  const attributes = openingElement.attributes || []
  const classNameAttr = attributes.find((item: any) => item.name.name === 'className')

  const children = jsxNode.children?.filter((child: any) => ['JSXFragment', 'JSXElement', 'JSXExpressionContainer'].includes(child.type)).reduce((pre: any, cur: any) => {
    pre.push(...walkJSXChild(cur))
    return pre
  }, [])

  if (classNameAttr) {
    const classList = extractClassNameFromExpression(classNameAttr.value.expression)
    if (classList.length > 0) {
      head = {
        className: classList[0].className,
        key: classList[0].key,
        classList,
        children: [],
      }
    }
  }

  for (const c of children) {
    const child = resolveJsxElement(c, head)
    if (child.className === head.className && child.key === head.key) {
      continue
    }
    if (!child.className && !child.key && child.children) {
      head.children.push(...child.children)
    } else {
      head.children.push(child)
    }
  }

  return head
}

function walkJSXChild(c: any): any {
  const children = []
  if (['JSXElement', 'JSXFragment'].includes(c.type)) {
    children.push(c)
  } else if (c.type === 'JSXExpressionContainer') {
    children.push(...walkJSXChild(c.expression || {}))
  } else if (c.type === 'LogicalExpression') {
    children.push(...walkJSXChild(c.right))
  } else if (c.type === 'ConditionalExpression') {
    const { consequent, alternate } = c
    children.push(...walkJSXChild(consequent), ...walkJSXChild(alternate))
  }
  return flatten(children)
}

function extractClassNameFromExpression(expression: any) {
  const { type } = expression
  const list: any = []
  if (type === 'MemberExpression') {
    const res = extractMemberExpression(expression)
    list.push(res)
  } else if (type === 'TemplateLiteral') {
    const { expressions } = expression
    for (const exp of expressions) {
      const res = extractClassNameFromExpression(exp)
      list.push(...flatten(res))
    }
  }
  return list
}

function extractMemberExpression(expression: any) {
  const { object, property } = expression
  return {
    key: object.name,
    className: property.name,
  }
}

export function getJSXElements(ast: any) {
  const jsxElementNodes: any = []
  traverse(ast, {
    ReturnStatement(path: any) {
      if (path.node.argument && ['JSXFragment', 'JSXElement'].includes(path.node.argument.type)) {
        jsxElementNodes.push(path.node.argument)
      }
    },
  })

  return jsxElementNodes
}
export function getImportDeclarations(ast: any) {
  return ast.program.body.filter((item: any) => item.type === 'ImportDeclaration')
}
