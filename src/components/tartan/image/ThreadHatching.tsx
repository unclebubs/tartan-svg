import React from 'react'

import { type TartanEntity } from '../../../model/tartan/TartanEntity'

interface TartanProp {
  tartan: TartanEntity
}

const ThreadHatching: React.FC<TartanProp> = (props) => {
  const { tartan } = props
  const x = (tartan === null ? 2 : tartan.scaledStrokeLength)

  return (
    <pattern data-testid='pattern' id="threadHatching" x="0" y="0" patternUnits="userSpaceOnUse" width={x * 2} height={x * 2}>
      <rect x="0" y={-x / 2} height={x} width={x / 2} fill="white"></rect>
      <rect x="0" y={x * 1.5} height={x} width={x / 2} fill="white"></rect>
      <rect x={x / 2} y="0" height={x} width={x / 2} fill="white"></rect>
      <rect x={x} y={x / 2} height={x} width={x / 2} fill="white"></rect>
      <rect x={x * 1.5} y={x} height={x} width={x / 2} fill="white"></rect>
    </pattern>
  )
}
export default ThreadHatching
