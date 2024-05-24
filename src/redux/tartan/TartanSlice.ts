import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { TartanEntity } from './TartanEntity'

export interface UpdateTartanActionType {
  name: string
  threadCount: string
  colourPalette: string
  noOfSetts: number
  imageSize: number
  xOffsetThreadCount: number
  yOffsetThreadCount: number
}

export interface UpdateOffsetActionType {
  xOffsetThreadCount: number
  yOffsetThreadCount: number
}

export interface UpdateFilterActionType {
  isUseBlurFilter: boolean
  blurValue: number
}

interface TartanState {
  name: string
  threadCount: string
  colourPalette: string
  imageSize: number
  noOfSetts: number
  tartan: TartanEntity
  isUseBlurFilter: boolean
  blurValue: number
}

const initialState: TartanState = {
  name: '',
  threadCount: '',
  colourPalette: '',
  imageSize: 0,
  noOfSetts: 1,
  tartan: new TartanEntity('', '', '', 0, 0, 0, 0),
  isUseBlurFilter: true,
  blurValue: 0.5
}

export const counterSlice = createSlice({
  name: 'tartan',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<UpdateTartanActionType>) => {
      const { name, threadCount, colourPalette, noOfSetts, imageSize, xOffsetThreadCount, yOffsetThreadCount } = action.payload
      state.tartan = new TartanEntity(name, threadCount, colourPalette, noOfSetts, imageSize, xOffsetThreadCount, yOffsetThreadCount)
    },
    updateOffset: (state, action: PayloadAction<UpdateOffsetActionType>) => {
      const { xOffsetThreadCount, yOffsetThreadCount } = action.payload
      const { name, threadCount, palette, noOfSetts, imageSize } = state.tartan
      const newT = new TartanEntity(name, threadCount, palette, noOfSetts, imageSize, xOffsetThreadCount, yOffsetThreadCount)
      state.tartan = newT
    },
    updateFilter: (state, action: PayloadAction<UpdateFilterActionType>) => {
      const { isUseBlurFilter, blurValue } = action.payload
      state.isUseBlurFilter = isUseBlurFilter
      state.blurValue = blurValue
    }

  }
})

// Action creators are generated for each case reducer function
export const { update, updateOffset, updateFilter } = counterSlice.actions

export default counterSlice.reducer
