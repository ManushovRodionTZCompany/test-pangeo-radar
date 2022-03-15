export type TDirection = 'asc' | 'desc'

export function compareAscNumbers(a: number, b: number): number {
  return a - b
}

export function compareDescNumbers(a: number, b: number): number {
  return b - a
}

export function compareNumbers(
  a: number,
  b: number,
  direction: TDirection
): number {
  if (direction === 'desc') return compareDescNumbers(a, b)
  return compareAscNumbers(a, b)
}

export function compareAscStrings(a: string, b: string): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export function compareDescStrings(a: string, b: string): number {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function compareStrings(
  a: string,
  b: string,
  direction: TDirection
): number {
  if (direction === 'desc') return compareDescStrings(a, b)
  return compareAscStrings(a, b)
}

export function sortByOptions<T>(
  items: T[],
  options: { key: keyof T; direction: TDirection }
): T[] {
  return items.sort((a, b) => {
    const keyA = a[options.key]
    const keyB = b[options.key]

    if (typeof keyA === 'number' && typeof keyB === 'number') {
      return compareNumbers(keyA, keyB, options.direction)
    } else if (typeof keyA === 'string' && typeof keyB === 'string') {
      return compareStrings(keyA, keyB, options.direction)
    }

    return 0
  })
}
