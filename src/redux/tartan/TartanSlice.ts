import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { extractThreadsFromThreadCount, isHalfSet, type Thread } from '../../utils/TartanUtils'

interface TartanState {
  threadCount: string
  colourPalette: string
  threads: Thread[]
  isHalfSet: boolean
}

const initialState: TartanState = {
  threadCount: 'CW8G60K2G2K2G6K24DB20R6',
  colourPalette: 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
  threads: [],
  isHalfSet: false
}

export const counterSlice = createSlice({
  name: 'tartan',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.threadCount = action.payload
      state.threads = extractThreadsFromThreadCount(action.payload)
      state.isHalfSet = isHalfSet(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions

export default counterSlice.reducer
