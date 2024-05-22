import React from 'react'
import { setupStore } from '../../../app/Store'
import { update, updateFilter, type UpdateTartanActionType } from '../../../redux/tartan/TartanSlice'
import { renderWithProviders } from '../../../utils/test-utils'
import TartanSVGNew from './TartanImage'

const TEST_TARTAN_PARAMS: UpdateTartanActionType = {
  name: 'Test Tartan',
  threadCount: 'G56 W12 B/28',
  colourPalette: 'G=006818GREEN;W=FCFCFCCLEAR;B=202060DARK BLUE;',
  noOfSetts: 1,
  imageSize: 1000,
  xOffsetThreadCount: 0,
  yOffsetThreadCount: 0
}

test('renders correctly', async () => {
  const store = setupStore()
  store.dispatch(
    update(TEST_TARTAN_PARAMS)
  )
  store.dispatch(updateFilter({
    isUseBlurFilter: false,
    blurValue: 0
  }))

  const tartanSVG = renderWithProviders(<TartanSVGNew id='testId' style={{ backgroundColor: 'red' }} />, { store })
  expect(tartanSVG).toMatchSnapshot()
})

test('does not render or reference filter when isUseBlurFilter is false', async () => {
  const store = setupStore()
  store.dispatch(update(TEST_TARTAN_PARAMS))
  store.dispatch(updateFilter({
    isUseBlurFilter: false,
    blurValue: 0
  }))

  const tartanSVG = renderWithProviders(<TartanSVGNew />, { store })
  expect(tartanSVG.queryByTestId('blurFilter')).toBeNull()
  expect(tartanSVG.queryByTestId('tartanRect')?.getAttribute('filter')).toBe('')
})

test('x and y offsets are applied correctly when imageSize matches settSize', async () => {
  const store = setupStore()
  // set image size to match sett size so offsets will just equal actual values
  store.dispatch(update({ ...TEST_TARTAN_PARAMS, xOffsetThreadCount: 11, yOffsetThreadCount: 3, imageSize: 108 }))
  const tartanSVG = renderWithProviders(<TartanSVGNew />, { store })
  expect(tartanSVG.getByTestId('testSett').getAttribute('x')).toBe('11')
  expect(tartanSVG.getByTestId('testSett').getAttribute('y')).toBe('3')
})

test('x and y offsets are applied correctly when imageSize doesnt match settSize', async () => {
  const store = setupStore()
  // set image size to match 2 times sett size so offsets will just equal double values
  store.dispatch(update({ ...TEST_TARTAN_PARAMS, xOffsetThreadCount: 11, yOffsetThreadCount: 3, imageSize: 216 }))
  const tartanSVGb = renderWithProviders(<TartanSVGNew />, { store })
  expect(tartanSVGb.getByTestId('testSett').getAttribute('x')).toBe('22')
  expect(tartanSVGb.getByTestId('testSett').getAttribute('y')).toBe('6')
})
