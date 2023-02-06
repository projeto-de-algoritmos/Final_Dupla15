import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Button } from 'react-bootstrap';
import CytoscapeComponent from 'react-cytoscapejs';
import attractions from './utils/pontos_turisticos';
import CalculateTSPCostNPath from './utils/tsp';

const stylesheet = [
  {
    selector: 'node',
    style: {
      width: 50,
      height: 50,
      "font-size": "50px",
      label: 'data(label)',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 10,
      "font-size": "50px",
      label: 'data(label)',
    },
  },
];

// const buildElements = () => {
//   let elements = []

//   const screenWidth = window.screen.width
//   const screenHeight = window.screen.width

//   for (let i = 0; i < data.length; i++) {
//     elements.push({ data: { id: i, label: data[i].name }, position: { x: screenWidth * 0.1 * data[i].position_x, y: screenHeight * 0.1 * data[i].position_y } })

//     // for (let j = i; j < data[i].edges.length; j++) {
//     //   if (data[i].edges[j] !== 0) {
//     //     elements.push({ data: { source: i, target: j, label: `${data[i].edges[j]} m` }, selectable: false })
//     //   }
//     // }
//   }

//   // console.log(elements)

//   return elements
// }

export default function App() {
  const [selectedAttractions, setSelectedAttractions] = useState([0])

  const setListeners = (cy) => {
    // example cytoscape event listener
    cy.on('mouseover', 'edge', (event) => {
      console.log(cy)
    });
  };

  const handleCardClick = (index) => {
    if (selectedAttractions.includes(index))
      setSelectedAttractions(selectedAttractions.filter(x => x !== index));
    else
      setSelectedAttractions([...selectedAttractions, index])
  }

  const handleButtonSubmit = () => {
    const { cost, path } = CalculateTSPCostNPath(selectedAttractions.map((attraction) => parseInt(attraction)))
    console.log(cost, path)
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
        <Row>
          {attractions.map((attraction, index) => {
            if (index !== 0) {
              return <Card
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
            } else {
              return <></>
            }
          })}
          {/* <CytoscapeComponent
          elements={elements}
          // autolock
          style={{ width: '100vw', height: '80vh' }}
          layout={{ name: 'preset' }}
          stylesheet={stylesheet}
          cy={(cy) => {
            setListeners(cy);
          }}
        /> */}
        </Row>
        <Button onClick={handleButtonSubmit} variant="info" style={{ marginTop: '30px' }}>
          Obter menor rota
        </Button>
      </Container >
    </div>
  );
}
