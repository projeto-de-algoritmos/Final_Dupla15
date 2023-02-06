import React, { useEffect, useState } from 'react';
import data from './data/data.json';
import CytoscapeComponent from 'react-cytoscapejs';

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

const buildElements = () => {
  let elements = []

  const screenWidth = window.screen.width
  const screenHeight = window.screen.width

  for (let i = 0; i < data.length; i++) {
    elements.push({ data: { id: i, label: data[i].name }, position: { x: screenWidth * 0.1 * data[i].position_x, y: screenHeight * 0.1 * data[i].position_y } })

    // for (let j = i; j < data[i].edges.length; j++) {
    //   if (data[i].edges[j] !== 0) {
    //     elements.push({ data: { source: i, target: j, label: `${data[i].edges[j]} m` }, selectable: false })
    //   }
    // }
  }

  console.log(elements)

  return elements
}

export default function App() {
  const elements = buildElements()

  const setListeners = (cy) => {
    // example cytoscape event listener
    cy.on('mouseover', 'edge', (event) => {
      console.log(cy)
    });
  };

  console.log(window.screen.width)


  return (
    <div className='App'>
      <main>
        <CytoscapeComponent
          elements={elements}
          // autolock
          style={{ width: '100vw', height: '80vh' }}
          layout={{ name: 'preset' }}
          stylesheet={stylesheet}
          cy={(cy) => {
            setListeners(cy);
          }}
        />
      </main>
    </div>
  );
}
