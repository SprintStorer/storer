import React, { useState } from 'react'
import './Devices.css'
import * as R from 'ramda'
import { Card, Form, Input, Button } from 'antd'

const Devices = ({ officeSlug, devices, handleEditDevice }) => {
  const initialState = R.values(devices).map(({ id }) => id)
  const [isBlocked, setIsBlocked] = useState(initialState)

  const handleSubmit = e => {
    e.preventDefault()
    const values = e.target
    const [ id, ip, code, type ] = [values[0].value, values[1].value, values[2].value, values[3].value]
    console.log('form submited')
    console.log(`ip: ${ip}, code: ${code}, id: ${id}, type: ${type}`)
    handleEditDevice({ id, ip, code, type, officeSlug })
  }

  const blockUnBlock = id => {
    const updateBlocked = isBlocked.includes(id) ?
      isBlocked.filter(arr => arr !== id) :
      [...isBlocked, id]
    setIsBlocked(updateBlocked)
  }

  const cards = R.values(devices).map(device => (
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
    </Card>)
  )

  return (
    <div className="card-wrapper">
      {cards}
    </div>)
}

export default Devices