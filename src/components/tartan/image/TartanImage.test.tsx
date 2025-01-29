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


test('renders correctly without filter', async () => {
  const tartanSVG = render(
    <TartanSVG
      id='testId'
      className='clazz'
      style={{ backgroundColor: 'red' }}
      {...TEST_TARTAN_PARAMS}
    />
  )
  expect(tartanSVG).toMatchSnapshot()
})

test('renders correctly with filter', async () => {
  const tartanSVG = render(
    <TartanSVG
      id='testId'
      className='clazz'
      style={{ backgroundColor: 'red' }}
      useFilter={true}
      {...TEST_TARTAN_PARAMS}
    />
  )
  expect(tartanSVG).toMatchSnapshot()
})

test('does not render or reference filter when isUseFilterFilter is false', async () => {
  const tartanSVG = render(<TartanSVG {...TEST_TARTAN_PARAMS} useFilter={false} />)
  const { container } = tartanSVG;
  expect(tartanSVG.queryByTestId('fabricTexture')).toBeNull()
  expect(tartanSVG.queryByTestId('dustTexture')).toBeNull()
  expect(tartanSVG.queryByTestId('threadEmbossing')).toBeNull()
  expect(tartanSVG.queryByTestId('weftVariation')).toBeNull()
  expect(tartanSVG.queryByTestId('warpVariation')).toBeNull()
  expect(tartanSVG.queryByTestId('darkenEffect')).toBeNull()
  expect(container.querySelector('#weft')?.getAttribute('filter')).toBe('')
  expect(container.querySelector('#warp')?.getAttribute('filter')).toBe('')

  expect(tartanSVG.queryByTestId('tartanRect')?.getAttribute('filter')).toBe('')
})

test('renders and references filter when isUseFilterFilter is true', async () => {
  const tartanSVG = render(<TartanSVG {...TEST_TARTAN_PARAMS} useFilter={true} />)
  const { container } = tartanSVG;
  expect(tartanSVG.queryByTestId('fabricTexture')).toBeDefined()
  expect(tartanSVG.queryByTestId('dustTexture')).toBeDefined()
  expect(tartanSVG.queryByTestId('threadEmbossing')).toBeDefined()
  expect(tartanSVG.queryByTestId('weftVariation')).toBeDefined()
  expect(tartanSVG.queryByTestId('warpVariation')).toBeDefined()
  expect(tartanSVG.queryByTestId('darkenEffect')).toBeDefined()
  expect(container.querySelector('#weft')?.getAttribute('filter')).toBe('url(#threadEmbossing) url(#weftVariation) url(#darkenEffect)')
  expect(container.querySelector('#warp')?.getAttribute('filter')).toBe('url(#threadEmbossing) url(#warpVariation)')
  expect(tartanSVG.queryByTestId('tartanRect')?.getAttribute('filter')).toBe('url(#fabricTexture) url(#dustTexture)')
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
