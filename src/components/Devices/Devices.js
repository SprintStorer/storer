import React, { useState } from 'react'
import './Devices.css'
import { values } from 'ramda'
import Device from '../Device/Device'

const Devices = ({ officeSlug, devices }) => {
  const cards = values(devices).map(device => (
    <Device 
      device={device}
      officeSlug={officeSlug}
    />)
  )

  return (
    <div className="card-wrapper">
      {cards}
    </div>)
}

export default Devices