import { type Colour } from './Colour'

export class Thread {
  name: string
  colourCode: string
  noOfThreads: number
  isPivot: boolean
  colour: Colour | undefined

  constructor (name: string, colour: Colour | undefined, colourCode: string, noOfThreads: number, isPivot: boolean) {
    this.name = name
    this.colourCode = colourCode
    this.noOfThreads = noOfThreads
    this.isPivot = isPivot
    this.colour = colour
  }
}
