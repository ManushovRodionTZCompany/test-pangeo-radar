export type TResultItem = {
  id: number
  title: string
  rand: string
}

export type TPagination = {
  limit: number
}

export type TResult = {
  items: TResultItem[]
  pagination: TPagination
}
