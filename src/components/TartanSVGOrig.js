/* eslint-disable */
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { create } = require('xmlbuilder2')

const SVG_NS = 'http://www.w3.org/2000/svg'

const TartanSVGOrig = (props) => {
  const [svgData, setSvgData] = useState(null)
  const { tartan } = props
  const { threadSize = 2, noOfSetts = 1, innerRef, imageSize = null, style = { display: 'none' } } = props

  useEffect(() => {
    console.log('In TartansSVGOrig update')
    const svg = createSVG({ threadcount: tartan.threadcount, palette: tartan.palette, strokeLength: threadSize, noOfSetts, imageSize })
    const xml = create(svg, { encoding: 'utf-8' }).end({ pretty: true })
    const xmlString = xml.toString()
    setSvgData(xmlString)
  }, [tartan])

  const createSVG = ({ threadcount, palette, strokeLength = 2, imageSize }) => {
    const strokeWidth = strokeLength / 2
    const { sett, settSize } = createTartanSett(palette, threadcount, strokeLength, strokeWidth)
    const settCount = imageSize ? Math.ceil(imageSize / settSize) : noOfSetts
    const fillSize = getFillSize(imageSize, settCount, settSize)

    const svgElement = createSVGElement(sett, fillSize, settSize, strokeLength, strokeWidth)
    return svgElement
  }

  const getFillSize = (imageSize, noOfSetts, settSize) => {
    if (noOfSetts) {
      return noOfSetts * settSize
    } else if (imageSize) {
      return imageSize
    }

    return settSize
  }

  const createDefsElement = (sett, fillSize, settSize, strokeLength, strokeWidth) => {
    return {
      defs: {
        mask: createMaskElement().mask,
        pattern: [createThreadHatchingPattern(strokeLength, strokeWidth).pattern, createSettPattern(sett, settSize).pattern]
        // filter: createNoiseFilter().filter
      }
    }
  }

  const createMaskElement = () => {
    return {
      mask: {
        '@id': 'threadHatchingMask',
        '@x': '0',
        '@y': '0',
        '@width': '1',
        '@height': '1',

        rect: {
          '@x': '0',
          '@y': '0',
          '@width': '100%',
          '@height': '100%',
          '@fill': 'url(#threadHatching)'
        }
      }
    }
  }

  const createThreadHatchingPattern = (strokeLength = 2, strokeWidth = 1) => {
    return {
      pattern: {
        '@id': 'threadHatching',
        '@x': '0',
        '@y': '0',
        '@patternUnits': 'userSpaceOnUse',
        '@width': strokeLength * 2,
        '@height': strokeLength * 2,
        rect: [{
          '@x': '0',
          '@y': -strokeLength / 2,
          '@height': strokeLength,
          '@width': strokeWidth,
          '@fill': 'white'
        },
        {
          '@x': '0',
          '@y': strokeLength + strokeLength / 2,
          '@height': strokeLength,
          '@width': strokeWidth,
          '@fill': 'white'
        },
        {
          '@x': strokeWidth,
          '@y': '0',
          '@height': strokeLength,
          '@width': strokeWidth,
          '@fill': 'white'
        },
        {
          '@x': strokeWidth * 2,
          '@y': strokeLength / 2,
          '@height': strokeLength,
          '@width': strokeWidth,
          '@fill': 'white'
        },
        {
          '@x': strokeWidth * 3,
          '@y': strokeLength,
          '@height': strokeLength,
          '@width': strokeWidth,
          '@fill': 'white'
        }
        ]
      }
    }
  }

  const createSettPattern = (sett, settSize) => {
    return {
      pattern: {
        '@id': 'sett',
        '@x': '0',
        '@y': '0',
        '@patternUnits': 'userSpaceOnUse',
        '@width': settSize,
        '@height': settSize,
        g: [createWeftElement(sett.weft).g, createWarpElement(sett.warp).g]
      }
    }
  }

  const createWarpElement = (warp) => {
    return {
      g: {
        '@id': 'warp',
        '@mask': 'url(#threadHatchingMask)',
        rect: warp.map(({ color, width, height, x, y }) => {
          return { '@fill': `#${color.hex}`, '@width': width, '@height': height, '@x': x, '@y': y }
        })
      }
    }
  }

  const createWeftElement = (weft) => {
    return {
      g: {
        '@id': 'weft',
        rect: weft.map(({ color, width, height, x, y }) => {
          return { '@fill': `#${color.hex}`, '@width': width, '@height': height, '@x': x, '@y': y }
        })
      }
    }
  }

  const createNoiseFilter = () => {
    return {
      filter: {
        '@id': 'noise',
        feTurbulence: { '@baseFrequency': '1', '@xresult': 'colorNoise' },
        feColorMatrix: { '@in': 'colorNoise', '@type': 'matrix', '@values': '1.9 1.9 1.9 0 0 1.9 1.9 1.9 0 0 1.9 1.9 1.9 0 0 0 0 0 1 0', '@result': 'monoNoise' },
        feBlend: { '@in': 'SourceGraphic', '@in2': 'monoNoise', '@mode': 'multiply' }
      }
    }
  }

  const createTartanSett = (palette, threads, strokeLength, strokeWidth) => {
    const colorPalette = buildcolorPalette(palette)
    const threadCount = buildThreadcount(threads)
    const settSize = getSettSize(threadCount, strokeWidth)
    const sett = {}
    // "@fill": "#F8F8F8", "@width": "8", "@height": "100%", "@x": "0", "@y": "0"}
    let warpX = 0
    sett.warp = threadCount.map(({ color, count }) => {
      warpX += count
      return {
        color: colorPalette[color],
        width: count * strokeWidth,
        height: '100%',
        x: warpX - count,
        y: 0
      }
    })

    let weftY = 0
    sett.weft = threadCount.map(({ color, count }) => {
      weftY += count
      return {
        color: colorPalette[color],
        width: '100%',
        height: count * strokeWidth,
        x: 0,
        y: weftY - count
      }
    })

    return { sett, settSize }
  }

  const getNoOfThreads = (threadCount) => {
    let threads = 0
    threadCount.forEach(thread => {
      threads += thread.count
    })
    return threads
  }

  const getSettSize = (threadCount, strokeWidth) => {
    return getNoOfThreads(threadCount) * strokeWidth
  }

  const buildThreadcount = (threadcount) => {
    const hasPivots = threadcount.indexOf('/') !== -1
    const threads = threadcount.trim().split(' ')
    const allThreads = []
    threads.forEach(thread => {
      const newThread = thread.replace(/(\d+)/g, (_, num) => {
        return '=' + num
      })
      const threadParts = newThread.trim().split('=')
      if (threadParts[0]) {
        let color = threadParts[0]
        const pivotIndex = color.indexOf('/')
        const isPivot = pivotIndex !== -1
        color = isPivot ? color.substring(0, pivotIndex) : color
        const count = parseInt(threadParts[1])
        allThreads.push({ color, count, isPivot })
      }
    })

    if (hasPivots) {
      threads.reverse()
      for (let i = 1; i < threads.length - 1; i++) {
        const newThread = threads[i].replace(/(\d+)/g, (_, num) => {
          return '=' + num
        })
        const threadParts = newThread.trim().split('=')
        if (threadParts[0]) {
          let color = threadParts[0]
          const pivotIndex = color.indexOf('/')
          const isPivot = pivotIndex !== -1
          color = isPivot ? color.substring(0, pivotIndex) : color
          const count = parseInt(threadParts[1])
          allThreads.push({ color, count, isPivot })
        }
      }
    }

    return allThreads
  }

  const buildcolorPalette = (palette) => {
    palette = palette.slice(0, palette.length - 1) // knock off last ":"
    const colors = palette.split(';')
    const colorPalette = {}
    colors.forEach(color => {
      const hashIndex = color.indexOf('#')
      const colorCode = color.substring(0, hashIndex).trim()
      const hex = color.substring(hashIndex + 1, hashIndex + 7).trim()
      const name = color.substring(hashIndex + 7).trim()
      colorPalette[colorCode] = { hex, name }
    })
    return colorPalette
  }

  const createSVGElement = (sett, fillSize, settSize, strokelength, strokeWidth) => {
    return {
      svg:
      {
        '@id': tartan.name + '_' + tartan.variation,
        '@height': fillSize,
        '@width': fillSize,
        '@style': 'border: 1px solid black',
        '@xmlns': SVG_NS,
        defs: createDefsElement(sett, fillSize, settSize, strokelength, strokeWidth).defs,
        rect: { '@x': '0', '@y': '0', '@height': '100%', '@width': '100%', '@fill': 'url(#sett)' }
      }
    }
  }

  console.log('About to return svg for ', tartan.name + tartan.variation)
  return (
    <>
      <img ref={innerRef} style={style} src={`data:image/svg+xml;utf8;forceReload=${tartan.name + ' ' + tartan.variation},${encodeURIComponent(svgData)}`} alt='generated swatch' />
      <div dangerouslySetInnerHTML={{ __html: svgData }}></div>
    </>
  )
}
export default TartanSVGOrig
