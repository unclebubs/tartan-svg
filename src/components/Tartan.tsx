import React, { type ReactElement } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { update } from '../redux/tartan/TartanSlice'
import { type Thread } from '../utils/TartanUtils'

export const Tartan: React.FC = () => {
  const { threadCount, threads, isHalfSet } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  const renderThread = (threads: Thread[]): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const output = threads.map(({ colourCode, noOfThreads, isPivot }) => {
      return <li key={colourCode}>Colour: {colourCode}, No: {noOfThreads}, Pivot: {isPivot ? 'yes' : 'no'}</li>
    })
    return <ul className='text-light'>{ output}</ul>
  }

  return (
    <div>
        <input type="text"
        onChange={(e) => dispatch(update(e.target.value))}
        />
      <h1 className='text-light'>ThreadCount: {threadCount}</h1>
      <h2 className='text-light'>Is Half sett: { isHalfSet ? 'Yes' : 'No'}</h2>
      <h2 className='text-light'>Threads:</h2>
      { renderThread(threads)}
      </div>
  )
}
