import React, { Component } from 'react';
import './App.css';
import OfficeTable from './OfficeTable.js'

class App extends Component {
  render() {
    const offices = [
      {
        slug: 'zero-q-demo',
        name: 'Zeroq Demo',
        devices: [
          {
            type: "totem",
            ip: '192.168.1.200',
          },
          {
            type: "tv-box",
            ip: '192.168.1.201',
          }
        ]
      },
      {
        slug: 'zero-q-mock',
        name: 'Zeroq Mock',
        devices: [
          {
            type: "totem",
            ip: '192.168.1.202',
          },
          {
            type: "tv-box",
            ip: '192.168.1.203',
          }
        ]
      },
      {
        slug: 'zero-q-sam',
        name: 'Zeroq Sam',
        devices: [
          {
            type: "totem",
            ip: '192.168.1.204',
          },
          {
            type: "tv-box",
            ip: '192.168.1.205',
          }
        ]
      }
    ]
    return (
      <div>
        <div>
          <h1>Informer</h1> 
      </div>
        <OfficeTable offices={offices}/>
      </div>
    );
  }
}

export default App;
