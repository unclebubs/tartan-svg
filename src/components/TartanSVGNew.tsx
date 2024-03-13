import React, { type ReactElement } from 'react'
import { Weft } from './Weft'
import { Warp } from './Warp'
import { useAppSelector } from '../app/hooks'

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
    <svg id={id} height='1000' width='1000' style={style} xmlns="http://www.w3.org/2000/svg">
      { filter(useBlur) }
      <defs>
        <mask id="threadHatchingMask" x="0" y="0" width="1" height="1">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#threadHatching)"></rect>
        </mask>
        <pattern id="threadHatching" x="0" y="0" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect x="0" y="-1" height="2" width="1" fill="white"></rect>
          <rect x="0" y="3" height="2" width="1" fill="white"></rect>
          <rect x="1" y="0" height="2" width="1" fill="white"></rect>
          <rect x="2" y="1" height="2" width="1" fill="white"></rect>
          <rect x="3" y="2" height="2" width="1" fill="white"></rect>
        </pattern>
        <pattern id="sett" x="0" y="0" patternUnits="userSpaceOnUse" width={tartan?.getSetSize()} height={tartan?.getSetSize()} >
          <Weft />
          <Warp />
        </pattern>
      </defs>
      <rect x="0" y="0" height="100%" width="100%" fill="url(#sett)" filter={ useBlur ? 'url(#blur)' : ''}></rect>
    </svg>
  )
}
export default TartanSVGNew
