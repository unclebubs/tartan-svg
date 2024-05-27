import React from 'react'

import TartanSVG from './TartanImage'
import { render } from '@testing-library/react'

const TEST_TARTAN_PARAMS = {
  name: 'Test Tartan',
  threadCount: 'G56 W12 B/28',
  colourPalette: 'G=006818GREEN;W=FCFCFCCLEAR;B=202060DARK BLUE;',
  noOfSetts: 1,
  imageSize: 1000,
  xOffsetThreadCount: 0,
  yOffsetThreadCount: 0
}

test('renders correctly', async () => {
  const tartanSVG = render(<TartanSVG id='testId' style={{ backgroundColor: 'red' }} {...TEST_TARTAN_PARAMS} />)
  expect(tartanSVG).toMatchSnapshot()
})

test('does not render or reference filter when isUseBlurFilter is false', async () => {
  const tartanSVG = render(<TartanSVG {...TEST_TARTAN_PARAMS} useBlur={false} blurValue={0} />)
  expect(tartanSVG.queryByTestId('blurFilter')).toBeNull()
  expect(tartanSVG.queryByTestId('tartanRect')?.getAttribute('filter')).toBe('')
})

test('x and y offsets are applied correctly when imageSize matches settSize', async () => {
  // set image size to match sett size so offsets will just equal actual values
  const tartanSVG = render(
    <TartanSVG
      {...TEST_TARTAN_PARAMS}
      xOffsetThreadCount={11}
      yOffsetThreadCount={3}
      imageSize={108}
    />)
  expect(tartanSVG.getByTestId('testSett').getAttribute('x')).toBe('11')
  expect(tartanSVG.getByTestId('testSett').getAttribute('y')).toBe('3')
})

test('x and y offsets are applied correctly when imageSize doesnt match settSize', async () => {
  // set image size to match 2 times sett size so offsets will just equal double values
  const tartanSVGb = render(
    <TartanSVG
      {...TEST_TARTAN_PARAMS}
      xOffsetThreadCount={11}
      yOffsetThreadCount={3}
      imageSize={216}
    />)
  expect(tartanSVGb.getByTestId('testSett').getAttribute('x')).toBe('22')
  expect(tartanSVGb.getByTestId('testSett').getAttribute('y')).toBe('6')
})
