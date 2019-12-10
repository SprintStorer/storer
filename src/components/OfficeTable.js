import React from 'react'
import './OfficeTable.css'
import { Collapse, Card, Input } from 'antd';
import * as R from 'ramda'
const { Panel } = Collapse;
const { Search } = Input;

const Devices = ({ officeSlug, devices, setDeviceIp, handleChangeOffice, office }) => {
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

const OfficeTable = ({ offices, setDeviceIp, handleChangeOffice, office }) => {
  const rows = offices.map(off => {
    return( 
      <Panel header={off.name} key={off.slug}>
        <Devices key={off.slug}
          officeSlug={off.slug}
          devices={off.devices}
          setDeviceIp={setDeviceIp}
          office={office}
          handleChangeOffice={handleChangeOffice}/>
      </Panel>
    )
  })
  return(
    <div>
      <div className="search-bar">
        <Search
          placeholder="search for and office"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
      </div>
      <div className="office-table-list">
        <Collapse defaultActiveKey={[]}>
          {rows}
        </Collapse>
      </div>
    </div>
  )
}


export default OfficeTable