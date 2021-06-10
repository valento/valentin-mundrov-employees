import React, {useEffect,useState} from 'react'
import TableRow from './tableRow'

const ResultTable = ({data=[]}) => {

  const [result,setResult] = useState([])
  const [winner,setWinner] = useState([])

  const recursiveProccess = ([first,...rest],pairs={}) => {
    let newPair = {}
    //console.log('Initial Objects: ', pairs, newPair)
    if(rest.length === 0) {
      //console.log('END ARRAY ', pairs)
      return pairs
    } else {
      rest.forEach( (empl) => {
        //console.log('repeat ForEach')
        if(empl.DateFrom>first.DateTo || first.DateFrom>empl.DateTo) {
          //console.log('NON WORKING ', `${first.EmpID}/${empl.EmpID}`, pairs)
          newPair = {...pairs}
        } else {
          let timeBegin = first.DateFrom>empl.DateFrom? empl.DateFrom : first.DateFrom
          let timeEnd =  first.DateTo>empl.Date? empl.DateTo : first.DateTo
          let pairID = `${first.EmpID}/${empl.EmpID}`
          //console.log('Before spread: ',pairID)
          newPair = {...pairs,
            [pairID]: {
              pairID: pairID,
              duration: Math.floor((timeEnd-timeBegin)/(1000*60*60*24)),
              projectID: empl.ProjectID,
              Employee1: first.EmpID,
              Employee2: empl.EmpID
            }
          }
          pairs = {...newPair}
        }
        //console.log('Proccess project: ', first.ProjectID, newPair)
      })
    }
    return recursiveProccess(rest,newPair)
  }

  useEffect(() => {
    let PAIRS = (projects) => {
      return recursiveProccess(projects)
    }

    const getTeams = async () => {
      let results = await Promise.all(
        data.map( async (proj) => {
          //console.log('Reload Recursive: ',proj)
          let pairs = await PAIRS(proj)
          //console.log(pairs)
          return pairs
        })
      )
      //console.log(results)
      return results
    }

    getTeams().then(
      r => {
        let topEmpl = {}
        r.forEach( (e) => {
          Object.keys(e).map( (key) => {
            topEmpl = {...topEmpl, [key]: Number(topEmpl[key])? Number(topEmpl[key]) + Number(e[key].duration) : Number(e[key].duration) }

          })
          return topEmpl
        })
        const allScores = Object.keys(topEmpl).map( key => [key,topEmpl[key]])
        const scores = allScores.map( s => s[1])
        let mx = Math.max(...scores)
        let winner = allScores.find( element => element[1] === mx)
        setWinner(winner)
        setResult(r)
    })
  },[])

  return (
    <div className='results'>
      {result.length>0 &&
        <ul>
          <div className='ui grid'>
            <div className='four wide column'>Employee1</div>
            <div className='four wide column'>Employee2</div>
            <div className='four wide column'>Project</div>
            <div className='four wide column'>Duration</div>
          </div>
          {result.map( (pairs,ind) => {
            return Object.values(pairs).map( (pair,i) => {
              return (
                <li key={`${ind}-${i}`}>
                  <TableRow item={pair} winner={winner} />
                </li>
              )
            })
          })}
          {winner!=='' && <h2>{`TopTeam: ${winner[0]} : ${winner[1]}`}</h2>}
      </ul>}
    </div>
  )
}

export default ResultTable
