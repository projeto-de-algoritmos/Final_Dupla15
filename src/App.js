import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Button, ListGroup, Badge, Image } from 'react-bootstrap';
import attractions from './utils/pontos_turisticos';
import CalculateTSPCostNPath from './utils/tsp';

export default function App() {
  const [selectedAttractions, setSelectedAttractions] = useState([0])
  const [showResult, setShowResult] = useState(false)
  const [resultPath, setResultPath] = useState([])

  const handleCardClick = (index) => {
    if (selectedAttractions.includes(index))
      setSelectedAttractions(selectedAttractions.filter(x => x !== index));
    else
      setSelectedAttractions([...selectedAttractions, index])
  }

  const handleButtonClick = () => {
    const { cost, path } = CalculateTSPCostNPath(
      selectedAttractions.map((attraction) => parseInt(attraction))
    )

    setResultPath(path)
    setShowResult(true)


  }

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'auto', backgroundColor: '#D3D3D3', padding: '50px 0' }}>
      <Container className='text-center'>
        <Container className='w-75' style={{ marginBottom: '30px' }}>
          <h1>Férias em Barra do Garças</h1>
          <span>
            Aproveitando o final do semestre, você resolveu tirar férias em Barra do Garças - MT e se hospedou no
            Hotel Pousada Arara Azul. Hoje é o dia de conhecer a cidade, e você precisa escolher quais pontos turísticos
            deseja visitar. A partir das suas escolhas, iremos montar uma rota que saia da pousada em que você está
            hospedado, visite todos os pontos escolhidos, e retorne novamente à pousada, percorrendo o menor caminho possível.
          </span>
        </Container>
        {showResult ?
          <ListGroup as="ol" numbered style={{ width: '80%' }}>
            {resultPath.map((attractionIndex, loopIndex) =>
              loopIndex !== resultPath.length ?
                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto" style={{ width: '150px' }}>
                    <Image fluid rounded srcSet={attractions[attractionIndex].image} />
                    {attractions[attractionIndex].name}
                  </div>
                  {/* <div className="ms-2 me-auto">
                  `Saia de ${attractions[attraction].name} para ${attractions[resultPath[index + 1]].name} percorrendo km`
                </div>
                <div style={{ width: '100px' }}> */}
                  <div className="ms-2 me-auto" style={{ width: '150px' }}>
                    <Image fluid rounded srcSet={attractions[resultPath[loopIndex + 1]]?.image} />
                    {attractions[resultPath[loopIndex + 1]]?.name}
                  </div>
                </ListGroup.Item>
                : <></>
            )}
          </ListGroup>
          : <Row style={{ justifyContent: 'space-evenly' }}>
            {attractions.map((attraction, index) =>
              index === 0 ?
                <></> :
                <Card
                  key={index}
                  style={{
                    cursor: 'pointer', width: '15rem', margin: '10px', padding: '0px',
                    backgroundColor: selectedAttractions.includes(index) ? '#20B2AA' : 'white'
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <Card.Img
                    variant="top" src={attraction.image}
                    style={{ height: '60%' }}
                  />
                  <Card.Body>
                    <Card.Title className='text-center'>
                      {attraction.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
            )}
          </Row>
        }
        <Button
          variant={showResult ? "secondary" : "info"} style={{ marginTop: '30px' }}
          onClick={handleButtonClick}>
          {showResult ? "Escolher novos locais" : "Obter menor rota"}
        </Button>
      </Container >
    </div >
  );
}
