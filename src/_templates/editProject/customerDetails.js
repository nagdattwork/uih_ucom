import { Alert, Autocomplete, Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, List, ListItemButton, ListItemIcon, OutlinedInput, Paper, Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import backend from '../../app/baseLink';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { append } from '../features/projectData/projectData';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import VillaIcon from '@mui/icons-material/Villa';
import PropTypes from 'prop-types';
import { appendEdits } from '../features/projectData/editData';
export default function CustomerDetails() {
  const dispatch = useDispatch()
  const projectData = useSelector(state => state.editData)
  //All about Institutes
  const [selectedInstitutes, setSelectedInstitutes] = useState(projectData?.customerDetails?.institutes ? projectData.customerDetails.institutes : [])

  const [instituteOpen, setInstituteOpen] = useState(false)
  const instituteDialogClose = () => {
    setInstituteOpen(false)
  }

  const handleInstituteOpen = () => {
    setInstituteOpen(true)
  }
  const handleDeleteInstitute = (id) => {
    const tempInstitute = selectedInstitutes.filter((data) => {
      return data._id !== id;
    });
    setSelectedInstitutes(tempInstitute)
  }

  //All about PI's
  const [selectedPI, setSelectedPI] = useState(projectData?.customerDetails?.pi_details ? projectData.customerDetails.pi_details : [])

  const [piOpen, setPIOpen] = useState(false)
  const piDialogClose = () => {
    setPIOpen(false)
  }

  const handlePIOpen = () => {
    setPIOpen(true)
  }
  const handleDeletePI = (id) => {
    const tempPI = selectedPI.filter((data) => {
      return data._id !== id;
    });
    setSelectedPI(tempPI)
  }







  //Existing Projects
  const [selectedProject, setSelectedProject] = useState(projectData?.customerDetails?.existing_projects ? projectData.customerDetails.existing_projects : "")
  const [projectOpen, setProjectOpen] = useState(false)

  const [openSnack, setOpenSnack] = useState(false)
  const [snackText, setSnackText] = useState("")
  const projectDialogClose = () => {
    setProjectOpen(false)
  }

  const handleProjectOpen = () => {

    setProjectOpen(true)
  }
  //useEffect
  useEffect(() => {
    let customerDetails = projectData.customerDetails

    customerDetails = {
      ...customerDetails, ...{
        institutes: selectedInstitutes.map((data) => { return ({ ...data }) }),
        pi_details: selectedPI.map((data) => { return ({ ...data }) }),
        existing_projects: selectedProject
      }
    }

    dispatch(appendEdits({
      customerDetails: customerDetails
    }))
  }, [selectedInstitutes, selectedProject, selectedPI])
  return (
    <div>
      <Grid container spacing={2} >
        <Typography variant='subtitle1' component="h2" ml={2} style={{ fontWeight: "bold" }}>Institutes and hospitals</Typography>


        <IconButton variant="outlined" size="small" color='success' onClick={handleInstituteOpen}>
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
                      <IconButton color='error' onClick={() => handleDeleteInstitute(row._id)}>
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
                  <TableCell align="left"><b>Signatory Rights</b></TableCell>
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
                    <TableCell align="left">{row.pi_signatury_rights === true ? "YES" : "NO"}</TableCell>
                    <TableCell align="left">{row.pi_top_management === true ? "YES" : "NO"}</TableCell>
                    <TableCell align="left">
                      <IconButton color='error' onClick={() => handleDeletePI(row._id)}>
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
          <SearchIcon />
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
      <InstituteSelector open={instituteOpen} handleClose={instituteDialogClose} setSelectedInstitutes={setSelectedInstitutes} selectedInstitutes={selectedInstitutes} 
        openSnack={openSnack} setOpenSnack={setOpenSnack} snackText={snackText} setSnackText={setSnackText}
      
      />
      <PISelector open={piOpen} handleClose={piDialogClose} setSelectedPI={setSelectedPI} selectedPI={selectedPI}
        openSnack={openSnack} setOpenSnack={setOpenSnack} snackText={snackText} setSnackText={setSnackText}
      
      />


      <ExistingProjectSelector open={projectOpen} handleClose={projectDialogClose} setSelectedProject={setSelectedProject} selectedProject={selectedProject} />
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
        <Alert
          onClose={() => setOpenSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackText}
        </Alert>
      </Snackbar>
    </div>
  )
}

//tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // '& .MuiDialogContent-root': {
  //   padding: theme.spacing(2),
  // },
  // '& .MuiDialogActions-root': {
  //   padding: theme.spacing(1),
  // },
}));

