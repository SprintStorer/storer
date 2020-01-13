import React, { useState } from 'react'
import { Card, Alert } from 'antd'
import Attribute from './Attribute'

const Office = ({ office }) => {
  console.log('office attributes', Object.keys(office))
  const [alert, setAlert] = useState('')

  const getAlertType = (type) => {
    const message = (type === 'success') ? 'Device updated' : 'Error on update'
    return (
      <Alert
          message={message}
          type={type}
          closable={true}
          showIcon />
    )
  }

  return(
    <Card
      key={office.slug}
      title="Info"
      style={{ width: 500 }}>

      {alert === '' ? null : alert === 'success'  ? getAlertType('success') : getAlertType('error')}

      {
        Object.keys(office).map(attribute => 
          <Attribute 
            key={attribute}
            slug={office.slug}
            attribute={attribute}
            addonBefore={attribute}
            placeholder={office[attribute]}
            setAlert={setAlert}
          />)
      }

    </Card>
  )
}

export default Office;