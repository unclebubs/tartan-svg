import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { update } from '../redux/tartan/TartanSlice'

export const Tartan: React.FC = () => {
  const { tartan } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return (
    <div>
        <input type="text"
        onChange={(e) => dispatch(update(e.target.value))}
        />
      <h1 className='text-light'>ThreadCount: {tartan?.threadCount}</h1>
      <h2 className='text-light'>noOfThreads: { tartan?.noOfThreads}</h2>
      <h2 className='text-light'>SettSize: { tartan?.getSetSize()}</h2>
      <h2 className='text-light'>Is Half sett: { ((tartan != null && tartan.isHalfSet) ? 'yes' : 'no')}</h2>
      </div>
  )
}
