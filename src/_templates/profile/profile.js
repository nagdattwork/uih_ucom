import { Avatar, Badge, Button, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, OutlinedInput, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import backend from '../../app/baseLink';
import PersonIcon from '@mui/icons-material/Person';
import uihVideo from './../../static/uih.mp4'

export default function Profile() {
  const user = useSelector(state => state.login)

  const [profile_path, setProfilePath] = useState("")
  const [dialog, setDialog] = useState(false)

  const data = user.user
  const [fname, setFname] = useState(data.fname)
  const [lname, setLname] = useState(data.lname)
  const [uname, setUname] = useState(data.uname)
  const [country, setCountry] = useState(data.country)
  const [specialization, setSpecialization] = useState(data.specialization)
  const [region, setRegion] = useState(data.region)
  const [email, setEmail] = useState(data.email)
  const [type, setType] = useState(data.userType)



  useEffect(() => {

    setProfilePath(process.env.REACT_APP_DOCUMENT_PATH + user.user.image)
    console.log(process.env.REACT_APP_DOCUMENT_PATH, user.user.image)
  }, [])

  const updateData = () => {
    backend.post("/api/users/update", {
      userId: data._id,
      fname,
      lname,
      uname,
      country,
      specialization,
      region
    }).then((res) => {
      let temp = {
        ...user,
        user: {
          ...user.user,
          fname,
          lname,
          uname,
          country,
          specialization,
          region        // Update the image path here
        }
      };

      localStorage.setItem('user', JSON.stringify(temp))


      window.location.reload()
    })
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <video style={{ objectFit: 'cover', width: "100%", height: "94vh" }} controls={false} src={uihVideo} type="video/mp4" muted loop autoPlay playsInline></video>
        </Grid>

        <Grid item xs={6}>
          <Paper style={{ textAlign: "left" }} square >

            <Grid container spacing={0} padding={2}  >

              <Grid item xs={3}  >

                <IconButton onClick={() => { setDialog(true) }} color='primary'>

                  <Avatar variant='rounded' sx={{ width: 150, height: 150 }} src={profile_path} alt={user.user.fname.toUpperCase()}    >
                    <PersonIcon sx={{ fontSize: 80 }} />
                  </Avatar>
                </IconButton>
              </Grid>

              <Grid item xs={8} style={{ marginBottom: "=10px" }}>
                <Grid container>
                  <Grid item xs={6}>
                   <ListItemButton>
                   <ListItemText  primary ={"Email"}  secondary={email}/>
                  
                   </ListItemButton>
                  </Grid>
                  <Grid item xs={6}>
                  <ListItemButton>
                   <ListItemText  primary ={"User type"}  secondary= {type} />
                  
                   </ListItemButton>
                  </Grid>
                </Grid>
              </Grid>







            </Grid>
          </Paper>
          < Paper square >
            <Grid container spacing={0} padding={2} style={{ height: "100%" }} >


              <Grid item xs={12} style={{ height: "100%" }}>

                <Grid container spacing={2} padding={2}>
                  <Grid item xs={4}>
                    <b>First Name</b>
                    <OutlinedInput size='small' fullWidth value={fname} onChange={(e) => setFname(e.target.value)} />
                  </Grid>
                  <Grid item xs={4}>
                    <b>Last Name</b>
                    <OutlinedInput size='small' fullWidth onChange={(e) => setLname(e.target.value)} value={lname} />
                  </Grid>
                  <Grid item xs={4}>
                    <b>User Name</b>
                    <OutlinedInput size='small' onChange={(e) => setUname(e.target.value)} fullWidth value={uname} />
                  </Grid>
                  <Grid item xs={4}>
                    <b>Country</b>
                    <OutlinedInput size='small' onChange={(e) => setCountry(e.target.value)} fullWidth value={country} />
                  </Grid>

                  <Grid item xs={4}>
                    <b>Specialization</b>
                    <OutlinedInput size='small' onChange={(e) => setSpecialization(e.target.value)} fullWidth value={specialization} />
                  </Grid>

                  <Grid item xs={4}>
                    <b>Region</b>
                    <OutlinedInput size='small' onChange={(e) => setRegion(e.target.value)} fullWidth value={region} />
                  </Grid>
                  <Grid item xs={8}>


                  </Grid>
                  <Grid item xs={4}>

                    <Button variant='contained' color='info' fullWidth startIcon={<CachedIcon />} onClick={updateData}>
                      update
                    </Button>

                  </Grid>

                </Grid>

              </Grid>



            </Grid>
          </Paper>
        </Grid>

      </Grid>

      <DpChangeDialog open={dialog} setOpen={setDialog} user={user} profile_path={profile_path} setProfilePath={setProfilePath} />
    </div>

  )
}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function DpChangeDialog(props) {
  const [user, setUser] = useState(props.user)
  const fileInputRef = useRef(null);
  const [dpFile, setDpFile] = useState("")
  const [original_path, setOriginalPath] = useState(props.profile_path)


  useEffect(() => {
    setOriginalPath(props.profile_path)
  }, [props.profile_path])
  const handleClose = () => {
    props.setOpen(false);
  };
  const handlefileClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    console.log(dpFile)
  }, [dpFile])

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setDpFile(file)

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalPath(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const uploadFiles = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("userId", user.user._id)
    bodyFormData.append("deleted", false)
    bodyFormData.append("filename", user.user.image)


    bodyFormData.append("image", dpFile)
    backend.post('/api/users/updatedp',
      bodyFormData)
      .then((res) => {
        if (res.data.path != "") {
          props.setProfilePath(process.env.REACT_APP_DOCUMENT_PATH + res.data.path)

          let temp = {
            ...user,
            user: {
              ...user.user,
              image: res.data.path // Update the image path here
            }
          };

          localStorage.setItem('user', JSON.stringify(temp))


          window.location.reload()

        }
      })
  }

  const deleteDp = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("userId", user.user._id)
    bodyFormData.append("deleted", true)
    bodyFormData.append("filename", user.user.image)


    backend.post('/api/users/updatedp',
      bodyFormData).
      then((res) => {
        props.setProfilePath("")


        let temp = {
          ...user,
          user: {
            ...user.user,
            image: res.data.path // Update the image path here
          }
        };

        localStorage.setItem('user', JSON.stringify(temp))


        window.location.reload()
      })
  }
  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={"sm"}
        fullWidth
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Profile Picture
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <Grid container spacing={2} >
            <Grid item xs={12} style={{ textAlign: 'center' }} >

              <IconButton fullWidth onClick={handlefileClick}>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                  accept='image/*'
                />

                <Avatar sx={{ width: 256, height: 256 }} src={original_path} alt={user.user.image} variant="square">

                  <PersonIcon sx={{ fontSize: 80 }} /> </Avatar>
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' color='info' onClick={uploadFiles} fullWidth>
                Update
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' color='error' onClick={deleteDp} fullWidth>
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}