import { type Thread } from '../utils/TartanUtils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { create } = require('xmlbuilder2')

const SVG_NS = 'http://www.w3.org/2000/svg'
const IMAGE_SIZE = 4096

export interface TartanProps {
  palette: string
  threadcount: string
}

export interface AllTartanProps {
  tartan: TartanProps
  threadSize: number
}

export interface Colour {
  hex: string
  name: string
}

export const getImageData = (props: AllTartanProps): string => {
  const { palette, threadcount } = props.tartan
  const { threadSize = 2 } = props
  const svg = createSVG(threadcount, palette, threadSize)
  const xml = create(svg, { encoding: 'utf-8' }).end({ pretty: true })

  const xmlString: string = xml.toString()

  return xmlString
  // return `data:image/svg+xml;utf8,${encodeURIComponent(xmlString)}`
}

// TODO REPLACE ANY RETURN TYPE
const createSVG = (threadcount: string, palette: string, strokeLength = 2): any => {
  const strokeWidth = strokeLength / 2
  const { sett, settSize } = createTartanSett(palette, threadcount, strokeLength, strokeWidth)
  const noOfSetts = Math.ceil(IMAGE_SIZE / settSize)

  const fillSize = getFillSize(IMAGE_SIZE, noOfSetts, settSize)

  const svgElement = createSVGElement(sett, fillSize, settSize, strokeLength, strokeWidth)
  return svgElement
}

const getFillSize = (imageSize: number, noOfSetts: number, settSize: number): number => {
  if (noOfSetts !== 0) {
    return noOfSetts * settSize
  } else if (imageSize !== 0) {
    return imageSize
  }

  return settSize
}

// TODO FIX TYPING
const createDefsElement = (sett: Sett, fillSize: number, settSize: number, strokeLength: number, strokeWidth: number): any => {
  return {
    defs: {
      mask: createMaskElement().mask,
      pattern: [createThreadHatchingPattern(strokeLength, strokeWidth).pattern, createSettPattern(sett, settSize).pattern]
      // filter: createNoiseFilter().filter
    }
  }
}

