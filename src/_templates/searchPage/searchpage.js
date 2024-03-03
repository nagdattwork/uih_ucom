import { Button, Grid, OutlinedInput, TextField, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchPageData from './searchPageData'
import ButtonGroup from '@mui/material/ButtonGroup';
import backend from '../../app/baseLink';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { emptyEdits } from '../features/projectData/editData';
export default function SearchPage() {
  
  const [rows, setRows] = React.useState([])
  const [tempRows, setTempRows] = React.useState(rows)
  const currentUser=useSelector((state)=>state.login)
  const dispatch=useDispatch()
  React.useEffect(() => {
    dispatch(emptyEdits({}))
    backend.post("api/projects/getmyprojects",{id:currentUser.user._id,type:currentUser.user.userType}).then((res)=>{
      setRows(res.data.response)
    })
  }, [])

  React.useEffect(() => {
   setTempRows(rows)
  }, [rows])

  const filt=(row)=>{

    let tempObjective=row.project_title?.objective?.toLowerCase()
    tempObjective=tempObjective?tempObjective:""
    let tempInstitues=row.customer_details?.institutes?.map(inst=>inst.institute_name).toString()
    tempInstitues=tempInstitues?tempInstitues:""
    console.log(tempObjective,tempInstitues)

    
   return (row._id.toLowerCase().includes(id.toLowerCase()) && 
   row.project_title?.title?.toLowerCase(). includes(title.toLowerCase()) &&
   tempInstitues.toLowerCase().includes(institute.toLowerCase()) &&
   tempObjective.includes(objective.toLowerCase()) 

   
   )
  }
  //search by id
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [objective,setObjective]=useState("")
  const [institute,setInstitute]=useState("")

  useEffect(() => {

    setTempRows(rows?.filter(row => filt(row)))
  }, [id, title,objective,institute])

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
          <OutlinedInput id="outlined-basic" variant="outlined" value={title} fullWidth placeholder='Title' color="success"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Objective' value={objective} 
          
          onChange={(e) => setObjective(e.target.value)}
          
          color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Institute' 
          value={institute}
          onChange={(e) => setInstitute(e.target.value)}
          color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='IB Serial No.' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Year' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Funding' color="success" />
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

        <SearchPageData rows={tempRows} />
      </div>



    </div>
  )
}
