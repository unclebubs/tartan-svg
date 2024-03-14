import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { TartanEntity } from './TartanEntity'

export interface UpdateTartanActionType {
  name: string
  threadCount: string
  colourPalette: string
  noOfSetts: number
  imageSize: number
}

interface TartanState {
  name: string
  threadCount: string
  colourPalette: string
  imageSize: number
  noOfSetts: number
  tartan: TartanEntity | null
}

const initialState: TartanState = {
  name: 'Abercrombie Ancient',
  threadCount: 'G56 W12 B/28',
  colourPalette: 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
  imageSize: 500,
  noOfSetts: 1,
  tartan: null
}

export const counterSlice = createSlice({
  name: 'tartan',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UpdateTartanActionType>) => {
      const { name, threadCount, colourPalette, noOfSetts, imageSize } = action.payload
      console.log('The payload is ', action.payload)
      state.tartan = new TartanEntity(name, threadCount, colourPalette, noOfSetts, imageSize)
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions

export default counterSlice.reducer
