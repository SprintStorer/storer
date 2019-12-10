import React, { useState } from 'react';
import './App.css';
import OfficeTable from './components/OfficeTable.js'
import * as R from 'ramda'
import { Input } from 'antd';
const { Search } = Input;

const App = () => {
  // const [ offices, setOffices ] = useState({})

  // const handleChangeOffice = (e) => {
  //   setOffice(e.target.value)
  // }

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

  const [ searchObjHolder, setSearchObjHolder ] = useState(state)

  const setDeviceIp = (event, officeSlug, code) => {
    console.log(event.target.value)
    const ip = event.target.value
    const officesUpdated = R.assocPath([officeSlug, 'devices', code, 'ip'], ip, this.state.offices)
    // this.setState({ offices: officesUpdated })
  }

  const handleOnSearch = officeText => {
    const cleanOfficeText = officeText.toLowerCase();
    console.log('search text:', cleanOfficeText)
    const patt = new RegExp(cleanOfficeText)
    const filtered = R.filter(office => {
      const test = patt.test(office.name.toLowerCase())
      return test
    }, state.offices)
    setSearchObjHolder({ offices: filtered })
  }

  const handleSearchOnChange = e => {
    const officeText = e.target.value
    if (e.target.value === "") return setSearchObjHolder(state)
    if (officeText.length < 3) return

    const cleanOfficeText = officeText.toLowerCase()
    const patt = new RegExp(cleanOfficeText)
    const filtered = R.filter(office => {
      const test = patt.test(office.name.toLowerCase())
      return test
    }, state.offices)
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
        setDeviceIp={setDeviceIp}
      />
    </div>
  );
}

export default App;
