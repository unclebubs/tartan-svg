import { Colour } from './Colour'

export class ColourPalette {
  paletteStr: string
  colours: Map<string, Colour >
  constructor (paletteStr: string) {
    this.paletteStr = paletteStr
    this.colours = ColourPalette.buildPalette(this.paletteStr)
  }

  getColour (colourCode: string): Colour | undefined {
    return this.colours.get(colourCode)
  }

  static buildPalette (paletteStr: string): Map<string, Colour> {
    const colourMap = new Map<string, Colour>()
    const palette = paletteStr.slice(0, paletteStr.length - 1) // knock off last ":"
    const colors = palette.split(';')
    colors.forEach(color => {
      const equalsIndex = color.indexOf('=')
      const colorCode = color.substring(0, equalsIndex).trim()
      const hex = color.substring(equalsIndex + 1, equalsIndex + 7).trim()
      const name = color.substring(equalsIndex + 7).trim()
      const colour = new Colour(colorCode, hex, name)
      colourMap.set(colour.colourCode, colour)
    })

    return colourMap
  }
}
