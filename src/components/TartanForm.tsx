import React, { useState } from 'react'

import { Button, Col, Form, Row } from 'react-bootstrap'
import { useAppDispatch } from '../app/hooks'
import { type UpdateTartanActionType, update } from '../redux/tartan/TartanSlice'

export const TartanForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const [nameValue, setNameValue] = useState('Abercrombie Ancient')
  const [threadCountValue, setThreadCountValue] = useState('CW8G60K2G2K2G6K24DB20R4')
  const [colourPaletteValue, setColourPaletteValue] = useState('G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;')
  const [noOfSettsValue, setNoOfSettsValue] = useState(1)
  const [imageSizeValue, setImageSizeValue] = useState(500)

  return (
 <Form onSubmit={(e) => { e.preventDefault() }}>
      <Row className='mb-2'>
        <Col >
          <Form.Control
            placeholder="Tartan name"
            value={nameValue}
            onChange={(e) => { setNameValue(e.target.value) }} />
        </Col>
        <Col >
          <Form.Control
            placeholder="Thread Count"
            value={threadCountValue}
           onChange={(e) => { setThreadCountValue(e.target.value) }} />
        </Col>
        <Col>
          <Form.Control
            placeholder="Colour Palette"
            value={colourPaletteValue}
           onChange={(e) => { setColourPaletteValue(e.target.value) }}/>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Form.Control
            placeholder="No of setts"
            type='number'
            value={noOfSettsValue}
           onChange={(e) => { setNoOfSettsValue(parseInt(e.target.value)) }} />
        </Col>
        <Col>
          <Form.Control
            placeholder="image Size"
            value={imageSizeValue}
           onChange={(e) => { setImageSizeValue(parseInt(e.target.value)) }} />
        </Col>

      </Row>
      <Row className='mb-2'>
        <Col className=' text-end'>
          |<Button
            type='submit'
            value='save'
            onClick={(e) => {
              dispatch(update({
                name: nameValue,
                threadCount: threadCountValue,
                colourPalette: colourPaletteValue,
                noOfSetts: noOfSettsValue,
                imageSize: imageSizeValue
              } satisfies UpdateTartanActionType))
            }}
          >Create image</Button>
        </Col>

      </Row>
    </Form>
  )
}
