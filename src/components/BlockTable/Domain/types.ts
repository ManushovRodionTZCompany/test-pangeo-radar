export type TPagination = {
  limit: number
}

export type TItem = {
  id: number
  title: string
  rand: string
}

export type TSortKey = keyof TItem

export type TSortDirection = 'asc' | 'desc'

export type TSort = {
  key: TSortKey
  direction: TSortDirection
}
