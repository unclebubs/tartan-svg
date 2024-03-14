import React from 'react'
import { useAppSelector } from '../app/hooks'

export const Tartan: React.FC = () => {
  const { tartan } = useAppSelector((state) => state.counter)

  return (
    <div>

      <h1 className='text-light'>ThreadCount: {tartan?.threadCount}</h1>
      <h2 className='text-light'>noOfThreads: { tartan?.noOfThreads}</h2>
      <h2 className='text-light'>SettSize: {tartan?.getSetSize()}</h2>
      <h2 className='text-light'>Image size: { tartan?.imageSize}</h2>
      <h2 className='text-light'>NoOfSetts: {tartan?.noOfSetts}</h2>
      <h2 className='text-light'>Scale factor: {tartan?.scaleFactor}</h2>
      <h2 className='text-light'>Scale stroke length: { tartan?.scaledStrokeLength}</h2>
      <h2 className='text-light'>Is Half sett: { ((tartan != null && tartan.isHalfSet) ? 'yes' : 'no')}</h2>
      </div>
  )
}
