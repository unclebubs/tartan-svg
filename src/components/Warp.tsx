import React, { type ReactElement } from 'react'
import { useAppSelector } from '../app/hooks'

export const Warp: React.FC = () => {
  const { tartan } = useAppSelector((state) => state.counter)
  console.log('warp is ', tartan)

  const RenderWarp = (): ReactElement => {
    let x = 0
    const warp = tartan?.fullSet.map((thread, idx) => {
      const rect = <rect key={'warp-' + idx} fill={'#' + thread.colour?.hex} height="100%" width={thread.noOfThreads * tartan.scaledStrokeLength} x={x} y="0"></rect>
      x += thread.noOfThreads * tartan.scaledStrokeLength
      return rect
    })
    return <>{warp}</>
  }

  return (
   <g id="warp" mask="url(#threadHatchingMask)" >
    <RenderWarp />
    </g>
  )
}
