import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import backend from '../../app/baseLink';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from 'react-redux';
import { append } from '../features/projectData/projectData';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import VillaIcon from '@mui/icons-material/Villa';
export default function CustomerDetails() {
  const dispatch=useDispatch()
  const projectData=useSelector(state=>state.projectData)
  //All about Institutes
  const [selectedInstitutes, setSelectedInstitutes] = useState(projectData?.customerDetails?.institutes?projectData.customerDetails.institutes:[])
  
  const [instituteOpen, setInstituteOpen] = useState(false)
  const instituteDialogClose = () => {
    setInstituteOpen(false)
  }

  const handleInstituteOpen = () => {
    setInstituteOpen(true)
  }
  const handleDeleteInstitute=(id)=>{
    const tempInstitute = selectedInstitutes.filter( (data)=> {
      return data._id !== id;
  });
  setSelectedInstitutes(tempInstitute)
  }

//All about PI's
  const [selectedPI, setSelectedPI] = useState(projectData?.customerDetails?.pi_details?projectData.customerDetails.pi_details:[])
  
  const [piOpen, setPIOpen] = useState(false)
  const piDialogClose = () => {
    setPIOpen(false)
  }

  const handlePIOpen = () => {
    setPIOpen(true)
  }
  const handleDeletePI=(id)=>{
    const tempPI = selectedPI.filter( (data)=> {
      return data._id !== id;
  });
  setSelectedPI(tempPI)
  }







  //Existing Projects
  const [selectedProject, setSelectedProject] = useState(projectData?.customerDetails?.existing_projects?projectData.customerDetails.existing_projects:"")
  const [projectOpen, setProjectOpen] = useState(false)
  const projectDialogClose = () => {
    setProjectOpen(false)
  }

  const handleProjectOpen = () => {
    
    setProjectOpen(true)
  }
  //useEffect
  useEffect(()=>{
    let customerDetails=projectData.customerDetails

    customerDetails={...customerDetails,...{
      institutes:selectedInstitutes.map((data)=>{return ({...data})}),
      pi_details:selectedPI.map((data)=>{return ({...data})}),
      existing_projects:selectedProject
    }}

    dispatch(append({
      customerDetails:customerDetails
    }))
  },[selectedInstitutes,selectedProject,selectedPI])
  return (
    <div>
      <Grid container spacing={2} >
        <Typography variant='subtitle1' component="h2" ml={2} style={{ fontWeight: "bold" }}>Institutes and hospitals</Typography>
        <IconButton onClick={handleInstituteOpen} variant="outlined" size="small" color='success'>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> <b>Name</b></TableCell>
                  <TableCell align="left"><b>Country</b></TableCell>
                  <TableCell align="left"><b>City</b></TableCell>
                  <TableCell align="left"><b>Address</b></TableCell>
                  <TableCell align="left"><b>Contact/ Email</b></TableCell>
                  <TableCell align="left"><b>Phone/ Fax</b></TableCell>
                  <TableCell align="left"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {selectedInstitutes.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.institute_name}
                    </TableCell>
                    <TableCell align="left">{row.institute_country}</TableCell>
                    <TableCell align="left">{row.institute_city}</TableCell>
                    <TableCell align="left">{row.institute_address}</TableCell>
                    <TableCell align="left">{row.institute_email}</TableCell>
                    <TableCell align="left">{row.institute_phone}</TableCell>
                    <TableCell align="left">
                      <IconButton color='error' onClick={()=>handleDeleteInstitute(row._id)}>
                        <DeleteTwoToneIcon />
                      </IconButton></TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>



      </Grid>


      <Grid container spacing={2} mt={2} >
        <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>PI Details</Typography>
        <IconButton variant="outlined" size="small" color='success' onClick={handlePIOpen}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
    <Grid item xs={12}>
    <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell> <b>Name</b></TableCell>
                  <TableCell align="left"><b>Designation</b></TableCell>
                  <TableCell align="left"><b>Email</b></TableCell>
                  <TableCell align="left"><b>Phone No.</b></TableCell>
                  <TableCell align="left"><b>Signatury Rights</b></TableCell>
                  <TableCell align="left"><b>Top Management</b></TableCell>
                  <TableCell align="left"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {selectedPI.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    
                  >
                    <TableCell component="th" scope="row">
                      {row.pi_name}
                    </TableCell>
                    <TableCell align="left">{row.pi_designation}</TableCell>
                    <TableCell align="left">{row.pi_email}</TableCell>
                    <TableCell align="left">{row.pi_phone}</TableCell>
                    <TableCell align="left">{row.pi_signatury_rights===true ? "YES":"NO"}</TableCell>
                    <TableCell align="left">{row.pi_top_management===true ? "YES":"NO"}</TableCell>
                    <TableCell align="left">
                      <IconButton color='error' onClick={()=>handleDeletePI(row._id)}>
                        <DeleteTwoToneIcon />
                      </IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </Grid>

      </Grid>

      <Grid container spacing={2} mt={2} >
        <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Existing Projects</Typography>
        <IconButton variant="outlined" size="small" color='success' onClick={handleProjectOpen}>
          <SearchIcon  />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <OutlinedInput size='small'

          placeholder='Existing Project'
          value={selectedProject}
            fullWidth />
        </Grid>
        
      </Grid>
      <InstituteSelector open={instituteOpen} handleClose={instituteDialogClose} setSelectedInstitutes={setSelectedInstitutes} selectedInstitutes={selectedInstitutes} />
      <PISelector open={piOpen} handleClose={piDialogClose} setSelectedPI={setSelectedPI} selectedPI={selectedPI} />
     
     
      <ExistingProjectSelector open={projectOpen} handleClose={projectDialogClose} setSelectedProject={setSelectedProject} selectedProject={selectedProject}/>
    </div>
  )
}




//Select Institutes
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // '& .MuiDialogContent-root': {
  //   padding: theme.spacing(2),
  // },
  // '& .MuiDialogActions-root': {
  //   padding: theme.spacing(1),
  // },
}));
const InstituteSelector = (props) => {
  const handleManagerSelect = (data) => {
    const arr=props.selectedInstitutes.filter((t)=>{
      return t._id==data._id
    })
    if(arr.length==0)
    props.setSelectedInstitutes([...props.selectedInstitutes, data])
  }

  const [allInstitutes, setAllInstitutes] = React.useState([])

  useEffect(() => {
    let tempInstitutes = []
    backend.get('api/projects/institutes/').then(res => {

      tempInstitutes = res.data.response.map(data => { return data })
      setAllInstitutes(tempInstitutes)

    }).catch(err => {

    })

  }, [])
  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={'md'}
      fullWidth={true}
      open={props.open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <TextField
          id="standard-number"
          label="Search"
          type="text"
          color='success'
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          fullWidth
        />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <List>
          {
            allInstitutes.map((data, index) => {
              return (
                <>
                  <ListItemButton  key={index} onClick={() => handleManagerSelect(data)}>
                  <ListItemIcon>
            <VillaIcon />
          </ListItemIcon>
                    {data.institute_name}
                  </ListItemButton>
                </>
              )
            })
          }

        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color='success'>
          OK
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}




//Select PI

const PISelector = (props) => {
  const handlePISelect = (data) => {
    const arr=props.selectedPI.filter((t)=>{
      return t._id==data._id
    })
    if(arr.length==0)
    props.setSelectedPI([...props.selectedPI, data])
  }

  const [allPI, setAllPI] = React.useState([])

  useEffect(() => {
    let tempPI = []
    backend.get('api/projects/pidetails/').then(res => {

      tempPI = res.data.response.map(data => { return data })
      setAllPI(tempPI)

    }).catch(err => {

    })

  }, [])
  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={'md'}
      fullWidth={true}
      open={props.open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <TextField
          id="standard-number"
          label="Search"
          type="text"
          color='success'
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          fullWidth
        />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <List>
          {
            allPI.map((data, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => handlePISelect(data)}>
                    <ListItemIcon>
                      <TipsAndUpdatesIcon/>
                    </ListItemIcon>
                    {data.pi_name}
                  </ListItemButton>
                </>
              )
            })
          }

        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color='success'>
          OK
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}







//Existing Projects

const ExistingProjectSelector = (props) => {
  const handleProjectSelect = (data) => {
props.setSelectedProject(data.title)  }

  const [allProjects, setAllProjects] = React.useState([])

  useEffect(() => {
    let tempProjects = []
    backend.get('api/projects/').then(res => {

      tempProjects = res.data.response.map(data => { return data })
      setAllProjects(tempProjects)

    }).catch(err => {

    })

  }, [])
  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={'md'}
      fullWidth={true}
      open={props.open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <TextField
          id="standard-number"
          label="Search"
          type="text"
          color='success'
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          fullWidth
        />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <List>
          {
            allProjects.map((data, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => handleProjectSelect({id:data._id,title:data.project_title.title})}>
                    <ListItemIcon>
                      <FolderZipIcon/>
                    </ListItemIcon>
                    {data.project_title.title}
                  </ListItemButton>
                </>
              )
            })
          }

        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose} color='success'>
          OK
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}


