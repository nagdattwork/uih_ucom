import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, InputAdornment, List, ListItemButton, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
import backend from '../../app/baseLink';
export default function ProjectDetails() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.projectData)
  const dataDetails = data.projectDetails
  // Main feilds
  const [title, setTitle] = React.useState(dataDetails.title)
  const [duration, setDuration] = React.useState(dataDetails.duration)
  const [discription, setDiscription] = React.useState(dataDetails.description)
  const [objectives, setObjectives] = React.useState(dataDetails.objective)
  const [managers, setManagers] = React.useState(dataDetails?.managers==undefined?[]:dataDetails?.managers)

  const pastRows=dataDetails?.hw_sw_spp
  const initialRows = pastRows ?JSON.parse(JSON.stringify(pastRows)) : [{ hw_sw_type: '', hw_sw_name: '', product_number: '', quantity: '', license: '' }];
  const [rows, setRows] = React.useState(initialRows);
  const [openProjectManager, setOpenProjectManager] = React.useState(false);
  const handleAddRow = () => {
    setRows( [...rows, { hw_sw_type: '', hw_sw_name: '', product_number: '', quantity: '', license: '' }]);
  };


  useEffect(() => {
    let projectDetails = data.projectDetails
    console.log("intial rows",initialRows)

    projectDetails = {
      ...projectDetails, ...{
        title,
        duration,
        description:  discription,
        objective:objectives,
          hw_sw_spp:rows.map(data=>{return ({...data})}),

        project_manager :managers.map(data=>{return {name:data}}),
      }
    }
    dispatch(append({
      projectDetails: projectDetails
    }))

  }, [title, duration, discription, objectives, managers,rows])
  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };
  const handleDeleteRow = (id) => {
    console.log(id, rows)

    const updatedRows = rows.filter((row, index) => index !== id);
    console.log("updated", updatedRows)
    setRows(updatedRows);
  };


  const handleClickOpenProjectManager = () => {
    setOpenProjectManager(true);
  };
  const handleCloseProjectManager = () => {
    setOpenProjectManager(false);
  };
  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        <Grid item xs={6}>
          <OutlinedInput size='small' helperText='Enter valid Title' placeholder="Project Title" fullWidth color='success' value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' placeholder="Project Duration" fullWidth color='success' value={duration} onChange={(e) => setDuration(e.target.value)} />
        </Grid>
      </Grid>


      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        <Grid item xs={6}>
          <OutlinedInput size='small' placeholder="Discription" fullWidth color='success' multiline
            value={discription} onChange={(e) => setDiscription(e.target.value)}
            rows={4} />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' placeholder="Objectives" fullWidth color='success' multiline
            value={objectives} onChange={(e) => setObjectives(e.target.value)}
            rows={4} />
        </Grid>
      </Grid>



      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        <Grid item xs={12}>
          <OutlinedInput size='small' placeholder="UIH Project Managers" fullWidth color='success'

            readOnly
            value={managers.toString()}
            endAdornment={
              <InputAdornment position="end">
                <IconButton

                  edge="end"
                  onClick={handleClickOpenProjectManager}
                >
                  <PersonSearchTwoToneIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

      </Grid>

      <Grid container alignContent={"center"} spacing={2} >
        <Grid item xs="auto">
          <h4 style={{ margin: "0px", marginTop: "5px" }}>Requirement of UIH Product of HW/SW support</h4>
        </Grid>
        <Grid item xs="auto" >


        </Grid>

      </Grid>


      <div >
        {rows.map((row, index) => (
          <Grid container spacing={2} key={index} style={{ marginBottom: "10px" }}>
            <Grid item xs={2}>
              <OutlinedInput
                placeholder="Software Type"
                value={row.hw_sw_type}
                size='small'
                onChange={(e) => handleChange(index, 'hw_sw_type', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={2}>
              <OutlinedInput
                placeholder="Software Name"
                value={row.hw_sw_name}
                size='small'
                onChange={(e) => handleChange(index, 'hw_sw_name', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={2}>
              <OutlinedInput
                placeholder="Product Number"
                value={row.product_number}
                size='small'
                onChange={(e) => handleChange(index, 'product_number', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={2}>
              <OutlinedInput
                placeholder="Quantity"
                size='small'
                value={row.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={2}>
              <OutlinedInput
                placeholder="license"
                size='small'
                value={row.license}
                onChange={(e) => handleChange(index, 'license', e.target.value)}
                fullWidth
                color='success'
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleDeleteRow(index)} color='error'>
                <DeleteTwoToneIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button style={{ marginTop: "20px" }} onClick={handleAddRow} startIcon={<AddBoxTwoToneIcon />} color='success' variant='contained'>
          Add
        </Button>
      </div>
      <ProjectManager handleClose={handleCloseProjectManager} open={openProjectManager} managers={managers} setManagers={setManagers} />
    </div>
  )
}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // '& .MuiDialogContent-root': {
  //   padding: theme.spacing(2),
  // },
  // '& .MuiDialogActions-root': {
  //   padding: theme.spacing(1),
  // },
}));
const ProjectManager = (props) => {
  const handleManagerSelect = (string) => {
    props.setManagers([...props.managers, string])
  }

  const [allManagers, setAllmanagers] = React.useState([])

  useEffect(()=>{
    let tempManagers=[]
    backend.get('api/users/').then(res=>{
      
      tempManagers= res.data.response.map(data=>{return data})
      // console.log(tempManagers)
      setAllmanagers(tempManagers)

    }).catch(err=>{

    })
    
  },[])
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
            allManagers.map((data, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => handleManagerSelect(data.fname+" "+data.lname)}>
                  <Avatar sx={{mr:2}} src ={"http://localhost:5000/"+data.image}/> {" "} {data.fname}{" "}{data.lname}
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