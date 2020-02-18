import React, { useState } from 'react'
import { Card } from 'antd'
import Attribute from '../Attribute/Attribute.js'
import { dissoc } from 'ramda'

const Device = ({ device, officeSlug }) => {
  return (
  <Card
      key={device.code}
      title={device.type}
      style={{ width: 300 }}>

      {
        Object.keys(dissoc('type', device)).map(attribute =>
          <Attribute
            key={attribute}
            slug={device.slug}
            attribute={attribute}
            addonBefore={attribute}
            placeholder={device[attribute]}
            editable={!!(attribute !== 'id') }
          />)
      }
    </Card>
  )
}

export default Device