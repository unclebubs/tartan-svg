import { Colour } from './Colour'
import { TartanEntity } from './TartanEntity'

const NAME = 'TEST TARTAN'
const THREADCOUNT = 'G/56 W12 B/28'
const COLOUR_PALETTE = 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;'

it('Test getters and setters are working correctly', () => {
  const tartan = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.name).toEqual(NAME)
  expect(tartan.palette).toEqual(COLOUR_PALETTE)
  expect(tartan.threadCount).toEqual(THREADCOUNT)
})

it('Test setting isHalfSet is working correctly', () => {
  const tartan = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.isHalfSet).toBeTruthy()
  const tartan2 = new TartanEntity(NAME, 'G56 W12 B28', COLOUR_PALETTE)
  expect(tartan2.isHalfSet).toBeFalsy()
  const tartan3 = new TartanEntity(NAME, 'G/56 W/12 B28', COLOUR_PALETTE)
  expect(tartan3.isHalfSet).toBeFalsy()
})

it('Test returning noOfThreads is working correctly', () => {
  const tartan = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.noOfThreads).toEqual(108)
})

it('Test buildFullSet is working correctly', () => {
  const tartan = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.noOfThreads).toBe(108)
  expect(tartan.fullSet.length).toBe(4)
  console.log('In buildset', tartan.fullSet)

  const tartan2 = new TartanEntity(NAME, 'G56 W12 B28', COLOUR_PALETTE)
  expect(tartan2.noOfThreads).toBe(96)
  expect(tartan2.fullSet.length).toBe(3)
})

it('Test returning getSettSize() is working correctly', () => {
  const tartan = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.getSetSize()).toEqual(108)

  const tartan2 = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE, 4)
  expect(tartan2.getSetSize()).toEqual(216)
})

it('Test add spaceAfterNumbers method', () => {
  const result = TartanEntity.addSpaceAfterNumbers('a1b2c3')
  expect(result).toEqual('a1 b2 c3')

  const result2 = TartanEntity.addSpaceAfterNumbers('a1b2c/3')
  expect(result2).toEqual('a1 b2 c/3')

  const result3 = TartanEntity.addSpaceAfterNumbers('a1b2 c3')
  expect(result3).toEqual('a1 b2 c3')
})

it('Test Colour Palette is beeing correctly instatiated', () => {
  const tartan = new TartanEntity(NAME, THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.colourPalette.colours.size).toBe(5)
  expect(tartan.colourPalette.getColour('G')).toEqual(new Colour('G', '006818', 'GREEN'))
  expect(tartan.colourPalette.getColour('K')).toEqual(new Colour('K', '101010', 'BLACK'))
  expect(tartan.colourPalette.getColour('CW')).toEqual(new Colour('CW', 'FCFCFC', 'CLEAR'))
  expect(tartan.colourPalette.getColour('DB')).toEqual(new Colour('DB', '202060', 'DARK BLUE'))
  expect(tartan.colourPalette.getColour('R')).toEqual(new Colour('R', 'C80000', 'RED'))
  expect(tartan.colourPalette.getColour('Q')).toBeUndefined()
})
