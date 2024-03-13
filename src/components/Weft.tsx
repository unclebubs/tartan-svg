import React, { type ReactElement } from 'react'
import { useAppSelector } from '../app/hooks'

export const Weft: React.FC = () => {
  const { tartan } = useAppSelector((state) => state.counter)
  console.log('weft is ', tartan?.fullSet)

  const RederWeft = (): ReactElement => {
    let y = 0
    const weft = tartan?.fullSet.map((thread, idx) => {
      const rect = <rect key={'weft-' + idx} fill={'#' + thread.colour?.hex} width="100%" height={thread.noOfThreads} x="0" y={y}></rect>
      y += thread.noOfThreads
      return rect
    })
    return <>{weft}</>
  }

  return (
    <g id="weft">
<RederWeft />
  </g>
  )
}
