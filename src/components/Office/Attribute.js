import React, { useState } from 'react'
import { Icon, Input } from 'antd'
import './Attribute.css'
// import axios from 'axios'

const Attribute = ({ slug, attribute, addonBefore, placeholder, setAlert }) => {
  const [ attributeText, setAttributeText ] = useState('')
  const [ editState, setEditState ] = useState('edit')
  const [ disabledState, setdisabledState ] = useState(true)

  const handleOnChange = e => {
    setAttributeText(e.target.value)
  }

  const updateOffice = async () => {
    try {
      // const { data } = await axios.post(`http://localhost:4000/mock/offices/`, { office: officeFormParams } )
      setAlert('success')
    } catch (error) {
      console.error('error on updateOffice', error)
      setAlert('error')
    }
  }

  const handleEdit = (attribute, attributeText) => {
    
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
      setTimeout(() => {
        updateOffice()
        setEditState('edit')
        console.log('ok')
      }, 3000); 
    }
  }

  return (
    <div key={attribute}
    className= "office-atribute-input">
      <Input 
        addonBefore={addonBefore}
        addonAfter={<Icon 
          type={editState}
          onClick={() => handleEdit(attribute, attributeText)}/>}
        placeholder={placeholder}
        defaultValue={placeholder}
        onChange={handleOnChange}
        disabled={disabledState}
      />
      
    </div>
  )
}

export default Attribute
