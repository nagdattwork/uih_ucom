import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItemButton, ListItemIcon, OutlinedInput, TableHead, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector,useDispatch } from 'react-redux';
import { append } from '../features/projectData/projectData';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import backend from '../../app/baseLink';
export default function SystemDetails() {
  const dispatch=useDispatch()
  const projectData=useSelector(state=>state.projectData)
  //All about Systems
  const [selectedSystems, setSelectedSystems] = useState(projectData?.system?.systems?projectData.system?.systems:[])
  
  const [systemsOpen, setSystemsOpen] = useState(false)
  const systemsDialogClose = () => {
    setSystemsOpen(false)
  }

  const handleSystemsOpen = () => {
    setSystemsOpen(true)
  }
  const handleDeleteSystems=(id)=>{
    const tempSystems= selectedSystems.filter( (data)=> {
      return data._id !== id;
  });
  setSelectedSystems(tempSystems)
  }

//Full IB List

const [selectedIB, setSelectedIB] = useState(projectData?.system?.full_ib_list?projectData.system?.full_ib_list:[])
  
const [IBOpen, setIBOpen] = useState(false)
const IBDialogClose = () => {
  setIBOpen(false)
}

const handleIBOpen = () => {
  setIBOpen(true)
}
const handleDeleteIB=(id)=>{
  const tempIB= selectedIB.filter( (data)=> {
    return data._id !== id;
});
setSelectedIB(tempIB)
}

//Service Engineers
const [serviceEngineers,setServiceEngineers]=useState((projectData?.system?.uih_service_engineer?projectData.system?.uih_service_engineer:""))

//Adding values to Redux
useEffect(()=>{
  let systemDetails=projectData.system

  systemDetails={...systemDetails,...{
    systems:selectedSystems.map((data)=>{return ({...data})}),
    full_ib_list:selectedIB.map((data)=>{return ({...data})}),
    uih_service_engineer:serviceEngineers
   
  }}

  dispatch(append({
    system:systemDetails,
  }))
},[selectedSystems,selectedIB,serviceEngineers])


  return (
    <div>
       <Grid container spacing={2} mt={2} >
        <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>System</Typography>
        <IconButton variant="outlined" size="small" color='success'  onClick={handleSystemsOpen}>
          <SearchIcon />
        </IconButton>
      </Grid>

      <Grid container spacing={2}>
     <Grid item xs={12}>
     <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell> <b>BU</b></TableCell>
                  <TableCell align="left"><b>Model</b></TableCell>
                  <TableCell align="left"><b>Sr. No.</b></TableCell>
                  <TableCell align="left"><b>S/W version</b></TableCell>
                  <TableCell align="left"><b>Installation Date</b></TableCell>
                  <TableCell align="left"><b>Warranty Status</b></TableCell>
                  <TableCell align="left"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {selectedSystems.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    
                  >
                    <TableCell component="th" scope="row">
                      {row.systems_bu}
                    </TableCell>
                    <TableCell align="left">{row.systems_model}</TableCell>
                    <TableCell align="left">{row.systems_sr_no}</TableCell>
                    <TableCell align="left">{row.systems_sw_hw_version}</TableCell>
                    <TableCell align="left">{row.systems_installation_date}</TableCell>
                    <TableCell align="left">{row.systems_warranty_status}</TableCell>
                    <TableCell align="left">
                      <IconButton color='error' onClick={()=>handleDeleteSystems(row._id)}>
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
        <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>FUll IB List</Typography>
        <IconButton variant="outlined" size="small" color='success'  onClick={handleIBOpen}>
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
    <Grid item xs={12}>
    <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell> <b>Sr No.</b></TableCell>
                  <TableCell align="left"><b>BU</b></TableCell>
                  <TableCell align="left"><b>Modality</b></TableCell>
                  <TableCell align="left"><b>Model</b></TableCell>
                  <TableCell align="left"><b>S/W version</b></TableCell>
                  <TableCell align="left"><b>Installation Date</b></TableCell>
                  <TableCell align="left"><b>Upgrades</b></TableCell>

                  <TableCell align="left"><b>Warranty Status</b></TableCell>
                  <TableCell align="left"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {selectedIB.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    
                  >
                    <TableCell component="th" scope="row">
                      {row.full_ib_sr_no}
                    </TableCell>
                    <TableCell align="left">{row.full_ib_bu}</TableCell>
                    <TableCell align="left">{row.full_ib_modality}</TableCell>
                    <TableCell align="left">{row.full_ib_model}</TableCell>
                    <TableCell align="left">{row.full_ib_sw_version}</TableCell>
                    <TableCell align="left">{row.full_ib_installation_date}</TableCell>
                    <TableCell align="left">{row.full_ib_upgrades}</TableCell>

                    <TableCell align="left">{row.full_ib_warranty}</TableCell>

                    <TableCell align="left">
                      <IconButton color='error' onClick={()=>handleDeleteSystems(row._id)}>
                        <DeleteTwoToneIcon />
                      </IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </Grid>

      </Grid>
      
      <h4>UIH Service Engineer</h4>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OutlinedInput
          size='small'
          placeholder='Enter Service Engineer name'
          color='success'
          value={serviceEngineers}
          onChange={(e)=>setServiceEngineers(e.target.value)}
          fullWidth/>
        </Grid>
       
        
       </Grid>
      <SystemsSelector open={systemsOpen} handleClose={systemsDialogClose} setSelectedSystems={setSelectedSystems} selectedSystems={selectedSystems} />
      <IBSelector open={IBOpen} handleClose={IBDialogClose} setSelectedIB={setSelectedIB} selectedIB={selectedIB} />

    </div>
  )
}




//Select Systems
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // '& .MuiDialogContent-root': {
  //   padding: theme.spacing(2),
  // },
  // '& .MuiDialogActions-root': {
  //   padding: theme.spacing(1),
  // },
}));
const SystemsSelector = (props) => {
  const handleSystemsSelect = (data) => {
    const arr=props.selectedSystems.filter((t)=>{
      return t._id==data._id
    })
    if(arr.length==0)
    props.setSelectedSystems([...props.selectedSystems, data])
  }

  const [allsystems, setAllSystems] = React.useState([])

  useEffect(() => {
    let tempSystems = []
    backend.get('api/projects/systemdetails/').then(res => {

      tempSystems = res.data.response.map(data => { return data })
      setAllSystems(tempSystems)

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
            allsystems.map((data, index) => {
              return (
                <>
                  <ListItemButton  key={index} onClick={() => handleSystemsSelect(data)}>
                  <ListItemIcon>
            <LaptopChromebookIcon />
          </ListItemIcon>
                    {data.systems_bu}
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


//Full IB List

const IBSelector = (props) => {
  const handleIBSelect = (data) => {
    const arr=props.selectedIB.filter((t)=>{
      return t._id==data._id
    })
    if(arr.length==0)
    props.setSelectedIB([...props.selectedIB, data])
  }

  const [allIB, setAllIB] = React.useState([])

  useEffect(() => {
    let tempIB = []
    backend.get('api/projects/fulliblists/').then(res => {

      tempIB = res.data.response.map(data => { return data })
      setAllIB(tempIB)

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
            allIB.map((data, index) => {
              return (
                <>
                  <ListItemButton  key={index} onClick={() => handleIBSelect(data)}>
                  <ListItemIcon>
            <LaptopChromebookIcon />
          </ListItemIcon>
                    {data.full_ib_bu}
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


