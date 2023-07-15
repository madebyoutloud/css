export function toRem(value: number, base = 16): string {
  return `${value / base}rem`
}
