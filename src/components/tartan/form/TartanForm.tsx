import React, { useState } from 'react'
import { Button, Fade, Form } from 'react-bootstrap'

import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { type UpdateTartanActionType, update, updateOffset, updateFilter, type UpdateOffsetActionType } from '../../../redux/tartan/TartanSlice'

export const TartanForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const [nameValue, setNameValue] = useState('Abercrombie Ancient')
  const [threadCountValue, setThreadCountValue] = useState('CW8G60K2G2K2G6K24DB20R/4')
  const [colourPaletteValue, setColourPaletteValue] = useState('G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;')
  const [noOfSettsValue, setNoOfSettsValue] = useState(1)
  const [imageSizeValue, setImageSizeValue] = useState(500)
  const [xOffsetThreadCountValue, setXOffsetThreadCountValue] = useState(0)
  const [yOffsetThreadCountValue, setYOffsetThreadCountValue] = useState(0)

  const { isUseBlurFilter, blurValue, tartan } = useAppSelector((state) => state.counter)

  const handleUseBlurFilterChange = (checked: boolean, blurValue: number): void => {
    dispatch(updateFilter({ isUseBlurFilter: checked, blurValue }))
  }

  return (

    <Form onSubmit={(e) => { e.preventDefault() }}>
      <Form.Group className="mb-1" controlId="tartanName">
        <Form.Label>Tartan name</Form.Label>
        <Form.Control
          id='tartanName'
          size='sm'
          value={nameValue}
          onChange={(e) => { setNameValue(e.target.value) }}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="tartanThreadcount">
        <Form.Label>Tartan threadcount</Form.Label>
        <Form.Control
          id='tartanThreadcount'
          size='sm'
          value={threadCountValue}
          onChange={(e) => { setThreadCountValue(e.target.value) }}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="tartanColourPalette">
        <Form.Label>Tartan colour palette</Form.Label>
        <Form.Control
          id='tartanColourPalette'
          size='sm'
          placeholder="Colour Palette"
          value={colourPaletteValue}
          onChange={(e) => { setColourPaletteValue(e.target.value) }}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="noOfSetts">
        <Form.Label>No of setts</Form.Label>
        <Form.Control
          id='noOfSetts'
          size='sm'
          type='number'
          value={noOfSettsValue}
          onChange={(e) => { setNoOfSettsValue(parseInt(e.target.value)) }}
        />
      </Form.Group>
      <Form.Group className="mb-1" controlId="imageSize">
        <Form.Label>Image size</Form.Label>
        <Form.Control
          id='imageSize'
          size='sm'
          value={imageSizeValue}
          onChange={(e) => { setImageSizeValue(parseInt(e.target.value)) }}
        />
      </Form.Group>
      <Fade in={tartan.fullSet.length > 0} unmountOnExit={true}>
        <div>
          <Form.Group className="mb-1" controlId="horizontalOffset">
            <Form.Label>Horizontal offset</Form.Label>
            <Form.Range
              id='horizontalOffset'
              list='offsetValues'
              min={0}
              max={tartan.noOfThreads}
              value={xOffsetThreadCountValue}
              onChange={(e) => {
                setXOffsetThreadCountValue(parseInt(e.target.value))
                dispatch(updateOffset({ xOffsetThreadCount: parseInt(e.target.value), yOffsetThreadCount: yOffsetThreadCountValue } satisfies UpdateOffsetActionType))
              }}
            />
            <datalist id="offsetValues">
              <option value="0" label="0"></option>
              <option value={tartan.noOfThreads / 2} label={(tartan.noOfThreads / 2).toString()}></option>
              <option value={tartan.noOfThreads} label={tartan.noOfThreads.toString()}></option>
            </datalist>
          </Form.Group>

          <Form.Group className="mb-1" controlId="verticalOffset">
            <Form.Label>Vertical offset</Form.Label>
            <Form.Range
              id='verticalOffset'
              min={0}
              max={tartan.noOfThreads}
              value={yOffsetThreadCountValue}
              onChange={(e) => {
                setYOffsetThreadCountValue(parseInt(e.target.value))
                dispatch(updateOffset({ xOffsetThreadCount: xOffsetThreadCountValue, yOffsetThreadCount: parseInt(e.target.value) } satisfies UpdateOffsetActionType))
              }}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="blurFilter">
            <Form.Label>Blur filter</Form.Label>
            <Form.Check // prettier-ignore
              type='switch'
              id='blurFilter'
              label='Use blur filter'
              onChange={(e) => { handleUseBlurFilterChange(e.target.checked, blurValue) }}
            />
            <Fade in={isUseBlurFilter}>
              <div>
                <Form.Range max={2} min={0} value={blurValue} step={0.1}
                  onChange={(e) => {
                    handleUseBlurFilterChange(isUseBlurFilter, parseFloat(e.target.value))
                  }}
                />
              </div>
            </Fade>
          </Form.Group>
        </div>
      </Fade>

      <Form.Group className="mb-1" controlId="blurFilter">
        <Button
          type='submit'
          size='sm'
          value='save'
          onClick={(e) => {
            dispatch(update({
              name: nameValue,
              threadCount: threadCountValue,
              colourPalette: colourPaletteValue,
              noOfSetts: noOfSettsValue,
              imageSize: imageSizeValue,
              xOffsetThreadCount: xOffsetThreadCountValue,
              yOffsetThreadCount: yOffsetThreadCountValue
            } satisfies UpdateTartanActionType))
          }}
        >Create image</Button>
      </Form.Group>
    </Form>

  )
}