//Select Institutes
const InstituteSelector = (props) => {
  const handleManagerSelect = (data) => {
    const arr = props.selectedInstitutes.filter((t) => {
      return t._id == data._id
    })
    if (arr.length == 0)
      props.setSelectedInstitutes([...props.selectedInstitutes, data])
  }

  const [allInstitutes, setAllInstitutes] = React.useState([])
  const [tempAllInstitutes, setTempInstitutes] = React.useState([])
  const [value, setValue] = React.useState(0);
  const [search,setSearch] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  useEffect(() => {

    loadInstitutes()
  }, [])


  const loadInstitutes = () => {
    let tempInstitutes = []
    backend.get('api/projects/institutes/').then(res => {

      tempInstitutes = res.data.response.map(data => { return data })
      setAllInstitutes(tempInstitutes)

      setTempInstitutes(tempInstitutes)


    }).catch(err => {

    })
  }

  useEffect(()=>{
    setTempInstitutes(allInstitutes?.filter(row => row.institute_name.toLowerCase().includes(search.toLowerCase())))

  },[search])
  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={'md'}
      fullWidth={true}
      open={props.open}
    >

      <DialogContent dividers>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Add" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <OutlinedInput
            placeholder='Search'
            size='small'
            fullWidth

            onChange={(e)=>{
              setSearch(e.target.value)
            }}


          />
          <List sx={{ maxHeight: 150,height:"150" }}>
            {
              tempAllInstitutes.map((data, index) => {
                return (
                  <>
                    <ListItemButton key={index} onClick={() => handleManagerSelect(data)}>
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

        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddInstitutes loadInstitutes={loadInstitutes}
            openSnack={props.openSnack} setOpenSnack={props.setOpenSnack} snackText={props.snackText} setSnackText={props.setSnackText}
          
          />
        </TabPanel>

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
    const arr = props.selectedPI.filter((t) => {
      return t._id == data._id
    })
    if (arr.length == 0)
      props.setSelectedPI([...props.selectedPI, data])
  }

  const [allPI, setAllPI] = React.useState([])
  const [tempAllPI, setTempAllPI] = React.useState([])
  const [value, setValue] = React.useState(0);
  const [search,setSearch] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    loadPI()

  }, [])


  useEffect(()=>{
    setTempAllPI(allPI?.filter(row => row.pi_name.toLowerCase().includes(search.toLowerCase())))

  },[search])

  const loadPI = () => {
    let tempInstitutes = []
    backend.get('api/projects/pidetails/').then(res => {

      tempInstitutes = res.data.response.map(data => { return data })
      setAllPI(tempInstitutes)
      setTempAllPI(tempInstitutes)

    }).catch(err => {

    })
  }
  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={'md'}
      fullWidth={true}
      open={props.open}
    >

      <DialogContent dividers>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Add" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <OutlinedInput
            placeholder='Search'
            size='small'
            fullWidth
            onChange={(e)=>{
              setSearch(e.target.value)
            }}
          />
          <List sx={{ maxHeight: 150 }}>
            {
              tempAllPI.map((data, index) => {
                return (
                  <>
                    <ListItemButton key={index} onClick={() => handlePISelect(data)}>
                      <ListItemIcon>
                        <VillaIcon />
                      </ListItemIcon>
                      {data.pi_name}
                    </ListItemButton>
                  </>
                )
              })
            }

          </List>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddPI loadPI={loadPI} 
            openSnack={props.openSnack} setOpenSnack={props.setOpenSnack} snackText={props.snackText} setSnackText={props.setSnackText}
          
          />
        </TabPanel>

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
    props.setSelectedProject(data.title)
  }

  const [allProjects, setAllProjects] = React.useState([])
  const [tempAllProjects, setTempAllProjects] = React.useState([])
  const [search,setSearch] = React.useState("")
  useEffect(() => {
    let tempProjects = []
    backend.get('api/projects/').then(res => {

      tempProjects = res.data.response.map(data => { return data })
      setAllProjects(tempProjects)
      setTempAllProjects(tempProjects)

    }).catch(err => {

    })

  }, [])


  
  useEffect(()=>{
    setTempAllProjects(allProjects?.filter(row => row.project_title.title.toLowerCase().includes(search.toLowerCase())))

  },[search])

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

          onChange={(e)=>{
            setSearch(e.target.value)
          }}
        />
      </DialogTitle>
      
      <DialogContent dividers>
        <List sx={{ maxHeight: 250 }}>
          {
            tempAllProjects.map((data, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => handleProjectSelect({ id: data._id, title: data.project_title.title })}>
                    <ListItemIcon>
                      <FolderZipIcon />
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



//Add Feilds

//Institutes

const AddInstitutes = (props) => {

  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const uploadInstitute = () => {
    backend.post("/api/projects/institutes/add", {
      institute_name: name,
      institute_country: country,
      institute_city: city,
      institute_address: address,
      institute_email: email,
      institute_phone: phone
    }).then((res) => {
      console.log(res)
      props.setSnackText("Institute added successfully")
      props.setOpenSnack(true)
      props.loadInstitutes()
    })
  }

  return (
    <div>
      <OutlinedInput size='small' style={{ marginBottom: "5px" }}
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        placeholder='Institute Name' fullWidth />
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <OutlinedInput size='small'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ marginBottom: "5px" }} placeholder='Country' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ marginBottom: "5px" }} placeholder='City' fullWidth />
        </Grid>
      </Grid>
      <OutlinedInput size='small'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginBottom: "5px" }} placeholder='Address' fullWidth />
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <OutlinedInput size='small'

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "5px" }} placeholder='Email' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small'


            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ marginBottom: "5px" }} placeholder='Phone' fullWidth />
        </Grid>
      </Grid>
      <Button variant='contained'
        type='submit'
        onClick={uploadInstitute}
        fullWidth>
        Add
      </Button>
    </div>
  )
}

