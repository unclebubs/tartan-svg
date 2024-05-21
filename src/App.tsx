import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TartanImage from './components/tartan/image/TartanImage'
import { TartanForm } from './components/tartan/form/TartanForm'

const App: React.FC = () => {
  return (
    <Container className='bg-light pt-4' style={{ height: '100vh' }}>
      <Row >
        <Col xl={4} >
        <TartanForm />
        </Col>

        <Col xl={8}>
          <div className='w-100 vh-100 overflow-scroll'>
            <TartanImage id='tartanId' useBlur blurValue={0.5} />
            </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
