import React from 'react'
import './OfficeTable.css'
import { Collapse, Card, Input } from 'antd';
import * as R from 'ramda'
const { Panel } = Collapse;

const Devices = ({ officeSlug, devices, setDeviceIp }) => {
  return R.values(devices).map(device => (
    <div className="device-card">
      <Card
        key={device.code}
        title={device.type}
        style={{ width: 300 }}>
        {/* <p>{device.ip}</p>  */}
        <Input
          key={device.code}
          addonBefore="ip"
          placeholder={device.ip}
          size="small"
          style={{ width: 200 }}
          onChange={(e) => { setDeviceIp(e, officeSlug, device.code) }}/>
      </Card>
    </div>)
  )
}

const OfficeTable = ({ offices, setDeviceIp }) => {
  const rows = offices.map(off => {
    return( 
      <Panel header={off.name} key={off.slug}>
        <Devices key={off.slug}
          officeSlug={off.slug}
          devices={off.devices}
          setDeviceIp={setDeviceIp} />
      </Panel>
    )
  })
  return(
    <div>
      <div className="office-table-list">
        <Collapse defaultActiveKey={[]}>
          {rows}
        </Collapse>
      </div>
    </div>
  )
}


export default OfficeTable