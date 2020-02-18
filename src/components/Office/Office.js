import React from 'react'
import { Card } from 'antd'
import Attribute from '../Attribute/Attribute.js'

const Office = ({ office }) => {
  console.log('office attributes', Object.keys(office))

  return(
    <Card
      key={office.slug}
      title="Info"
      style={{ width: 500 }}>

      {
        Object.keys(office).map(attribute => 
          <Attribute 
            key={attribute}
            slug={office.slug}
            attribute={attribute}
            addonBefore={attribute}
            placeholder={office[attribute]}
            editable={!!(attribute !== 'slug')}
          />)
      }

    </Card>
  )
}

export default Office;