const createMaskElement = (): any => {
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

const createThreadHatchingPattern = (strokeLength = 2, strokeWidth = 1): any => {
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

const createSettPattern = (sett: Sett, settSize: number): any => {
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

export interface Warp {
  color: Colour | undefined
  width: string
  height: string
  x: number
  y: number
}

export interface Sett {
  warp: Warp[]
  weft: Warp[]
}

const createWarpElement = (warp: Warp[]): any => {
  return {
    g: {
      '@id': 'warp',
      '@mask': 'url(#threadHatchingMask)',
      rect: warp.map(({ color = {}, width, height, x, y }): any => {
        return { '@fill': `#${color.hex}`, '@width': width, '@height': height, '@x': x, '@y': y }
      })
    }
  }
}

const createWeftElement = (weft: Warp[]): any => {
  return {
    g: {
      '@id': 'weft',
      rect: weft.map(({ color = {}, width, height, x, y }) => {
        return { '@fill': `#${color.hex}`, '@width': width, '@height': height, '@x': x, '@y': y }
      })
    }
  }
}

// const createNoiseFilter = (): any => {
//   return {
//     filter: {
//       '@id': 'noise',
//       feTurbulence: { '@baseFrequency': '1', '@xresult': 'colorNoise' },
//       feColorMatrix: { '@in': 'colorNoise', '@type': 'matrix', '@values': '1.9 1.9 1.9 0 0 1.9 1.9 1.9 0 0 1.9 1.9 1.9 0 0 0 0 0 1 0', '@result': 'monoNoise' },
//       feBlend: { '@in': 'SourceGraphic', '@in2': 'monoNoise', '@mode': 'multiply' }
//     }
//   }
// }

export interface SettAndSize {
  sett: Sett
  settSize: number
}
const createTartanSett = (palette: string, threads: string, strokeLength: number, strokeWidth: number): SettAndSize => {
  const colorPalette: Map<string, Colour> = buildcolorPalette(palette)
  const threadCount: Thread[] = buildThreadcount(threads)
  const settSize = getSettSize(threadCount, strokeWidth)
  const sett: Sett = { warp: [], weft: [] }
  // "@fill": "#F8F8F8", "@width": "8", "@height": "100%", "@x": "0", "@y": "0"}
  let warpX = 0
  sett.warp = threadCount.map(({ colourCode, noOfThreads }): Warp => {
    warpX += noOfThreads
    return {
      color: colorPalette.get(colourCode),
      width: (noOfThreads * strokeWidth).toString(),
      height: '100%',
      x: warpX - noOfThreads,
      y: 0
    }
  })

  let weftY = 0
  sett.weft = threadCount.map(({ colourCode, noOfThreads }): Warp => {
    weftY += noOfThreads
    return {
      color: colorPalette.get(colourCode),
      width: '100%',
      height: (noOfThreads * strokeWidth).toString(),
      x: 0,
      y: weftY - noOfThreads
    }
  })

  return { sett, settSize }
}

const getNoOfThreads = (threadCount: Thread[]): number => {
  let threads = 0
  threadCount.forEach(thread => {
    threads += thread.noOfThreads
  })
  return threads
}

const getSettSize = (threadCount: Thread[], strokeWidth: number): number => {
  return getNoOfThreads(threadCount) * strokeWidth
}

const buildThreadcount = (threadcount: string): Thread[] => {
  const hasPivots = threadcount.includes('/')
  const threads = threadcount.trim().split(' ')
  const allThreads: Thread[] = []
  threads.forEach(thread => {
    const newThread = thread.replace(/(\d+)/g, (_, num) => {
      return '=' + num
    })
    const threadParts = newThread.trim().split('=')
    if (threadParts[0].length > 0) {
      let color = threadParts[0]
      const pivotIndex = color.indexOf('/')
      const isPivot = pivotIndex !== -1
      color = isPivot ? color.substring(0, pivotIndex) : color
      const count = parseInt(threadParts[1])
      allThreads.push({ colourCode: color, noOfThreads: count, isPivot })
    }
  })

  if (hasPivots) {
    threads.reverse()
    for (let i = 0; i < threads.length - 1; i++) {
      const newThread = threads[i].replace(/(\d+)/g, (_, num) => {
        return '=' + num
      })
      const threadParts = newThread.trim().split('=')
      if (threadParts[0].length > 0) {
        let color = threadParts[0]
        const pivotIndex = color.indexOf('/')
        const isPivot = pivotIndex !== -1
        color = isPivot ? color.substring(0, pivotIndex) : color
        const count = parseInt(threadParts[1])
        allThreads.push({ colourCode: color, noOfThreads: count, isPivot })
      }
    }
  }

  return allThreads
}

const buildcolorPalette = (palette: string): Map<string, Colour> => {
  palette = palette.slice(0, palette.length - 1) // knock off last ":"
  const colors = palette.split(';')
  const colorPalette: Map<string, Colour> = new Map<string, Colour>()
  colors.forEach(color => {
    const hashIndex = color.indexOf('#')
    const colorCode = color.substring(0, hashIndex).trim()
    const hex = color.substring(hashIndex + 1, hashIndex + 7).trim()
    const name = color.substring(hashIndex + 7).trim()
    colorPalette.set(colorCode, { hex, name })
  })
  return colorPalette
}

const createSVGElement = (sett: Sett, fillSize: number, settSize: number, strokelength: number, strokeWidth: number): any => {
  return {
    svg:
    {
      '@height': fillSize,
      '@width': fillSize,
      '@style': 'border: 1px solid black',
      '@xmlns': SVG_NS,
      defs: createDefsElement(sett, fillSize, settSize, strokelength, strokeWidth).defs,
      rect: { '@x': '0', '@y': '0', '@height': '100%', '@width': '100%', '@fill': 'url(#sett)' }
    }
  }
}

export default getImageData
