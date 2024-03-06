import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItemButton, ListItemIcon, OutlinedInput, Tab, TableHead, Tabs, TextField, Typography } from '@mui/material'
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
import VillaIcon from '@mui/icons-material/Villa';
import PropTypes from 'prop-types';
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
              {selectedIB.map((row,index) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    
                  >
                    <TableCell component="th" scope="row">
                      {index+1}
                    </TableCell>
                    <TableCell align="left">{row.full_ib_bu}</TableCell>
                    <TableCell align="left">{row.full_ib_modality}</TableCell>
                    <TableCell align="left">{row.full_ib_model}</TableCell>
                    <TableCell align="left">{row.full_ib_sw_version}</TableCell>
                    <TableCell align="left">{row.full_ib_installation_date}</TableCell>
                    <TableCell align="left">{row.full_ib_upgrades}</TableCell>

                    <TableCell align="left">{row.full_ib_warranty}</TableCell>

                    <TableCell align="left">
                      <IconButton color='error' onClick={()=>handleDeleteIB(row._id)}>
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
  const [tempAllSystems, setTempAllSystems] = React.useState([])
  const [search,setSearch] = React.useState("")
  const [value, setValue] = React.useState(0);

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
    loadSystem()

  }, [])

  useEffect(()=>{
    setTempAllSystems(allsystems?.filter(row => row.systems_bu.toLowerCase().includes(search.toLowerCase())))

  },[search])
  const loadSystem = () => {
    let tempSystems = []
    backend.get('api/projects/systemdetails/').then(res => {

      tempSystems = res.data.response.map(data => { return data })
      setAllSystems(tempSystems)
      setTempAllSystems(tempSystems)

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
            tempAllSystems.map((data, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => handleSystemsSelect(data)}>
                    <ListItemIcon>
                      <VillaIcon />
                    </ListItemIcon>
                    {data.systems_bu}
                  </ListItemButton>
                </>
              )
            })
          }

        </List>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddSystem loadSystem={loadSystem} />
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
  const [tempAllIB, setTempAllIB] = React.useState([])
  const [search,setSearch] = React.useState("")
  const [value, setValue] = React.useState(0);

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
    loadIB()

  }, [])

  useEffect(()=>{
    setTempAllIB(allIB?.filter(row => row.full_ib_bu.toLowerCase().includes(search.toLowerCase())))

  },[search])

  const loadIB = () => {
    let tempIBs = []
    backend.get('api/projects/fulliblists/').then(res => {

      tempIBs = res.data.response.map(data => { return data })
      setAllIB(tempIBs)
      setTempAllIB(tempIBs)

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
            tempAllIB.map((data, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => handleIBSelect(data)}>
                    <ListItemIcon>
                      <VillaIcon />
                    </ListItemIcon>
                    {data.full_ib_bu}
                  </ListItemButton>
                </>
              )
            })
          }

        </List>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddFullIB loadIB={loadIB} />
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


//Adding Feilds

//Add system
const AddSystem = (props) => {

  const [bu, setBU] = useState("")
  const [model, setModel] = useState("")

  const [swversion, setSwversion] = useState("")
  const [srNO, setSrNO] = useState("")
  const [installdate, setInstalldate] = useState("")
  const [warranty, setWarranty] = useState("")

  
  const uploadSystem = () => {
    backend.post("/api/projects/systemdetails/add", {
      systems_bu:bu,
      systems_sw_hw_version:swversion,
    systems_model:model,
    systems_sr_no:srNO,
    systems_installation_date:installdate,
    systems_warranty_status:warranty
    }).then((res) => {
      console.log(res)
      props.loadSystem()
    })
  }

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={bu}
            required
            onChange={(e) => setBU(e.target.value)}
            placeholder='BU' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={model}
            required
            onChange={(e) => setModel(e.target.value)}
            placeholder='Model' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={swversion}
            required
            onChange={(e) => setSwversion(e.target.value)}
            placeholder='S/W version' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={srNO}
            required
            onChange={(e) => setSrNO(e.target.value)}
            placeholder='SR. No.' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={installdate}
            required
            type='Date'
            onChange={(e) => setInstalldate(e.target.value)}
            placeholder='Installation Date' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={warranty}
            required
          
            onChange={(e) => setWarranty(e.target.value)}
            placeholder='Warranty Status' fullWidth />
        </Grid>
      </Grid>
      <Button variant='contained'
        type='submit'
        onClick={uploadSystem}
        fullWidth>
        Add
      </Button>
    </div>
  )
}




const AddFullIB = (props) => {

  const [bu, setBU] = useState("")
  const [model, setModel] = useState("")

  const [swversion, setSwversion] = useState("")
  const [modality, setModality] = useState("")
  const [installdate, setInstalldate] = useState("")
  const [warranty, setWarranty] = useState("")
  const [upgrades, setupgrade] = useState("")

  const uploadIB = () => {
    backend.post("/api/projects/fulliblists/add", {
      full_ib_bu:bu,
      full_ib_modality:modality,
      full_ib_sw_version:swversion,
      full_ib_model:model,
      full_ib_installation_date:installdate,
      full_ib_upgrades:upgrades,
      full_ib_warranty:warranty
    }).then((res) => {
      console.log(res)
      props.loadIB()
    })
  }

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={bu}
            required
            onChange={(e) => setBU(e.target.value)}
            placeholder='BU' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={model}
            required
            onChange={(e) => setModel(e.target.value)}
            placeholder='Model' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={swversion}
            required
            onChange={(e) => setSwversion(e.target.value)}
            placeholder='S/W version' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={modality}
            required
            onChange={(e) => setModality(e.target.value)}
            placeholder='Modality' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={installdate}
            required
            type='Date'
            onChange={(e) => setInstalldate(e.target.value)}
            placeholder='Installation Date' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={upgrades}
            required
          
            onChange={(e) => setupgrade(e.target.value)}
            placeholder='Upgrades' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <OutlinedInput size='small' style={{ marginBottom: "5px" }}
            value={warranty}
            required
          
            onChange={(e) => setWarranty(e.target.value)}
            placeholder='Warranty Status' fullWidth />
        </Grid>

      
      </Grid>
      <Button variant='contained'
        type='submit'
        onClick={uploadIB}
        fullWidth>
        Add
      </Button>
    </div>
  )
}
