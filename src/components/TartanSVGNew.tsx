import React, { type ReactElement } from 'react'

interface TartanProps {
  style?: React.CSSProperties
  id?: string
  useBlur?: boolean
  blurValue?: number
}

const TartanSVGNew: React.FC<TartanProps> = (props) => {
  const { style, id, useBlur = false, blurValue = 1 } = props

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
    <svg id={id} height="1080" width="1080" style={style} xmlns="http://www.w3.org/2000/svg">
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
        <pattern id="sett" x="0" y="0" patternUnits="userSpaceOnUse" width="108" height="108" >
          <g id="weft">
            <rect fill="#006818" width="100%" height="56" x="0" y="0"></rect>
            <rect fill="#E0E0E0" width="100%" height="12" x="0" y="56"></rect>
            <rect fill="#2C2C80" width="100%" height="28" x="0" y="68"></rect>
            <rect fill="#E0E0E0" width="100%" height="12" x="0" y="96"></rect>
          </g>
          <g id="warp" mask="url(#threadHatchingMask)" >
            <rect fill="#006818" width="56" height="100%" x="0" y="0"></rect>
            <rect fill="#E0E0E0" width="12" height="100%" x="56" y="0"></rect>
            <rect fill="#2C2C80" width="28" height="100%" x="68" y="0"></rect>
            <rect fill="#E0E0E0" width="12" height="100%" x="96" y="0"></rect>
          </g>
        </pattern>
      </defs>
      <rect x="0" y="0" height="100%" width="100%" fill="url(#sett)" filter={ useBlur ? 'url(#blur)' : ''}></rect>
    </svg>
  )
}
export default TartanSVGNew
