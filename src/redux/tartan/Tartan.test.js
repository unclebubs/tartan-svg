import { TartanEntity } from './TartanEntity'

const THREADCOUNT = 'G/56 W12 B/28'
const COLOUR_PALETTE = 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;'

it('Test add space after numbers in a string', () => {
  const tartan = new TartanEntity(THREADCOUNT, COLOUR_PALETTE)
  expect(tartan.palette).toEqual(COLOUR_PALETTE)
  expect(tartan.threadCount).toEqual(THREADCOUNT)
})
