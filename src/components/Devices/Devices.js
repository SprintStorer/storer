import React, { useState, useEffect } from 'react'
import './Devices.css'
import Device from '../Device/Device'
import { Button , Tooltip } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'
import NewDevice from './NewDevice'

const Devices = ({ officeSlug, devices }) => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    const originalList = Object.values(devices).map(device => (
      <Device
        device={device}
        officeSlug={officeSlug}
      />
      )
    )
    setCards(originalList)
  }, [devices,officeSlug])

  const handleClick = (e) => {
    const dev = <NewDevice officeSlug={officeSlug} type='New' />
    setCards([...cards, dev])
  }

  return (
    <div className="card-wrapper">
      {cards}
      <div>
        <Tooltip title = 'Agregar Equipo'>
          <Button
          type='primary'
          shape='circle'
          size = 'large'
          onClick= {handleClick} >
          <PlusCircleOutlined />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default Devices