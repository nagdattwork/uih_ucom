import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBarMain from '../app_bar/app_bar';
import ProjectDetails from './projectDetails';
import CustomerDetails from './customerDetails';
import { AppBar, Backdrop, BottomNavigation, CircularProgress, Paper, Toolbar } from '@mui/material';
import SystemDetails from './systemDetails';
import DocumentsDetails from './documentsDetails';
import Fab from '@mui/material/Fab';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import Snackbar, { snackbarClasses } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
import { tab1Validation, tab2Validation } from './validations'
import backend from '../../app/baseLink';
import axios from 'axios';
import FiFunding from './fiFunding';

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function CreateNewMain() {
  const [formSubmitBackdrop, setformSubmitBackdrop] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState(false);
  const projectData = useSelector(state => state.projectData)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };
  const [value, setValue] = React.useState(0);
  const [index, setIndex] = React.useState(0)

  const handleChange = (event, newValue) => {


    setValue(newValue);
  };

  const validateFirst = () => {


    setformSubmitBackdrop(true)
    if (!tab1Validation(projectData.projectDetails).status) {
      setValue(0)
      setSnackbar(true)
      return
    }
    if (!tab2Validation(projectData.customerDetails).status) {
      setValue(1)
      setSnackbar(true)
      return
    }


    createProject()
  }

  const createProject = () => {
    const data = projectData.projectDetails
    const customerData = projectData.customerDetails
    const documentsData = projectData.documents
    const systemData = projectData.system
    backend.post("api/projects/add", {
      project_title: data,
      customer_details: {
        institutes: customerData?.institutes?.map(data => data._id),
        pi_details: customerData?.pi_details?.map(data => data._id),
        existing_projects: customerData?.existing_projects
      },
      documents: documentsData,
      system: systemData
    })
      .then(res => {
        console.log(res)
        setTimeout(() => window.location.reload(), 1000);

      })

    //  setformSubmitBackdrop(false)


  }
  return (
    <>
      {/* <Toolbar/> */}
      <div

      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={formSubmitBackdrop}
        >
          <CircularProgress style={{ marginRight: "5px" }} color="inherit" />
          Submitting The Form
        </Backdrop>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Project Details" {...a11yProps(0)} />
          <Tab label="Customer Details" {...a11yProps(1)} />
          <Tab label="System" {...a11yProps(2)} />
          <Tab label="FI/ Funding" {...a11yProps(3)} />
          {/* <Tab label="Legal/ Comp" {...a11yProps(4)} />
        <Tab label="Approvals" {...a11yProps(5)} />
        <Tab label="Outcomes" {...a11yProps(6)} />
         */}
          <Tab label="Documents" {...a11yProps(7)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProjectDetails />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <CustomerDetails />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SystemDetails />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <FiFunding />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <DocumentsDetails />
        </TabPanel>

        <Toolbar />

      </div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5} >
        <BottomNavigation style={{ marginBottom: "-4px", marginTop: "4px" }}>

          <Fab variant="extended" color='primary'>
            <SaveAsIcon sx={{ mr: 1 }} /> Save
          </Fab>
          <Fab variant="extended" color='success' onClick={validateFirst}>
            <PublishIcon sx={{ mr: 1 }} /> Submit
          </Fab>

        </BottomNavigation>
      </Paper>


      <Snackbar open={snackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={1000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Trying to fill invalid form
        </Alert>
      </Snackbar>


    </>
  );
}
