export class TartanEntity {
  readonly #threadCount: string
  readonly #palette: string

  constructor (threadCount: string, palette: string) {
    this.#threadCount = threadCount
    this.#palette = palette
  }

  set threadCount (threadCoubd: string) {
    this.threadCount = threadCoubd
  }

  get threadCount (): string {
    return this.threadCount
  }

  set palette (palette: string) {
    this.palette = palette
  }

  get palette (): string {
    return this.palette
  }
}
