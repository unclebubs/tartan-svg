import { ColourPalette } from './ColourPalette'
import { Thread } from './Thread'

export class TartanEntity {
  static halfSettToken: string = '/'

  name: string
  readonly threads: Thread[]
  readonly fullSet: Thread[]
  readonly colourPalette: ColourPalette
  readonly isHalfSet: boolean
  readonly noOfThreads: number
  noOfSetts: number
  imageSize: number
  readonly scaleFactor: number
  strokeLength: number = 2
  readonly scaledStrokeLength: number
  _threadCount: string
  _palette: string

  constructor (name: string, threadCount: string, palette: string, noOfSetts: number, imageSize: number) {
    this.name = name
    this._threadCount = threadCount
    this._palette = palette
    this.noOfSetts = noOfSetts
    this.imageSize = imageSize
    this.colourPalette = new ColourPalette(this._palette)
    this.threads = TartanEntity.extractThreadsFromThreadCount(this._threadCount, this.colourPalette)
    this.isHalfSet = this.updateIsHalfSet()
    this.fullSet = this.buildFullSet(this.threads, this.isHalfSet)
    this.noOfThreads = this.updateNumberOfThreads()
    this.scaleFactor = (this.imageSize / (this.noOfSetts * this.getSetSize()))
    this.scaledStrokeLength = this.scaleFactor * this.strokeLength
  }

  static addSpaceAfterNumbers (str: string): string {
    return str.replace(/(\d+)/g, '$1 ').replace(/ {2,}/g, ' ').trim()
  }

  buildFullSet = (threads: Thread[], isHalfSet: boolean): Thread[] => {
    let fSet: Thread[] = []
    if (isHalfSet) {
      const nextSet = threads.toReversed().slice(1, threads.length - 1)
      fSet = threads.concat(nextSet)
    } else {
      fSet = [...threads]
    }

    return fSet
  }

  updateIsHalfSet = (): boolean => {
    return this.threads[this.threads.length - 1].isPivot
  }

  updateNumberOfThreads = (): number => {
    return this.fullSet.reduce(
      (prev, thread) => prev + thread.noOfThreads, 0
    )
  }

  getSetSize (): number {
    return this.strokeLength * this.noOfThreads
  }

  static extractThreadsFromThreadCount (threadCount: string, colourPalette: ColourPalette): Thread[] {
    const threadCountItems: Thread [] = []
    const threadCountTokens: string[] = this.addSpaceAfterNumbers(threadCount.toUpperCase()).trim().split(' ')
    threadCountTokens.forEach(threadItem => {
      const newThreadItem = threadItem.replace(/(\d+)/g, (_, num) => {
        return '=' + num
      })

      const threadParts = newThreadItem.trim().split('=')
      if (threadParts[0].length > 0) {
        let colourCode = threadParts[0]
        const isPivot = colourCode.includes(TartanEntity.halfSettToken)
        colourCode = isPivot ? colourCode.substring(0, colourCode.indexOf('/')) : colourCode
        const noOfThreads = parseInt(threadParts[1])
        const colour = colourPalette.getColour(colourCode)
        threadCountItems.push(new Thread('dummy', colour, colourCode, noOfThreads, isPivot))
      }
    })
    return threadCountItems
  }

  set palette (palette: string) {
    this._palette = palette
  }

  get palette (): string {
    return this._palette
  }

  set threadCount (val: string) {
    this._threadCount = val
  }

  get threadCount (): string {
    return this._threadCount
  }
}
