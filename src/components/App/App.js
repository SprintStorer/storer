import React, { useState, useEffect } from 'react'
import './App.css'
import OfficeTable from '../OfficeTable/OfficeTable'
import * as R from 'ramda'
import Footer from '../Fotter'
import { Input, Icon, Empty } from 'antd'
import axios from 'axios'
const { Search } = Input

const App = () => {
  const [ offices, setOffices ] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:4000/mock/offices/all')
      console.log(data)
      return setOffices(data)
    }
    fetchData()
  }, [])
  

  const [ searchObjHolder, setSearchObjHolder ] = useState(offices)

  const handleOnSearch = officeText => {
    const cleanOfficeText = officeText.toLowerCase()
    console.log('search text:', cleanOfficeText)
    const patt = new RegExp(cleanOfficeText)
    const filtered = R.filter(office => {
      const test = patt.test(office.name.toLowerCase())
      return test
    }, offices)
    setSearchObjHolder({ offices: filtered })
  }

  const handleSearchOnChange = e => {
    const officeText = e.target.value
    if (e.target.value === "") return setSearchObjHolder(offices)
    if (officeText.length < 3) return

    const cleanOfficeText = officeText.toLowerCase()
    const patt = new RegExp(cleanOfficeText)
    const filtered = R.filter(office => {
      const test = patt.test(office.name.toLowerCase())
      return test
    }, offices)
    setSearchObjHolder({ offices: filtered })
  }

  return (
    <div className="content">

      <h1 className="title">
        <Icon type="database" />
        Storer
      </h1>

      <Search
        className="search-bar"
        placeholder="search for an office"
        enterButton="Search"
        size="large"
        onSearch={handleOnSearch}
        onChange={handleSearchOnChange}
      />

      <OfficeTable 
        offices={R.values(searchObjHolder.offices)}
      />

      {searchObjHolder.offices ? null : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

      <Footer />
      
    </div>
  )
}

export default App
