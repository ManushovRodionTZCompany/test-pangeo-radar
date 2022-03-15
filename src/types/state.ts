export type TPagination = {
  limit: number
}

export type TItem = {
  id: number
  title: string
  rand: string
}

export type TState = {
  pagination: TPagination
  items: TItem[]
}
