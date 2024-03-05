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
import { AppBar, Backdrop, BottomNavigation, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Grid, OutlinedInput, Paper, TextField, Toolbar } from '@mui/material';
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
import { useLocation } from 'react-router';
import editData, { appendEdits } from '../features/projectData/editData';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
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

export default function EditProjectMain(props) {

  let history = useNavigate();
  const [formSubmitBackdrop, setformSubmitBackdrop] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState(false);
  const projectData = useSelector(state => state.editData)
  const user=useSelector(state=>state.login)

  // const locationData=useLocation()
  // const [editData,setEditData]=React.useState(locationData.state.data)
  // const dispatch=useDispatch()
  // console.log(editData)

  // React.useEffect(()=>{
  //   // const initialState = {
  //   //   projectDetails:{},
  //   //   customerDetails:{},
  //   //   documents:{},
  //   //   system:{},
  //   //   fiFunding:{},
  //   //   projectId:""
  //   // }
  //   dispatch(appendEdits({
  //     projectDetails:editData.project_title,
  //     customerDetails:editData.customer_details
  //   }))
  // },[dispatch])
  const userData = useSelector(state => state.login)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };
  const [value, setValue] = React.useState(0);
  const [index, setIndex] = React.useState(0)
  const [used, setUsed] = React.useState(0)

  React.useEffect(() => {

    if (used <= 1) {
      if (value == 0) {
        setValue(1);
      }
      if (value == 1)
        setValue(0)

      setUsed(used + 1)
    }


  }, [value, used])
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
    const fiFundingData = projectData.fiFunding
    const fiFundingDocs = projectData.fiFundingDocuments


    let approvalfile = fiFundingData?.fi_funding_status?.fi_funding_uih_funding_bu_aprroval
    console.log(approvalfile)

    approvalfile += fiFundingData?.fi_funding_status?.fi_funding_uih_funding_bu_aprroval === "" ? "" : ","
    if (fiFundingDocs?.fi_funding_uih_funding_bu_aprroval?.map(data => data.uploaded_path).toString() !== "" && fiFundingDocs?.fi_funding_uih_funding_bu_aprroval?.map(data => data.uploaded_path).toString() !== undefined)
      approvalfile = approvalfile + fiFundingDocs?.fi_funding_uih_funding_bu_aprroval?.map(data => data.uploaded_path).toString()


    let cifile = fiFundingData?.fi_funding_status?.fi_funding_customer_invoice
    cifile += fiFundingData?.fi_funding_status?.fi_funding_customer_invoice === "" ? "" : ","
    if (fiFundingDocs?.fi_funding_customer_invoice?.map(data => data.uploaded_path).toString() !== "" && fiFundingDocs?.fi_funding_customer_invoice?.map(data => data.uploaded_path).toString() != undefined)
      cifile = cifile + fiFundingDocs?.fi_funding_customer_invoice?.map(data => data.uploaded_path).toString()

    // alert("wait")
    console.log(fiFundingData?.fi_funding_status?.fi_funding_uih_funding_bu_aprroval + fiFundingDocs?.fi_funding_uih_funding_bu_aprroval?.map(data => data.uploaded_path).toString())
    console.log(approvalfile)
    // console.log(fiFundingData?.fi_funding_status?.fi_funding_customer_invoice+fiFundingDocs?.fi_funding_customer_invoice?.map(data=>data.uploaded_path).toString())
    // console.log(cifile)
    //same like above all documents
    const prevData = projectData.prevDocuments
    //pdd docs
    // console.log(prevData)
    // alert(documentsData.toString())
    let pdd_docs = prevData?.pdd_document
    pdd_docs += prevData?.pdd_document === "" ? "" : ","
    if(pdd_docs===undefined) pdd_docs=""

    if (documentsData?.pdd_document?.map(data => data.uploaded_path).toString() !== "" && documentsData?.pdd_document?.map(data => data.uploaded_path).toString() != undefined)
      pdd_docs = pdd_docs + documentsData?.pdd_document?.map(data => data.uploaded_path).toString()


    let da_docs = prevData?.draft_agreement
    da_docs += prevData?.draft_agreement === "" ? "" : ","
    if(da_docs===undefined) da_docs=""

    if (documentsData?.draft_agreement?.map(data => data.uploaded_path).toString() !== "" && documentsData?.draft_agreement?.map(data => data.uploaded_path).toString() != undefined)
      da_docs = da_docs + documentsData?.draft_agreement?.map(data => data.uploaded_path).toString()
    
      let sa_docs = prevData?.signed_agreement
      sa_docs += prevData?.signed_agreement === "" ? "" : ","
      if(sa_docs===undefined) sa_docs=""

      if (documentsData?.signed_agreement?.map(data => data.uploaded_path).toString() !== "" && documentsData?.signed_agreement?.map(data => data.uploaded_path).toString() != undefined)
      sa_docs = sa_docs + documentsData?.signed_agreement?.map(data => data.uploaded_path).toString()


      let others = prevData?.others
      others += prevData?.others === "" ? "" : ","
      if(others===undefined) others=""

      if (documentsData?.others?.map(data => data.uploaded_path).toString() !== "" && documentsData?.others?.map(data => data.uploaded_path).toString() != undefined)
      others = others + documentsData?.others?.map(data => data.uploaded_path).toString()
      


    backend.post("api/projects/update", {
      project_title: {
        title: data.title,
        description: data.description,
        objective: data.objective,
        project_duration: data.project_duration,
        current_stage: data.current_stage,
        project_manager: data?.project_manager?.map(data => data._id),
        // ethics_irb_approval:data.ethics_irb_approval,
        exp_date: data.exp_date,
        act_start_date: data.act_start_date,
        end_date: data.end_date,
        hw_sw_spp: data?.hw_sw_spp


      },
      projectId: projectData.projectId,
      customer_details: {
        institutes: customerData?.institutes?.map(data => data._id),
        pi_details: customerData?.pi_details?.map(data => data._id),
        existing_projects: customerData?.existing_projects
      },
      documents: {
        pdd_document: pdd_docs===undefined?"":pdd_docs,
        draft_agreement: da_docs===undefined?"":da_docs,
        signed_agreement:sa_docs===undefined?"":sa_docs,
        others:others===undefined?"":others
      },
      system: systemData,
      fi_funding: {
        fi_funding_status: {
          fi_funding_funded: fiFundingData?.fi_funding_status?.fi_funding_funded,
          fi_funding_funding_person: fiFundingData?.fi_funding_status?.fi_funding_funding_person,
          fi_funding_uih_funding_amount: fiFundingData?.fi_funding_status?.fi_funding_uih_funding_amount,
          fi_funding_uih_funding_bu: fiFundingData?.fi_funding_status?.fi_funding_uih_funding_bu,
          fi_funding_uih_funding_bu_aprroval: approvalfile,
          fi_funding_customer_invoice: cifile
        }
      },
      updated_by:user?.user?._id,

    })
      .then(res => {
        console.log(res)
        setformSubmitBackdrop(false)
        setTimeout(() => {
          // window.location.href = '/search';
          // window.location.reload();
          history("/search")
          
        }, 100);

      })
      .catch(err => {
        console.log(err)
      })

    //  setformSubmitBackdrop(false)


  }


  const [deleteDialong,setDeleteDialong]=React.useState(false)
  const data = projectData.projectDetails

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
          Updating The Form
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
           


           Update
         </Button>
          </Grid>

          <Grid item>
          <Button startIcon={ <DeleteIcon />} 
          
          onClick={() =>setDeleteDialong(true)}
          variant="contained" color='error'>
           


           Delete
         </Button>
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
      <DeleteDialog open={deleteDialong} setOpen={setDeleteDialong} title={data.title} projectId={projectData.projectId} />


    </>
  );
}



//Delete Dialog


 function DeleteDialog(props) {
  const history=useNavigate()

  const handleClose = () => {
    props.setOpen(false);
  };
const [error,setError]=React.useState(false)
  return (
    <React.Fragment>
     
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const projectTitle = formJson.projectTitle;
            if(projectTitle!==props.title){
              setError(true)
              return
            }

            backend.post("api/projects/deleteprojects", {
              projectId: props.projectId
            }).then((response) => {
              history('/search')
            })


          },
        }}
      >
        <DialogTitle>
        Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete this project, Please enter project name
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="name"
            name="projectTitle"
            placeholder="Project Title"
            size='small'
            style={{marginTop: '10px'}}
            type="text"
            fullWidth
            variant="standard"
            helperText="Project Title"
            onChange={(e)=>{
              if(props.title!==e.target.value){
                setError(true)
              }
              else{
                setError(false)
              }
            }}
          />
                <FormHelperText >{error ? 'Enter Correct project Title' :""}</FormHelperText>

                <Alert fullWidth severity="error">All documents will be deleted along with project</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}