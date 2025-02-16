export function toRem(value: number, base = 16): string {
  return `${value / base}rem`
}

export function toSize(value: number | string) {
  if (!Number.isNaN(Number(value))) {
    return toRem(Number(value))
  }

  return value
}
