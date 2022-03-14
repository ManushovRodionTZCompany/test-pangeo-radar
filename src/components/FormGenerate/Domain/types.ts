import { TPagination } from '@/types/pagination'

export type TResultItem = {
  id: number
  title: string
  rand: string
}

export type TResult = {
  items: TResultItem[]
  pagination: TPagination
}
