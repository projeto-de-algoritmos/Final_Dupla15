import React, { useState } from 'react';
import { Card, Container, Row, Button, ListGroup, Image } from 'react-bootstrap';
import attractions from './utils/pontos_turisticos';
import CalculateTSPCostNPath from './utils/tsp';

export default function App() {
  const [selectedAttractions, setSelectedAttractions] = useState([0])
  const [showResult, setShowResult] = useState(false)
  const [resultPath, setResultPath] = useState([])
  const [minCost, setMinCost] = useState(0)

  const handleCardClick = (index) => {
    if (selectedAttractions.includes(index))
      setSelectedAttractions(selectedAttractions.filter(x => x !== index));
    else
      setSelectedAttractions([...selectedAttractions, index])
  }

  const resetAttractions = () => {
    setSelectedAttractions([0])
    setShowResult(false)
    setResultPath([])
    setMinCost(0)
  }

  const handleButtonClick = () => {
    if (showResult) {
      resetAttractions()
    } else {
      const { cost, path } = CalculateTSPCostNPath(
        selectedAttractions.map((attraction) => parseInt(attraction))
      )
      setMinCost(cost)
      setResultPath(path)
      setShowResult(true)
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'auto', backgroundColor: '#D3D3D3', padding: '50px 0' }}>
      <Container className='d-flex justify-content-center align-items-center flex-column text-center'>
        <Container className='w-75' style={{ marginBottom: '30px' }}>
          <h1>Férias em Barra do Garças</h1>
          <span>
            Aproveitando o final do semestre, você resolveu tirar férias em Barra do Garças - MT e se hospedou no
            Hotel Pousada Arara Azul. Hoje é o dia de conhecer a cidade, e você precisa escolher quais pontos turísticos
            deseja visitar. A partir das suas escolhas, iremos montar uma rota que saia da pousada em que você está
            hospedado, visite todos os pontos escolhidos, e retorne novamente à pousada, percorrendo o menor caminho possível.
          </span>

          {showResult && 
            <div>
              <h6 style={{ marginTop: '30px' }}>
                A menor rota para visitar todos os locais selecionados 
                e retornar ao destino possui:
              </h6>
              <h3 style={{ color: '#20B2BB', textDecoration: 'solid underline 5px' }}>
                {minCost / 1000.00}km
              </h3>
            </div>
          }
        </Container>
        {showResult ?
          <ListGroup as="ol" numbered style={{ width: '80%' }}>
            {resultPath.map((attractionIndex, loopIndex) => {
              if (loopIndex !== resultPath.length - 1) {
                const currentAttraction= attractions[attractionIndex]
                const nextAttraction = attractions[resultPath[loopIndex + 1]]

                return (
                  <ListGroup.Item className="d-flex w-100 align-items-center  flex-row" key={loopIndex} as="li">
                    <div style={{ width: '150px', marginLeft: '20px' }}>
                      <Image fluid rounded srcSet={currentAttraction.image} />
                      {currentAttraction.name}
                    </div>
                    <div style={{ width: '60%', margin: '0 40px' }}>
                      Saia de <strong>{currentAttraction.name}</strong> para <strong>{nextAttraction?.name}</strong>{' '}
                      percorrendo <strong>{currentAttraction.dist[resultPath[loopIndex + 1]] / 1000.00}km</strong>
                    </div>
                    <div style={{ width: '150px' }}>
                      <Image fluid rounded srcSet={nextAttraction?.image} />
                      {nextAttraction?.name}
                    </div>
                  </ListGroup.Item>
                )
              }
              return null
            })}
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
          {showResult ? "Escolher outros locais" : "Obter menor rota"}
        </Button>
      </Container >
    </div >
  );
}
