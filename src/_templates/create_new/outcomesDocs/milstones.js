import { Button, Grid, IconButton, OutlinedInput } from '@mui/material'
import React, { useEffect } from 'react'
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../../features/projectData/projectData';
import MilstonesDocs from './milstonesDocs';

export default function Milstones() {
  const data = useSelector(state => state.projectData)
  const dispatch = useDispatch()

  const dataDetails = data.outcomes
  const pastRows = dataDetails?.milstones

  const initialRows = pastRows ? JSON.parse(JSON.stringify(pastRows)) : [{ m1: '', status: '', update: '' }];

  // const initialRows =  [{ m1: '', status: '', update: '' }];
  const [rows, setRows] = React.useState(initialRows);
  const handleAddRow = () => {
    setRows([...rows, { m1: '', status: '', update: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };
  const handleDeleteRow = (id) => {

    const updatedRows = rows.filter((row, index) => index !== id);
    setRows(updatedRows);
  };
  useEffect(() => {
    let outcomesDetails = data.outcomes
    // console.log("intial rows",initialRows)

    outcomesDetails = {
      ...outcomesDetails, ...{
      
        milstones: rows.map(data => { return ({ ...data }) }),

      }
    }
    // console.log(outcomesDetails)

    dispatch(append({
      outcomes: outcomesDetails
    }))

  }, [rows])
  return (
    <div>
        <Grid spacing={2} container>
            <Grid item xs={12}>
                <b>Milstones</b>
            </Grid>
            <Grid item xs={12}>
            <div >
        {rows.map((row, index) => (
          <Grid container spacing={2} key={index} style={{ marginBottom: "10px" }}>
            <Grid item xs={3}>
              <OutlinedInput
                placeholder="Milstone"
                value={row.m1}
                size='small'
                onChange={(e) => handleChange(index, 'm1', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={3}>
              <OutlinedInput
                placeholder="Status"
                value={row.status}
                size='small'
                onChange={(e) => handleChange(index, 'status', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={3}>
              <OutlinedInput
                placeholder="Update"
                value={row.update}
                size='small'
                onChange={(e) => handleChange(index, 'update', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
          
            <Grid item xs={1}>
              <IconButton onClick={() => handleDeleteRow(index)} color='error'>
                <DeleteTwoToneIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
           {
            index === rows.length - 1?
            <Button  onClick={handleAddRow} startIcon={<AddBoxTwoToneIcon />} color='success' variant='contained'>
              Add
            </Button> : null
           }
              </Grid>
          </Grid>
        ))}
       {
        rows.length === 0?
        <Button  onClick={handleAddRow} startIcon={<AddBoxTwoToneIcon />} color='success' variant='contained'>
          Add
        </Button> : null
       }
      </div>
            </Grid>
           <Grid item xs={12}>
           <MilstonesDocs/>
           </Grid>
        </Grid>
    </div>
  )
}
