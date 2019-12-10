import React, { useState } from 'react';
import './App.css';
import OfficeTable from './components/OfficeTable.js'
import * as R from 'ramda'

const App = () => {
  const [ offices, setOffices ] = useState({});
  const [ office, setOffice ] = useState({})

  const handleChangeOffice = (e) => {
    setOffice(e.target.value)
  }

  const state = {
    offices: {
      'zero-q-demo': {
        slug: 'zero-q-demo',
        name: 'Zeroq Demo',
        devices: [
          {
            code: 'adsf2-demo',
            type: "totem",
            ip: '192.168.1.200',
          },
          {
            code: 'adsf2-demo',
            type: "tv-box",
            ip: '192.168.1.201',
          }
        ]
      },
      'zero-q-mock': {
        slug: 'zero-q-mock',
        name: 'Zeroq Mock',
        devices: [
          {
            code: 'adsf-mock',
            type: "totem",
            ip: '192.168.1.202',
          },
          {
            code: 'adsf2-mock',
            type: "tv-box",
            ip: '192.168.1.203',
          }
        ]
      },
      'zero-q-sam': {
          slug: 'zero-q-sam',
          name: 'Zeroq Sam',
          devices: [
            {
              code: 'asdf-sam',
              type: 'totem',
              ip: '192.168.1.204',
            },
            {
              code: 'asdf-sam',
              type: "tv-box",
              ip: '192.168.1.205',
            }
          ]
      }
    }
  }

  const setDeviceIp = (event, officeSlug, code) => {
    console.log(event.target.value)
    const ip = event.target.value
    const officesUpdated = R.assocPath([officeSlug, 'devices', code, 'ip'], ip, this.state.offices)
    // this.setState({ offices: officesUpdated })
  }

  return (
    <div>
      <div>
        <h1>Storer</h1>
      </div>
      <OfficeTable 
        offices={R.values(state.offices)}
        setDeviceIp={setDeviceIp}
        office={office}
        handleChangeOffice={handleChangeOffice}
      />
    </div>
  );
}

export default App;
