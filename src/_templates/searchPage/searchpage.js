import { Autocomplete, Button, Grid, OutlinedInput, TextField, Toolbar } from '@mui/material'
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
  const currentUser = useSelector((state) => state.login)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(emptyEdits({}))
    backend.post("api/projects/getmyprojects", { id: currentUser.user._id, type: currentUser.user.userType }).then((res) => {
      setRows(res.data.response)
    })
  }, [])

  React.useEffect(() => {
    setTempRows(rows)
  }, [rows])

  const filt = (row) => {

    let tempObjective = row.project_title?.objective?.toLowerCase()
    tempObjective = tempObjective ? tempObjective : ""
    let tempInstitues = row.customer_details?.institutes?.map(inst => inst.institute_name).toString()
    tempInstitues = tempInstitues ? tempInstitues : ""
    let tempFund=row.fi_funding?.fi_funding_status?.fi_funding_funded
    tempFund=tempFund?tempFund:false
    
    let tempStatus = row.project_title?.current_stage?.toLowerCase()
    tempStatus=tempStatus?tempStatus:""

    return (row._id.toLowerCase().includes(id.toLowerCase()) &&
      row.project_title?.title?.toLowerCase().includes(title.toLowerCase()) &&
      tempInstitues.toLowerCase().includes(institute.toLowerCase()) &&
      tempObjective.includes(objective.toLowerCase()) &&
      ((funded==='ALL') || (tempFund===(funded==='YES'?true:false))) &&
      tempStatus.includes(status.toLowerCase())



    )
  }
  //search by id
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [objective, setObjective] = useState("")
  const [institute, setInstitute] = useState("")
  const [funded, setFunded] = useState("ALL")
  const [status, setStatus] = useState("")

  useEffect(() => {

    setTempRows(rows?.filter(row => filt(row)))
  }, [id, title, objective, institute,funded,status])

  return (
    <div style={{ margin: "10px", }}>
      {/* <Toolbar/> */}
      <h4>Search</h4>
      <Grid container spacing={2} >
        <Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" value={id} fullWidth placeholder='Project ID' color="success" autoFocus
          size='small'
            onChange={(e) => setId(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" value={title} fullWidth placeholder='Title' color="success"
          size='small'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Objective' value={objective}
size='small'
            onChange={(e) => setObjective(e.target.value)}

            color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Institute'
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            size='small'
            color="success" />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={funded}
            options={["YES", "NO","ALL"]}
            fullWidth
            onInputChange={(e,n)=>{
              setFunded(n)
            }}
            size='small'
            renderInput={(params) => <TextField {...params} label="Funded?" />}
          />
        </Grid>

        <Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Status' 
          value={status} onChange={(e)=>{setStatus(e.target.value)}}
          size='small' color="success" />
        </Grid>
        {/* <Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Year' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Funding' color="success" />
        </Grid><Grid item xs={3}>
          <OutlinedInput id="outlined-basic" variant="outlined" fullWidth placeholder='Aggrement Type' color="success" />
        </Grid> */}
        {/* <Grid item xs={12}>
          <Button variant="contained" color='success' style={{marginBottom:"10px"}} fullWidth>Search</Button>
        </Grid> */}

      </Grid>
      <Grid container spacing={2}
        direction="row"
        justifyContent="flex-start"
        style={{ marginTop: "10px" }}
        alignItems="left">
        <Grid item xs={8}   >
          <span>Overview of Latest Projects</span>
          {/* <h4 style={{margin:"0px",marginTop:"-8px",marginLeft:"8px"}} >Overview of latest projects</h4> */}
        </Grid>

        {/* <Grid item xs={4} >
          <ButtonGroup aria-label="Small button group" color='success'>
            <Button key="one">Download</Button>
            <Button key="two">Explore</Button>
            <Button key="three">Filter</Button>
            <Button key="four">Sort</Button>

          </ButtonGroup>
        </Grid> */}

      </Grid>
      <div container>

        <SearchPageData rows={tempRows} />
      </div>



    </div>
  )
}
