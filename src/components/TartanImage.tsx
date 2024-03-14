import React, { type ReactElement } from 'react'
import { Weft } from './Weft'
import { Warp } from './Warp'
import { useAppSelector } from '../app/hooks'
import ThreadHatching from './ThreadHatching'

interface TartanProps {
  style?: React.CSSProperties
  id?: string
  useBlur?: boolean
  blurValue?: number
}

const TartanSVGNew: React.FC<TartanProps> = (props) => {
  const { style, id, useBlur = false, blurValue = 1 } = props
  const { tartan } = useAppSelector((state) => state.counter)

  const filter = (useBlur: boolean): ReactElement | null => {
    if (useBlur) {
      return (
        <filter id="blur">
          <feGaussianBlur stdDeviation={blurValue} in="SourceGraphic" result="BLUR"></feGaussianBlur>
        </filter>
      )
    }
    return null
  }

  return (
    <svg id={id} height={tartan?.imageSize} width={tartan?.imageSize} style={style} xmlns="http://www.w3.org/2000/svg">
      { filter(useBlur) }
      <defs>
        <mask id="threadHatchingMask" x="0" y="0" width="1" height="1">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#threadHatching)"></rect>
        </mask>
          <ThreadHatching />
        <pattern id="sett" x="0" y="0" patternUnits="userSpaceOnUse" width={tartan !== null ? tartan?.getSetSize() * tartan?.scaleFactor : 0} height={tartan !== null ? tartan?.getSetSize() * tartan?.scaleFactor : 0} >
          <Weft />
          <Warp />
        </pattern>
      </defs>
      <rect x="0" y="0" height="100%" width="100%" fill="url(#sett)" filter={ useBlur ? 'url(#blur)' : ''}></rect>
    </svg>
  )
}
export default TartanSVGNew
