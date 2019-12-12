import React from 'react'
import './OfficeTable.css'
import { Collapse, Card, Form, Input, Button } from 'antd'
import * as R from 'ramda'
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

const OfficeTable = ({ offices, handleEditDevice }) => {
  const rows = offices.map(off => {
    return( 
      <Panel
        key={off.slug}
        header={off.name}>
        
        <Devices
          key={`${off.slug}-${offices.indexOf(off)}`}
          officeSlug={off.slug}
          devices={off.devices}
          handleEditDevice={handleEditDevice} />

      </Panel>
    )
  })
  return(
      <Collapse
        key="office-table-list"
        className="office-table-list"
        defaultActiveKey={[]}>
        
        {rows}

      </Collapse>
  )
}


export default OfficeTable