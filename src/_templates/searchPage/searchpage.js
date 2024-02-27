import { Button, Grid, OutlinedInput, TextField, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchPageData from './searchPageData'
import ButtonGroup from '@mui/material/ButtonGroup';
import backend from '../../app/baseLink';
import { useSelector } from 'react-redux';
export default function SearchPage() {

  const [rows, setRows] = React.useState([])
  const [tempRows, setTempRows] = React.useState([])
  const currentUser=useSelector((state)=>state.login)

  React.useEffect(() => {
    backend.post("api/projects/getmyprojects",{id:currentUser.user._id}).then((res)=>{
      console.log(res.data.response)
      setRows(res.data.response)
    })
  }, [])




  //search by id
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  useEffect(() => {
    setTempRows(rows?.filter(row => (row._id.includes(id) && row.project_title.title.includes(title))))
  }, [id, title])

  return (
    <div style={{ margin: "10px", }}>
      {/* <Toolbar/> */}
      <Grid container spacing={2} >
        <Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" value={id} fullWidth placeholder='Project ID' color="success" autoFocus
            onChange={(e) => setId(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" value={title} fullWidth placeholder='Country' color="success"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='BU' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='State' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='IB Serial No.' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Year' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Institute Name' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Aggrement Type' color="success" />
        </Grid>
        {/* <Grid item xs={12}>
          <Button variant="contained" color='success' style={{marginBottom:"10px"}} fullWidth>Search</Button>
        </Grid> */}

      </Grid>
      <Grid container spacing={2}
        direction="row"
        justifyContent="flex-end"
        style={{marginTop:"10px"}}
        alignItems="center">
        <Grid item xs={8}   >
          <span>Overview of Latest Projects</span>
          {/* <h4 style={{margin:"0px",marginTop:"-8px",marginLeft:"8px"}} >Overview of latest projects</h4> */}
        </Grid>

        <Grid item xs={4} >
          <ButtonGroup aria-label="Small button group" color='success'>
            <Button key="one">Download</Button>
            <Button key="two">Explore</Button>
            <Button key="three">Filter</Button>
            <Button key="four">Sort</Button>

          </ButtonGroup>
          {/* <Button color='success'>  Explore</Button> */}
        </Grid>

      </Grid>
      <div container>

        <SearchPageData rows={rows} />
      </div>



    </div>
  )
}
