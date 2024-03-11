import { addSpaceAfterNumbers, extractThreadsFromThreadCount, isHalfSet } from './TartanUtils'

it('Test add space after numbers in a string', () => {
  const result = addSpaceAfterNumbers('a1b2c3')
  expect(result).toEqual('a1 b2 c3')

  const result2 = addSpaceAfterNumbers('a1b2c/3')
  expect(result2).toEqual('a1 b2 c/3')

  const result3 = addSpaceAfterNumbers('a1b2 c3')
  expect(result3).toEqual('a1 b2 c3')
})

it('Test extractThreadsFromThreadCount has correct number of tokens', () => {
  const result1 = extractThreadsFromThreadCount('W1B2G20')
  expect(result1).toHaveLength(3)
  const expectedArray = [
    { colourCode: 'W', noOfThreads: 1, isPivot: false },
    { colourCode: 'B', noOfThreads: 2, isPivot: false },
    { colourCode: 'G', noOfThreads: 20, isPivot: false }
  ]
  expect(result1).toEqual(expect.arrayContaining(expectedArray))
  expect(expectedArray).toEqual(expect.arrayContaining(result1))
})

it('Test extractThreadsFromThreadCount converts to uppercase', () => {
  const result1 = extractThreadsFromThreadCount('w1b2g20')
  expect(result1).toHaveLength(3)
  const expectedArray = [
    { colourCode: 'W', noOfThreads: 1, isPivot: false },
    { colourCode: 'B', noOfThreads: 2, isPivot: false },
    { colourCode: 'G', noOfThreads: 20, isPivot: false }
  ]
  expect(result1).toEqual(expect.arrayContaining(expectedArray))
  expect(expectedArray).toEqual(expect.arrayContaining(result1))
})

it('Test extractThreadsFromThreadCount works with spacing issues', () => {
  const result1 = extractThreadsFromThreadCount('  w1  b2g20 ')
  expect(result1).toHaveLength(3)
  const expectedArray = [
    { colourCode: 'W', noOfThreads: 1, isPivot: false },
    { colourCode: 'B', noOfThreads: 2, isPivot: false },
    { colourCode: 'G', noOfThreads: 20, isPivot: false }
  ]
  expect(result1).toEqual(expect.arrayContaining(expectedArray))
  expect(expectedArray).toEqual(expect.arrayContaining(result1))
})

it('Test isHalfSet', () => {
  const result1 = isHalfSet('W1B2G3')
  expect(result1).toBeFalsy()
  const result2 = isHalfSet('W/1B/2G3')
  expect(result2).toBeFalsy()
  const result3 = isHalfSet('W1B2G/3')
  expect(result3).toBeTruthy()
})
