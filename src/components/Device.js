import React from 'react'
import { Card, Form, Button, Input } from 'antd'
import axios from 'axios'

const Device = ({ device, officeSlug, isBlocked, blockUnBlock }) => {

  const handleEditDevice = ({ officeSlug, ...device }) => {
    console.log('office slug', officeSlug)
    console.log('deviceItem', device)

    const updateDevice = async () => {
      const { data } = await axios.post(`http://localhost:4000/mock/offices/${officeSlug}/device`, { device } )
      console.log('device updated:', data)
    }
    updateDevice()
  }

  const handleSubmit = e => {
    e.preventDefault()
    const values = e.target
    const [ id, ip, code, type ] = [values[0].value, values[1].value, values[2].value, values[3].value]
    console.log('form submited')
    console.log(`ip: ${ip}, code: ${code}, id: ${id}, type: ${type}`)
    handleEditDevice({ id, ip, code, type, officeSlug })
  }
  return (

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
            disabled={isBlocked.includes(device.id)}
            style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item>
          <Input
            addonBefore="code"
            defaultValue={device.code}
            disabled={isBlocked.includes(device.id)}
            style={{ width: 200 }}/>
        </Form.Item>

        <Form.Item>
          <Input
            hidden={true}
            defaultValue={device.type}/>
        </Form.Item>
        
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isBlocked.includes(device.id)}>
              Submit
            </Button>
        </Form.Item>

      </Form>

      <Button
        type="secundary"
        onClick={() => blockUnBlock(device.id)}>

          {isBlocked ? "Unblock": "block"}

      </Button>
    </Card>
  )
}

export default Device