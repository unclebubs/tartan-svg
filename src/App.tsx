import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import TartanImage from './components/tartan/image/TartanImage'
import { type UpdateTartanActionType } from './model/tartan/TartanSlice'

const TARTAN_PARAMS: UpdateTartanActionType = {
  name: 'HUNTING MACDONALD OF THE ISLES',
  threadCount: 'CW8G60K2G2K2G6K24DB20R/4',
  colourPalette: 'G=006818GREEN;K=101010BLACK;CW=FCFCFCCLEAR;DB=202060DARK BLUE;R=C80000RED;',
  noOfSetts: 1,
  imageSize: 1000,
  xOffsetThreadCount: 0,
  yOffsetThreadCount: 0
}

const App: React.FC = () => {
  return (
    <Container className='bg-light pt-4' style={{ height: '100vh' }}>
      <Row >
        <Col xl={8}>
          <div className='w-100 vh-100 overflow-scroll'>
            <TartanImage id='tartanId' useBlur blurValue={0.5} {...TARTAN_PARAMS} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
