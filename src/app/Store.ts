import { type EnhancedStore, combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from '../model/tartan/TartanSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  counter: counterReducer
})

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export const setupStore = (preloadedState?: Partial<RootState>): EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch

export default store
