import React, { type ReactElement } from 'react'

import { Weft } from './Weft'
import { Warp } from './Warp'
import { useAppSelector } from '../../../app/hooks'
import ThreadHatching from './ThreadHatching'

interface TartanProps {
  style?: React.CSSProperties
  id?: string
  useBlur?: boolean
  blurValue?: number
}

const TartanSVG: React.FC<TartanProps> = (props) => {
  const { style, id } = props
  const { tartan, isUseBlurFilter, blurValue } = useAppSelector((state) => state.counter)

  const filter = (useBlur: boolean, blurValue: number): ReactElement | null => {
    if (useBlur) {
      return (
        <filter data-testid='blurFilter' id="blur">
          <feGaussianBlur stdDeviation={blurValue} in="SourceGraphic" result="BLUR" edgeMode='wrap' ></feGaussianBlur>
        </filter>
      )
    }
    return null
  }

  const setX = (tartan !== null ? tartan?.xOffsetThreadCount * 2 * tartan?.scaleFactor : 0)
  const setY = tartan !== null ? tartan?.yOffsetThreadCount * 2 * tartan?.scaleFactor : 0

  return (
    <svg data-testid='tartanImage' id={id} height={tartan?.imageSize} width={tartan?.imageSize} style={style} xmlns="http://www.w3.org/2000/svg">
      {filter(isUseBlurFilter, blurValue)}
      <defs>
        <mask id="threadHatchingMask" x="0" y="0" width="1" height="1">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#threadHatching)"></rect>
        </mask>
        <ThreadHatching />
        <pattern data-testid='testSett' id="sett" x={setX} y={setY} patternUnits="userSpaceOnUse" width={tartan !== null ? tartan?.getSetSize() * tartan?.scaleFactor : 0} height={tartan !== null ? tartan?.getSetSize() * tartan?.scaleFactor : 0} >
          <Weft />
          <Warp />
        </pattern>
      </defs>
      <rect data-testid='tartanRect' x="0" y="0" height="100%" width="100%" fill="url(#sett)" filter={isUseBlurFilter ? 'url(#blur)' : ''}></rect>
    </svg>
  )
}
export default TartanSVG
