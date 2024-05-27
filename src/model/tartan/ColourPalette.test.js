import { Colour } from './Colour'
import { ColourPalette } from './ColourPalette'

const COLOUR_PALETTE = 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;'

it('Colour Palette is beeing correctly instatiated', () => {
  const palette = new ColourPalette(COLOUR_PALETTE)
  expect(palette.colours.size).toBe(5)
  expect(palette.getColour('G')).toEqual(new Colour('G', '006818', 'GREEN'))
  expect(palette.getColour('K')).toEqual(new Colour('K', '101010', 'BLACK'))
  expect(palette.getColour('CW')).toEqual(new Colour('CW', 'FCFCFC', 'CLEAR'))
  expect(palette.getColour('DB')).toEqual(new Colour('DB', '202060', 'DARK BLUE'))
  expect(palette.getColour('R')).toEqual(new Colour('R', 'C80000', 'RED'))
  expect(palette.getColour('Q')).toBeUndefined()
})
