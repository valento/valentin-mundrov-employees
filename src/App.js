import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

import DropFile from './dropFile'
import ResultTable from './resultTable'

const App = () => {

  const [data,setData] = useState([])

  const teamProj = ([first,...rest],Projects=[]) => {
   	if(rest.length === 0) {
   	  return Projects
   	} else if(rest.includes(first)) {
      //Projects = [...Projects, first]
      Projects.push(first)
   	}
    return teamProj(rest.filter( a => a !== first ),Projects)
  }

  const clearData = () => {
    setData([])
  }

  const printData = data => {
    let Obj = {}, DATA = []
    let nested = data.map( e => e.split(',') )
    DATA = nested.map( e => ({
        EmpID: Number(e[0]),
        ProjectID: Number(e[1]),
        DateFrom: isNaN(new Date(e[2]).getTime())? new Date() : new Date(e[2]),
        DateTo: isNaN(new Date(e[3]).getTime())? new Date() : new Date(e[3])
      }) )
    let projects = DATA.map( e => e.ProjectID )
    let TEAM_PROJECTS = (p) => {
      return teamProj(p)
    }
    let PROJECTS = TEAM_PROJECTS(projects).map( p => DATA.filter( d => d.ProjectID===p))
    setData(PROJECTS)
  }
  return (
    <div className="App">
      SiRMA App
      <DropFile onClear={clearData} printData={printData} />
      {data.length>0 && <ResultTable data={data} />}
    </div>
  )
}

export default App
