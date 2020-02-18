import React, { useState } from 'react'
import { Icon, Input, notification } from 'antd'
import './Attribute.css'
// import axios from 'axios'

const Attribute = ({ slug, attribute, addonBefore, placeholder, type, editable }) => {
  const [ attributeText, setAttributeText ] = useState('')
  const [ editState, setEditState ] = useState('edit')
  const [ disabledState, setdisabledState ] = useState(true)

  const handleOnChange = e => {
    setAttributeText(e.target.value)
  }

  const openNotification = (placement, attribute) => {
    notification.success({
      message: `Changes Saved`,
      description:
        `${attribute} updated!`,
      placement,
    });
  };

  const updateEntity = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('oh yeah!')
      }, 3000); 
    })

    // const getUrl = type => `http://localhost:4000/mock/api/v1/${type}/`
    // const url = (type === 'device') ? getUrl('devices') : getUrl('offices')
    // const { data } = await axios.post(url, { office: officeFormParams } )
    // console.log(data)
  }

  const handleEdit = async (attribute, attributeText) => {
    try {
      if (editState === 'edit') {
        setdisabledState(false)
        setEditState('save') 
      }
      if (editState === 'save') {
        setdisabledState(true)
        setEditState('loading')
        // calling api
        console.log('sendig data...')
        console.log({
          office: {
            slug,
            attribute: addonBefore,
            value: attributeText
          }
        })
        await updateEntity()
        setEditState('edit')
        openNotification('bottomRight', attribute)
        console.log('ok')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div key={attribute}
    className= "office-atribute-input">
      <Input 
        addonBefore={addonBefore}
        addonAfter={editable ? <Icon 
          type={editState}
          onClick={() => handleEdit(attribute, attributeText)}/> : ''}
        placeholder={placeholder}
        defaultValue={placeholder}
        onChange={handleOnChange}
        disabled={disabledState}
      />
      
    </div>
  )
}

export default Attribute
