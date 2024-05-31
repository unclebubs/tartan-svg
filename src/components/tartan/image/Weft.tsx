import React, { type ReactElement } from 'react'

import { type TartanEntity } from '../../../model/tartan/TartanEntity'

interface TartanProp {
  tartan: TartanEntity
}

export const Weft: React.FC<TartanProp> = (props) => {
  const { tartan } = props

  const RederWeft = (): ReactElement => {
    let y = 0
    const weft = tartan?.fullSet.map((thread, idx) => {
      const rect = <rect
        key={'weft-' + idx}
        fill={'#' + thread.colour?.hex}
        width="100%"
        height={thread.noOfThreads * tartan.scaledStrokeLength}
        x="0"
        y={y}
      ></rect>
      y += thread.noOfThreads * tartan.scaledStrokeLength
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
