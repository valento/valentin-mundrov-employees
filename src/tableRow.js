import { Grid,Button,Icon } from 'semantic-ui-react'

const TableRow = ({item}) => {
  return (
    <Grid.Row className='ui grid'>
      <Grid.Column width={4}>{item.Employee1}</Grid.Column>
      <Grid.Column width={4}>{item.Employee2}</Grid.Column>
      <Grid.Column width={4}>{item.projectID}</Grid.Column>
      <Grid.Column width={4}>{item.duration}</Grid.Column>
    </Grid.Row>
  )
}

export default TableRow
