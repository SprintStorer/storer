import React, { useState } from 'react'
import * as R from 'ramda'
import axios from 'axios'
import './OfficeTable.css'
import Devices from './Devices'
import { Collapse } from 'antd'
const { Panel } = Collapse

const OfficeTable = ({ offices }) => {
  const [office, setOffice] = useState({})

  const handleEditDevice = ({ officeSlug, ...device }) => {
    console.log('office slug', officeSlug)
    console.log('deviceItem', device)

    const updatedDevices = [ device, ...office.devices.filter(d => d.id !== device.id)]
    const officeUpdated = R.assocPath([office.slug, 'devices'], updatedDevices, office)
    console.log(officeUpdated)
    const updateDevice = async () => {
      const { data } = await axios.post(`http://localhost:4000/mock/offices/${officeSlug}/device`, { device } )
      console.log('device updated:', data)
      setOffice(officeUpdated)
    }
    updateDevice()
  }

  const handleOnChangeCollapse = e => {
    if (!e) return
    console.log('changed!', e)
    const officeTarget = e
    const fetchData = async () => {
      try {
        console.log(`requesting: http://localhost:4000/mock/offices/${officeTarget}`)
        const { data } = await axios.get(`http://localhost:4000/mock/offices/${officeTarget}`)
        console.log('office', data)
        setOffice(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }

  const rows = offices.map(off => {
    return( 
      <Panel
        key={off.slug}
        header={off.name}>
        
        <Devices
          key={`${office.slug}-${offices.indexOf(off)}`}
          officeSlug={office.slug}
          devices={office.devices}
          handleEditDevice={handleEditDevice} />

      </Panel>
    )
  })
  return(
    <Collapse
      key="office-table-list"
      className="office-table-list"
      accordion={true}
      onChange={handleOnChangeCollapse}
      defaultActiveKey={[]}>
      
      {rows}

    </Collapse>
  )
}


export default OfficeTable