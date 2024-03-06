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
import { AppBar, Backdrop, BottomNavigation, Button, CircularProgress, Grid, Paper, Toolbar } from '@mui/material';
import SystemDetails from './systemDetails';
import DocumentsDetails from './documentsDetails';
import Fab from '@mui/material/Fab';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import Snackbar, { snackbarClasses } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { append, makeEmpty } from '../features/projectData/projectData';
import { tab1Validation, tab2Validation } from './validations'
import backend from '../../app/baseLink';
import axios from 'axios';
import FiFunding from './fiFunding';
import {useNavigate } from 'react-router';

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

  const history=useNavigate()
  const dispatch=useDispatch()
  const [formSubmitBackdrop, setformSubmitBackdrop] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState(false);
  const projectData = useSelector(state => state.projectData)
  const userData=useSelector(state=>state.login)

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

    setformSubmitBackdrop(true)

    createProject()
  }

  const createProject = () => {
    const data = projectData.projectDetails
    const customerData = projectData.customerDetails
    const documentsData = projectData.documents
    const systemData = projectData.system
    const fiFundingData=projectData.fiFunding
    const fiFundingDocs=projectData.fiFundingDocuments
    const documentsDetailsData = projectData.documentsDetails
    console.log(documentsDetailsData)
    
    backend.post("api/projects/add", {
      project_title: {
        title:data.title,
            description:data.description,
            objective:data.objective,
            project_duration:data.project_duration,
            current_stage:data.current_stage,
            project_manager: data?.project_manager?.map(data => data._id),
            // ethics_irb_approval:data.ethics_irb_approval,
            exp_date:data.exp_date,
            act_start_date:data.act_start_date,
            end_date:data.end_date,
            hw_sw_spp:data?.hw_sw_spp
    
      },
      customer_details: {
        institutes: customerData?.institutes?.map(data => data._id),
        pi_details: customerData?.pi_details?.map(data => data._id),
        existing_projects: customerData?.existing_projects
      },
      documents: {
        pdd_document:documentsData?.pdd_document?.map(data=>data.uploaded_path).toString(),
        draft_agreement:documentsData?.draft_agreement?.map(data=>data.uploaded_path).toString(),
        signed_agreement:documentsData?.signed_agreement?.map(data=>data.uploaded_path).toString(),
        others:documentsData?.others?.map(data=>data.uploaded_path).toString(),
        pdd_details: documentsDetailsData?.pdd_details,
        da_ag_type: documentsDetailsData?.da_ag_type,
        da_ag_owner: documentsDetailsData?.da_ag_owner,
        sa_details: documentsDetailsData?.sa_details,
        other_details: documentsDetailsData?.other_details,

      },
      system: systemData,
      owner:userData.user._id,
      fi_funding:{
        fi_funding_status:{
        fi_funding_funded:fiFundingData?.fi_funding_status?.fi_funding_funded,
        fi_funding_funding_person:fiFundingData?.fi_funding_status?.fi_funding_funding_person,
        fi_funding_uih_funding_amount:fiFundingData?.fi_funding_status?.fi_funding_uih_funding_amount,
        fi_funding_uih_funding_bu:fiFundingData?.fi_funding_status?.fi_funding_uih_funding_bu,
        fi_funding_uih_funding_bu_aprroval:fiFundingDocs?.fi_funding_uih_funding_bu_aprroval?.map(data=>data.uploaded_path).toString(),
        fi_funding_customer_invoice:fiFundingDocs?.fi_funding_customer_invoice?.map(data=>data.uploaded_path).toString()
       }

        }
    })
      .then(res => {
        console.log(res)
        setTimeout(() => {
          dispatch(makeEmpty({}))
          setformSubmitBackdrop(false)
          history('/')
        }, 100);

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
          textColor="primary"
          indicatorColor="primary"
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
      <Grid   justifyContent="flex-end" container component={Paper} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5} spacing={1} padding={1} >
       
          {/* <Typography> {editData.project_title.title}</Typography> */}


          <Grid item>
          <Button startIcon={ <PublishIcon />} variant="contained" color='info' onClick={validateFirst}>
           


           Submit
         </Button>
          </Grid>

          <Grid item>
          {/* <Button startIcon={ <DeleteIcon />} 
          
          onClick={() =>setDeleteDialong(true)}
          variant="contained" color='error'>
           


           Delete
         </Button> */}
          </Grid>

      </Grid>

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
