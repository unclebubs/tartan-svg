import React from 'react'
import { setupStore } from '../../../app/Store'
import { update, type UpdateTartanActionType } from '../../../redux/tartan/TartanSlice'
import { renderWithProviders } from '../../../utils/test-utils'
import ThreadHatching from './ThreadHatching'

test('Sets up initial state state with actions', () => {
  const store = setupStore()
  store.dispatch(
    update({
      name: 'Test Tartan',
      threadCount: 'G/56 W12 B/28',
      colourPalette: 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
      noOfSetts: 1,
      imageSize: 1000,
      xOffsetThreadCount: 0,
      yOffsetThreadCount: 0
    } satisfies UpdateTartanActionType)
  )

  const hatchingPattern = renderWithProviders(<ThreadHatching />, { store })
  const pattern = hatchingPattern.findByTestId('pattern')

  expect(pattern).not.toBeNull()
})
