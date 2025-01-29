import React, { useEffect, useState, type ReactElement } from 'react'
import { Weft } from './Weft'
import { Warp } from './Warp'
import ThreadHatching from './ThreadHatching'
import { TartanEntity } from '../../../model/tartan/TartanEntity'

interface TartanProps {
  id?: string
  style?: React.CSSProperties
  className?: string
  useFilter?: boolean
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
      useFilter = false
    } = props
    setTartanEntity(new TartanEntity(
      name,
      threadCount,
      colourPalette,
      noOfSetts,
      imageSize,
      xOffsetThreadCount,
      yOffsetThreadCount,
      useFilter
    ))
  }, [props])

  const filter = ({ useFilter }: { useFilter: boolean }): ReactElement | null => {
    if (useFilter) {
      return (
        <>
        <filter id="fabricTexture" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
        </filter>
        <filter id="dustTexture" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="4" result="dust"></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="dust" scale="1"></feDisplacementMap>
        </filter>
        <filter id="threadEmbossing" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"></feGaussianBlur>
            <feOffset in="blur" dx="1" dy="1" result="offsetBlur"></feOffset>
            <feMerge>
                <feMergeNode in="offsetBlur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <filter id="weftVariation" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="weftNoise"></feTurbulence>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" result="weftOverlay"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="weftOverlay" mode="multiply"></feBlend>
        </filter>
        <filter id="warpVariation" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="warpNoise"></feTurbulence>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" result="warpOverlay"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="warpOverlay" mode="multiply"></feBlend>
        </filter>
        <filter id="darkenEffect">
            <feColorMatrix type="matrix" values="
        0.4 0   0   0   0
        0   0.4 0   0   0
        0   0   0.4 0   0
        0   0   0   1   0"></feColorMatrix>
        </filter>
        <mask id="threadHatchingMask" x="0" y="0" width="1" height="1">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#threadHatching)"></rect>
          </mask>
          </>
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
          filter={tartanEntity.useFilter ? 'url(#fabricTexture) url(#dustTexture)' : ''}
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
