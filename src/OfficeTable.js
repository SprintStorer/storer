import React, { Component } from 'react'
import './OfficeTable.css'
import { Collapse, Card, Input } from 'antd';
const { Panel } = Collapse;
const { Search } = Input;

const Devices = props => {
  const { devices } = props;
    return devices.map(device => (
      <div className="device-card">
        <Card title={device.type} key={device.ip} style={{ width: 200 }}>
          <p>{device.ip}</p>
        </Card>
      </div>)
    )
}

class OfficeTable extends Component {
  render() {
    function callback(key) {
      console.log(key);
    }
    const { offices } = this.props;

    const rows = offices.map(office => {
      return( 
        <Panel header={office.name} key={office.slug}>
          <Devices devices={office.devices}/>
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
          <Collapse defaultActiveKey={[]} onChange={callback}>
            {rows}
          </Collapse>
        </div>
      </div>
    )
  }
}

export default OfficeTable