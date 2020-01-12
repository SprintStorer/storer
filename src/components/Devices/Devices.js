import React, { useState } from 'react'
import './Devices.css'
import * as R from 'ramda'
import Device from '../Device/Device'

const Devices = ({ officeSlug, devices }) => {
  const initialState = R.values(devices).map(({ id }) => id)
  const [isBlocked, setIsBlocked] = useState(initialState)

  const blockUnBlock = id => {
    const updateBlocked = isBlocked.includes(id) ?
      isBlocked.filter(arr => arr !== id) :
      [...isBlocked, id]
    setIsBlocked(updateBlocked)
  }

  const cards = R.values(devices).map(device => (
    <Device 
      device={device}
      officeSlug={officeSlug}
      isBlocked={isBlocked}
      blockUnBlock={blockUnBlock}
    />)
  )

  return (
    <div className="card-wrapper">
      {cards}
    </div>)
}

export default Devices