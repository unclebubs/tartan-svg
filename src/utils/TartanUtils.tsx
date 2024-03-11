export interface Thread {
  colourCode: string
  noOfThreads: number
  isPivot: boolean
}

const HALF_SET_TOKEN: string = '/'

export const addSpaceAfterNumbers = (str: string): string => str.replace(/(\d+)/g, '$1 ')
  .replace(/ {2,}/g, ' ').trim()

export const isHalfSet = (threadCount: string): boolean => {
  const threads = extractThreadsFromThreadCount(threadCount)
  return threads[threads.length - 1].isPivot
}

export const generateSVGData = (threadcount: string,
  palette: string,
  strokeLength: number,
  noOfSetts: number,
  imageSize: number): any => {
  const strokeWidth = strokeLength / 2
  const { sett, settSize } = createTartanSett(palette, threadcount, strokeLength, strokeWidth)
  const settCount = imageSize ? Math.ceil(imageSize / settSize) : noOfSetts
  const fillSize = getFillSize(imageSize, settCount, settSize)
}

export const extractThreadsFromThreadCount = (threadCount: string): Thread[] => {
  const threadCountItems: Thread [] = []
  const threadCountTokens: string[] = addSpaceAfterNumbers(threadCount.toUpperCase()).trim().split(' ')
  threadCountTokens.forEach(threadItem => {
    const newThreadItem = threadItem.replace(/(\d+)/g, (_, num) => {
      return '=' + num
    })

    const threadParts = newThreadItem.trim().split('=')
    if (threadParts[0].length > 0) {
      let colourCode = threadParts[0]
      const isPivot = colourCode.includes(HALF_SET_TOKEN)
      colourCode = isPivot ? colourCode.substring(0, colourCode.indexOf('/')) : colourCode
      const noOfThreads = parseInt(threadParts[1])
      threadCountItems.push({ colourCode, noOfThreads, isPivot } satisfies Thread)
    }
  })
  return threadCountItems
}



  const createSVG = ( threadcount: string, palette: string, strokeLength = 2, imageSize: number, noOfSetts: number ) => {
    const strokeWidth = strokeLength / 2
    const { sett, settSize } = createTartanSett(palette, threadcount, strokeLength, strokeWidth)
    const settCount = imageSize ? Math.ceil(imageSize / settSize) : noOfSetts
    const fillSize = getFillSize(imageSize, settCount, settSize)

    const svgElement = createSVGElement(sett, fillSize, settSize, strokeLength, strokeWidth)
    return svgElement
  }

  const getFillSize = (imageSize: number, noOfSetts: number, settSize: number) => {
    if (noOfSetts) {
      return noOfSetts * settSize
    } else if (imageSize) {
      return imageSize
    }

    return settSize
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

  const   buildThreadcount = (threadcount) => {
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

  §return (
    <>
      <img ref={innerRef} style={style} src={`data:image/svg+xml;utf8;forceReload=${tartan.name + ' ' + tartan.variation},${encodeURIComponent(svgData)}`} alt='generated swatch' />
      <div dangerouslySetInnerHTML={{ __html: svgData }}></div>
    </>
  )
}
