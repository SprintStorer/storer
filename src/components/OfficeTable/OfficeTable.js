import React, { useState } from 'react'
import axios from 'axios'
import './OfficeTable.css'
import Office from '../Office/Office'
import Devices from '../Devices/Devices'
import { Collapse } from 'antd'
import { dissoc } from 'ramda'
const { Panel } = Collapse

const OfficeTable = ({ offices }) => {
  const [office, setOffice] = useState({})

  const handleOnChangeCollapse = officeTarget => {
    if (!officeTarget) return
    
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
        
        <Office
          key={office.slug}
          office={dissoc('devices', office)}
        />
        {
          office.devices && <Devices
            key={`${office.slug}-${offices.indexOf(off)}`}
            officeSlug={office.slug}
            devices={office.devices}
          />
        }
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