import React, { useState } from 'react';
import './App.css';
import OfficeTable from './components/OfficeTable.js'
import * as R from 'ramda'
import { Input } from 'antd';
const { Search } = Input;

const App = () => {

  const initOffices = {
    'zero-q-demo': {
      slug: 'zero-q-demo',
      name: 'Zeroq Demo',
      devices: [
        {
          id: 1,
          code: 'adsf2-demo-1',
          type: "totem",
          ip: '192.168.1.200',
        },
        {
          id: 2,
          code: 'adsf2-demo-2',
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
          id: 3,
          code: 'adsf-mock.1',
          type: "totem",
          ip: '192.168.1.202',
        },
        {
          id: 4,
          code: 'adsf2-mock-2',
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
            id: 5,
            code: 'asdf-sam-1',
            type: 'totem',
            ip: '192.168.1.204',
          },
          {
            id: 6,
            code: 'asdf-sam-2',
            type: "tv-box",
            ip: '192.168.1.205',
          }
        ]
    }
  }

  const [ offices, setOffices ] = useState(initOffices)

  const [ searchObjHolder, setSearchObjHolder ] = useState(offices)

  const handleEditDevice = ({ officeSlug, ...device }) => {
    console.log('office slug', officeSlug)
    console.log('deviceItem', device)

    const devices = offices[officeSlug].devices
    const updatedDevices = [ device, ...devices.filter(d => d.id !== device.id)]
    const officesUpdated = R.assocPath([officeSlug, 'devices'], updatedDevices, offices)
    console.log(officesUpdated)
    setOffices(officesUpdated)
  }

  const handleOnSearch = officeText => {
    const cleanOfficeText = officeText.toLowerCase();
    console.log('search text:', cleanOfficeText)
    const patt = new RegExp(cleanOfficeText)
    const filtered = R.filter(office => {
      const test = patt.test(office.name.toLowerCase())
      return test
    }, offices)
    setSearchObjHolder({ offices: filtered })
  }

  const handleSearchOnChange = e => {
    const officeText = e.target.value
    if (e.target.value === "") return setSearchObjHolder(initOffices)
    if (officeText.length < 3) return

    const cleanOfficeText = officeText.toLowerCase()
    const patt = new RegExp(cleanOfficeText)
    const filtered = R.filter(office => {
      const test = patt.test(office.name.toLowerCase())
      return test
    }, offices)
    setSearchObjHolder({ offices: filtered })
  }

  return (
    <div>
      <div>
        <h1>Storer</h1>
      </div>
      <Search
        className="search-bar"
        placeholder="search for an office"
        enterButton="Search"
        size="large"
        onSearch={handleOnSearch}
        onChange={handleSearchOnChange}
      />
      <OfficeTable 
        offices={R.values(searchObjHolder.offices)}
        handleEditDevice={handleEditDevice}
      />
    </div>
  );
}

export default App;
