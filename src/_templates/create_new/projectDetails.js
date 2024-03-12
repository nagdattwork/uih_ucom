import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
import backend from '../../app/baseLink';
import ProjectDetails2 from './projectDetails2';
export default function ProjectDetails() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.projectData)
  const dataDetails = data.projectDetails
  // Main feilds
  const [title, setTitle] = React.useState(dataDetails.title)
  const [duration, setDuration] = React.useState(dataDetails.project_duration)
  const [discription, setDiscription] = React.useState(dataDetails.description)
  const [objectives, setObjectives] = React.useState(dataDetails.objective)
  const [managers, setManagers] = React.useState(dataDetails?.project_manager ? dataDetails?.project_manager : [])

  const pastRows = dataDetails?.hw_sw_spp
  const initialRows = pastRows ? JSON.parse(JSON.stringify(pastRows)) : [{ hw_sw_type: '', hw_sw_name: '', product_number: '', quantity: '', license: '' }];
  const [rows, setRows] = React.useState(initialRows);
  const [openProjectManager, setOpenProjectManager] = React.useState(false);
  const handleAddRow = () => {
    setRows([...rows, { hw_sw_type: '', hw_sw_name: '', product_number: '', quantity: '', license: '' }]);
  };


  useEffect(() => {
    let projectDetails = data.projectDetails
    // console.log("intial rows",initialRows)

    projectDetails = {
      ...projectDetails, ...{
        title,
        project_duration: duration,
        description: discription,
        project_duration: duration,
        objective: objectives,
        hw_sw_spp: rows.map(data => { return ({ ...data }) }),

        project_manager: managers.map(data => { return data }),
      }
    }
    dispatch(append({
      projectDetails: projectDetails
    }))

  }, [title, duration, discription, objectives, managers, rows])
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

  const [allManagers, setAllmanagers] = React.useState([])

  useEffect(() => {
    let tempManagers = []
    backend.get('api/users/').then(res => {

      tempManagers = res.data.response.map(data => { return data })
      console.log(tempManagers)
      setAllmanagers(tempManagers)

    }).catch(err => {

    })

  }, [])

  // const handleManagerSelect = (string) => {
  //   const arr = managers.filter((t) => {
  //     return t._id == string._id
  //   })

  //   if (arr.length == 0)
  //     setManagers([...managers, string])
  // }
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


        <Autocomplete
            clearIcon={false}
            options={allManagers}
            getOptionLabel={(options) => options.fname}
            size='small'
            renderOption={(props, option) => {

              return (
                <Box  {...props}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar  sx={{ width: 30, height: 30 }} alt={option.fname} src={process.env.REACT_APP_DOCUMENT_PATH + option.image} />
                    </ListItemAvatar>

                    <ListItemText primary={option.fname+" "+option.lname} secondary={option.email}  />
                  </ListItem>
                </Box>
              )
            }}
            value={managers}
            onChange={(event, newValue) => {
              setManagers(newValue)
              console.log(newValue);
            }}
            onInputChange={(e, newValue) => {
              console.log(newValue);
            }}
            freeSolo
            multiple
            renderTags={(value, props) =>
              value.map((chip, index) => (
                <Chip label={chip.fname +" "+chip.lname} color='info' {...props({ index })} avatar={<Avatar alt={chip.fname} src={process.env.REACT_APP_DOCUMENT_PATH + chip.image} />} />
              ))
            }
            renderInput={(params) => <TextField label="Select managers" {...params} />}
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

           <Grid item xs={1}>
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

      <ProjectDetails2 />
      {/* <ProjectManager handleClose={handleCloseProjectManager} open={openProjectManager} managers={managers} setManagers={setManagers} /> */}
    </div>
  )
}



// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   // '& .MuiDialogContent-root': {
//   //   padding: theme.spacing(2),
//   // },
//   // '& .MuiDialogActions-root': {
//   //   padding: theme.spacing(1),
//   // },
// }));
// const ProjectManager = (props) => {
//   const handleManagerSelect = (string) => {
//     const arr = props.managers.filter((t) => {
//       return t._id == string._id
//     })

//     if (arr.length == 0)
//       props.setManagers([...props.managers, string])
//   }

//   const [allManagers, setAllmanagers] = React.useState([])

//   useEffect(() => {
//     let tempManagers = []
//     backend.get('api/users/').then(res => {

//       tempManagers = res.data.response.map(data => { return data })
//       // console.log(tempManagers)
//       setAllmanagers(tempManagers)

//     }).catch(err => {

//     })

//   }, [])
//   return (
//     <BootstrapDialog
//       onClose={props.handleClose}
//       aria-labelledby="customized-dialog-title"
//       maxWidth={'md'}
//       fullWidth={true}
//       open={props.open}
//     >
//       <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//         <TextField
//           id="standard-number"
//           label="Search"
//           type="text"
//           color='success'
//           InputLabelProps={{
//             shrink: true,
//           }}
//           variant="standard"
//           fullWidth
//         />
//       </DialogTitle>
//       <IconButton
//         aria-label="close"
//         onClick={props.handleClose}
//         sx={{
//           position: 'absolute',
//           right: 8,
//           top: 8,
//           color: (theme) => theme.palette.grey[500],
//         }}
//       >
//         <CloseIcon />
//       </IconButton>
//       <DialogContent dividers>
//         <List>
//           {
//             allManagers.map((data, index) => {
//               return (
//                 <>
//                   <ListItemButton key={index} onClick={() => handleManagerSelect(data)}>
//                     <Avatar sx={{ mr: 2 }} src={process.env.REACT_APP_LINK + data.image} /> {" "} {data.fname}{" "}{data.lname}
//                   </ListItemButton>

//                 </>
//               )
//             })
//           }

//         </List>
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={props.handleClose} color='success'>
//           OK
//         </Button>
//       </DialogActions>
//     </BootstrapDialog>
//   )
// }