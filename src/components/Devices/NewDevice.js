import React, { useState, useEffect } from 'react'
import { Card } from 'antd'

const NewDevice = ({ officeSlug }) => {
  return(
    <Card
      key={50}
      title="New"
      style={{ width: 300 }}>
        {officeSlug}
    </Card>
  )
}

export default NewDevice