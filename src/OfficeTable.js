import React, { Component } from 'react'
import { Collapse, Card } from 'antd';
const { Panel } = Collapse;

const Devices = props => {
  const { devices } = props;
    return devices.map(device => (
      <Card title={device.type} key={device.ip} style={{ width: 300 }}>
        <p>{device.ip}</p>
      </Card>)
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
      <div className="office-table-list">
        <Collapse defaultActiveKey={[]} onChange={callback}>
          {rows}
        </Collapse>
      </div>
    )
  }
}

export default OfficeTable