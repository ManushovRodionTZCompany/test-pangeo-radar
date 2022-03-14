import { DEFAULT_COUNT_LIST } from './defaults'
import { TResultItem } from './types'

class Generate {
  private count = 0
  private rands: string[] = []

  constructor(count: number) {
    this.updateCount(count)
  }

  public updateCount(count: number) {
    this.count = count || DEFAULT_COUNT_LIST
  }

  public parseText(text: string): boolean {
    if (!text) return false

    this.rands = text.split(',').map((v) => v.trim())
    return true
  }

  public getResult(): TResultItem[] {
    const randLength = this.rands.length

    return [...Array(this.count)].map((v, index) => {
      const randIndex = Math.floor(Math.random() * randLength)

      return {
        id: index + 1,
        title: `name${index + 1}`,
        rand: this.rands[randIndex],
      }
    })
  }
}

export default Generate