//PI


const AddPI = (props) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [designation, setDesignation] = useState("")
  const [phoneNO, setPhoneNo] = useState("")
  const [signaturyRights, setSignaturyRights] = useState("")
  const [topManagement, setTopManagement] = useState("")

  const uploadPI = () => {
    backend.post("/api/projects/pidetails/add", {
      pi_name:name,
    pi_designation:designation,
    pi_email:email,
    pi_phone:phoneNO,
    pi_signatury_rights:signaturyRights==="YES",
    pi_top_management:topManagement==="YES"
    }).then((res) => {
      console.log(res)
      props.setSnackText("PI details added successfully")
      props.setOpenSnack(true)
      props.loadPI()
    })
  }

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder='Name' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={designation}
            required
            onChange={(e) => setDesignation(e.target.value)}
            placeholder='Designation' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={phoneNO}
            required
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder='Phone no.' fullWidth />
        </Grid>

        <Grid item xs={6} style={{marginBottom:"10px"}}>
        
             <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["YES", "NO"]}
            fullWidth
            size='small'
            onChange={(event, newValue) => {
              setSignaturyRights(newValue);
            }}

            // onInputChange={(e) => setSignaturyRights(e.target.value)}
            renderInput={(params) => <TextField {...params} label="Signatory Rights" />}
          />
        </Grid>

        <Grid item xs={6}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["YES", "NO"]}
            fullWidth
            size='small'
            onChange={(event, newValue) => {
              setTopManagement(newValue);
            }}

            // onInputChange={(e) => setSignaturyRights(e.target.value)}
            renderInput={(params) => <TextField {...params} label="Top Management" />}
          />
        </Grid>
      </Grid>
      <Button variant='contained'
        type='submit'
        onClick={uploadPI}
        fullWidth>
        Add
      </Button>
    </div>
  )
}