import React, { useState } from 'react'
import './OfficeTable.css'
import { Collapse, Card, Form, Input, Button } from 'antd'
import * as R from 'ramda'
import axios from 'axios'
const { Panel } = Collapse

const Devices = ({ officeSlug, devices, handleEditDevice }) => {

  const handleSubmit = e => {
    e.preventDefault()
    const values = e.target
    const [ id, ip, code, type ] = [values[0].value, values[1].value, values[2].value, values[3].value]
    console.log('form submited')
    console.log(`ip: ${ip}, code: ${code}, id: ${id}, type: ${type}`)
    handleEditDevice({ id, ip, code, type, officeSlug })
  }

  return R.values(devices).map(device => (
    <Card
      key={device.code}
      title={device.type}
      style={{ width: 300 }}>

      <Form onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            addonBefore="id"
            defaultValue={device.id}
            disabled={true}
            style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item>
          <Input
            addonBefore="ip"
            defaultValue={device.ip}
            style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item>
          <Input
            addonBefore="code"
            defaultValue={device.code}
            style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item>
          <Input
            hidden={true}
            defaultValue={device.type}/>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
              Submit
            </Button>
        </Form.Item>

      </Form>

    </Card>)
  )
}

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