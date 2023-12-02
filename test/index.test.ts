import { describe, expect, it } from 'vitest'
import { compile } from 'vue-template-compiler'
import { vueTemplate2ClassNameTree } from '../src/core/vue'

describe('should', () => {
  it('exported', () => {
    const code = `
    <div>
    aaaaa
      <div class="header"></div>
    </div>
    `
    const { ast } = compile(`<template>${code}</template>`)
    const classMap = vueTemplate2ClassNameTree(ast)
    expect({ ast, classMap }).toMatchSnapshot()
  })
})
