export function toRem(value: number, base = 16): string {
  return `${value / base}rem`
}

export function toSize(value: number | string, base?: number): string | number {
  if (!Number.isNaN(Number(value))) {
    return toRem(Number(value), base)
  }

  return value
}
