import React from 'react'

import ThreadHatching from './ThreadHatching'
import { TartanEntity } from '../../../model/tartan/TartanEntity'
import { render } from '@testing-library/react'

test('Sets up initial state state with actions', async () => {
  const tartanEntity = new TartanEntity(
    'Test Tartan',
    'G/56 W12 B/28',
    'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
    1,
    1000,
    0,
    0,
    false
  )

  const hatchingPattern = render(<ThreadHatching tartan={tartanEntity} />)
  const pattern = await hatchingPattern.findByTestId('pattern')

  expect(pattern).not.toBeNull()
})
