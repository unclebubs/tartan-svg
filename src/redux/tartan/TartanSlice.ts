import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { TartanEntity } from './TartanEntity'

interface TartanState {
  name: string
  threadCount: string
  colourPalette: string
  tartan: TartanEntity | null
}

const initialState: TartanState = {
  name: 'Abercrombie Ancient',
  // threadCount: 'CW8G60K2G2K2G6K24DB20R/6',
  // colourPalette: 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
  threadCount: 'G56 W12 B/28',
  colourPalette: 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
  tartan: null
}

export const counterSlice = createSlice({
  name: 'tartan',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.tartan = new TartanEntity('Abercrombie Ancient', 'CW8G60K2G2K2G6K24DB20R/6', 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;')
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions

export default counterSlice.reducer
