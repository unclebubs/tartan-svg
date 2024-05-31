import React, { useEffect, useState, type ReactElement } from 'react'
import { Weft } from './Weft'
import { Warp } from './Warp'
import ThreadHatching from './ThreadHatching'
import { TartanEntity } from '../../../model/tartan/TartanEntity'

interface TartanProps {
  id?: string
  style?: React.CSSProperties
  className?: string
  useBlur?: boolean
  blurValue?: number
  name: string
  threadCount: string
  colourPalette: string
  imageSize?: number
  noOfSetts?: number
  xOffsetThreadCount?: number
  yOffsetThreadCount?: number
}

const TartanSVG: React.FC<TartanProps> = (props) => {
  const [tartanEntity, setTartanEntity] = useState<TartanEntity>()

  const { style, className, id } = props

  useEffect(() => {
    const {
      name,
      threadCount,
      colourPalette,
      imageSize = 500,
      noOfSetts = 1,
      xOffsetThreadCount = 0,
      yOffsetThreadCount = 0,
      useBlur = false,
      blurValue = 0
    } = props
    setTartanEntity(new TartanEntity(
      name,
      threadCount,
      colourPalette,
      noOfSetts,
      imageSize,
      xOffsetThreadCount,
      yOffsetThreadCount,
      useBlur,
      blurValue
    ))
  }, [props])

  const filter = ({ useBlur, blurValue }: { useBlur: boolean, blurValue: number }): ReactElement | null => {
    if (useBlur) {
      return (
        <filter data-testid='blurFilter' id="blur">
          <feGaussianBlur stdDeviation={blurValue} in="SourceGraphic" result="BLUR" edgeMode='wrap' ></feGaussianBlur>
        </filter>
      )
    }
    return null
  }

  const setX = (tartanEntity !== undefined ? tartanEntity?.xOffsetThreadCount * 2 * tartanEntity?.scaleFactor : 0)
  const setY = tartanEntity !== undefined ? tartanEntity?.yOffsetThreadCount * 2 * tartanEntity?.scaleFactor : 0

  if (tartanEntity !== undefined) {
    return (
      <svg
        data-testid='tartanImage'
        id={id}
        height={tartanEntity?.imageSize}
        width={tartanEntity?.imageSize}
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {filter(tartanEntity)}
        <defs>
          <mask id="threadHatchingMask" x="0" y="0" width="1" height="1">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#threadHatching)"></rect>
          </mask>
          <ThreadHatching tartan={tartanEntity} />
          <pattern
            data-testid='testSett'
            id="sett"
            x={setX}
            y={setY}
            patternUnits="userSpaceOnUse"
            width={tartanEntity !== null ? tartanEntity?.getSetSize() * tartanEntity?.scaleFactor : 0}
            height={tartanEntity !== null ? tartanEntity?.getSetSize() * tartanEntity?.scaleFactor : 0}
          >
            <Weft tartan={tartanEntity} />
            <Warp tartan={tartanEntity} />
          </pattern>
        </defs>
        <rect
          data-testid='tartanRect'
          x="0" y="0"
          height="100%"
          width="100%"
          fill="url(#sett)"
          filter={tartanEntity.useBlur ? 'url(#blur)' : ''}
        >
          <title>{tartanEntity.name}</title>
        </rect>
      </svg>
    )
  } else {
    return null
  }
}

export default TartanSVG
