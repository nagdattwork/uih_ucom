import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import {  useDispatch } from 'react-redux'
import { login } from '../features/userCred/userLogin'
import backgroundImage from '../../static/homePageImage.jpg'
import uihVideo from './../../static/uih.mp4'

import backend from '../../app/baseLink'
import { BrowserRouter, Route } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login(props) {
  const dispatch = useDispatch()

  const  [email,setEmail]=React.useState('')
  const [pass,setPass]=React.useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    backend.post('/api/users/login',{
      
        username:email,password:pass
      
    }) .then(response =>{
      console.log(response.data);
      if (response.data.message=="ls")
     { 
      if(!response.data.user.approved){
        alert("Your account is not approved yet")
        return
      }
      localStorage.setItem('user',JSON.stringify({
        loggedIn:true,
        user:response.data.user,
        token:response.data.token
      }))
      props.setLogin(true)
      dispatch(login({
        loggedIn:true,
        user:response.data.user,
        token:response.data.token
      }))
    }else if(response.data.message==='wp'){
      alert("Wrong password")
    }

    else if(response.data.message==='nuf'){
      alert("User not found")
    }
    })
    
  //  console.log(output)
    
  };

  return (
    <div>
      <Grid container  sx={{ height: '100vh' }}>
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
         
        >
            <video  style={{objectFit: 'cover',width:"100%",height:"100vh"}} controls={false} src={uihVideo} type="video/mp4"  muted loop autoPlay playsInline></video>


        </Grid>
        <Grid item xs={12} sm={8} md={4}  elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'success' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              SignIn
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <OutlinedInput
                margin="normal"
                required
                fullWidth
                placeholder='Email'
                autoFocus
                color='success'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <OutlinedInput
                margin="normal"
                style={{marginTop:"10px"}}
                required
                fullWidth
                color='success'
               placeholder='password'
               type='password'
               value={pass}
               onChange={(e)=>setPass(e.target.value)}
               
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color='success'
               
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs={6}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs={6} style={{textAlign:'right'}}>
                  <Link href="/createaccount"  variant="body2">
                    Create Account
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
       
        
      </Grid>
    </div>
  );
}