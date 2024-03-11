import React from 'react'
import { Tartan } from './components/Tartan'
import { Col, Container, Row } from 'react-bootstrap'
import TartanSVGNew from './components/TartanSVGNew'
// import TartanSVGOrig from './components/TartanSVGOrig'

// const tartan = {
//   weaverId: '368/2000',
//   name: 'Abercrombie',
//   variation: 'ANCIENT',
//   collatedId: 12,
//   palette: 'DG#003820 DARK GREEN; K#101010 BLACK; B#2C2C80 BLUE; G#006818 GREEN; W#E0E0E0 WHITE;',
//   threadcount: 'G/56 W12 B/28',
//   category: 'Mediumweight Old & Rare Tartans',
//   weaverImg: 'https://d1ssu070pg2v9i.cloudfront.net/pex/houseofedgar/2019/12/02220503/Abercrombie-Ancient-368_2000.-3-scaled.jpg',
//   image: 'https://d1ssu070pg2v9i.cloudfront.net/pex/houseofedgar/2019/12/02220503/Abercrombie-Ancient-368_2000.-3-180x180.jpg',
//   use: true,
//   svgURL: 'https://firebasestorage.googleapis.com/v0/b/virtualtour-e847f.appspot.com/o/master-tartans%2Fhoe%2Fmediumweight-old-rare-tartans%2F368-2000.svg?alt=media'
// }

const App: React.FC = () => {
  return (
    <Container fluid className='bg-dark' style={{ height: '100vh' }}>
      <Row >
        <Col >
        <Tartan />
        </Col>
      </Row>
      <Row >
        <Col>
          <TartanSVGNew id='tartanId' style={{ border: '1px solid red' }} useBlur blurValue={0.5}/>
        </Col>
      </Row>
    </Container>
  )
}

export default App
