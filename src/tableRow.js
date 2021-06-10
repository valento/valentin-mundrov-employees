import { Grid,Button,Icon } from 'semantic-ui-react'

const TableRow = ({item,winner}) => {
  console.log(winner,item.pairID)
  return (
    <Grid.Row className={winner[0]===item.pairID ? 'ui grid red' : 'ui grid'}>
      <Grid.Column width={4}>{item.Employee1}</Grid.Column>
      <Grid.Column width={4}>{item.Employee2}</Grid.Column>
      <Grid.Column width={4}>{item.projectID}</Grid.Column>
      <Grid.Column width={4}>{item.duration}</Grid.Column>
    </Grid.Row>
  )
}

export default TableRow
