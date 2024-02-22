import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';

import ProfileHome from './profile_home';
import NavigationHome from './navigation_home';
import TableHome from './table_home';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/userCred/userLogin'
const defaultTheme = createTheme();

export default function Home() {
    const user=useSelector((state)=>state)


    return (
        <div >
           
            <Grid container   >
                {/* <CssBaseline /> */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={4}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?study,rediology)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                  
  
                ></Grid>
                <Grid item xs={12} sm={8} md={8}  elevation={6} square>
                    <div
                        style={{ marginLeft: "15px",marginRight:"15px" }}
                    >

                        <Grid container spacing={2}   justifyContent="flex-end"   alignItems="flex-end" textAlign={'right'}>
                            <Grid item justifyContent="flex-end">
                                <h1>Welcome to uCOM</h1>
                                <p>A web based tool for collaboration management</p>
                            </Grid>
                            {/* <Grid item xs={3}>
                                <ProfileHome />  </Grid> */}

                        </Grid>

                        {/* <NavigationHome/> */}
                        <Grid container style={{backgroundColor:'#a2daaa'}} spacing={2}>
                            <Grid item xs={8}  style={{padding:"5px"}} >
                                <h4 style={{margin:"0px",marginTop:"8px",marginLeft:"8px"}} >Overview of latest projects</h4>
                            </Grid>
                            <Grid item xs={2} style={{marginTop:"-8px"}}>
                                <Button variant='contained' color='success'>  Download</Button>
                            </Grid>
                            <Grid item xs={2} style={{marginTop:"-8px"}}>
                            <Button  color='success' style={{marginBottom:"8px"}}>  Explore</Button>
                            </Grid>
                           
                        </Grid>
                        <TableHome/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}