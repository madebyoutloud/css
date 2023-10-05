import type { Rule } from '@unocss/core'

export const opacity: Rule[] = [
  [/^opacity-(\d+)$/, ([, d]) => {
    const v = Number(d)

    if (v >= 0 && v <= 100 && v % 10 === 0)
      return { opacity: `${v / 100}` }
  }, { autocomplete: ['opacity-(0|10|20|30|40|50|60|70|80|90|100)'] }],
]
