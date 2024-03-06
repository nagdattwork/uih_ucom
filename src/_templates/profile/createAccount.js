import { Avatar, Badge, Button, Grid, IconButton, OutlinedInput, Paper } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';

import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import backend from '../../app/baseLink';
import PersonIcon from '@mui/icons-material/Person';
import createImage from '../../static/main_tech.jpg'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function CreateAccount() {

    const [profile_path, setProfilePath] = useState("")
    const fileInputRef = useRef(null)
    const [dpfile, setDpFile] = useState()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [uname, setUname] = useState("")
    const [country, setCountry] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [region, setRegion] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnfpassowrd, setCnfPassowrd] = useState("")
    const history = useNavigate()
    const handlefileClick = () => {
        fileInputRef.current.click();
    };


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setDpFile(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePath(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };


    useEffect(() => {

    }, [])

    const createUser = () => {

        if(fname==""){
            alert("Please enter first name")
        }

        if(lname==""){
            alert("Please enter last name")
        }

        if(uname==""){
            alert("Please enter User name")
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email.match(emailRegex)){
            alert("Enter Valid Email")
            return
        }
        if(password!=cnfpassowrd) {
            alert("password and confirm password must be the same")
            return
        }

        if(password.length<8){
            alert("password length must be greater than or equal to 8 characters")
            return
        }

        
        const formData = new FormData()
        formData.append("fname", fname)
        formData.append("lname", lname)

        formData.append("country", country)

        formData.append("specialization", specialization)

        formData.append("uname", uname)
        formData.append("email", email)
        formData.append("region", region)
        formData.append("password", password)
        formData.append("image", dpfile)
        formData.append("approved", false)
        formData.append("userType", 'basic')


        backend.post("/api/users/add", formData).then((res) => {
            console.log(res.data)
            if(res.data.message==='UAE')
            {
                alert("User already exists")
            }
            else{alert("Account has been created!. Wait until your account verified")
            history("/")}

        }).catch((err) => {
            console.log("Something Wrong Happend")
        })


    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}  md={12} lg={8} style={{ height: "120vh" }}>
                <img width={"100%"} height={"100%"} src={createImage} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
                <div>
                    <Grid container spacing={2} padding={2} >
                        <Grid item xs={12} >
                            <div style={{ textAlign: "center" }}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileInputChange}
                                    accept='image/*'
                                />
                                <IconButton onClick={handlefileClick} color='info'>

                                    <Avatar sx={{ width: 128, height: 128 }} src={profile_path}  >
                                        <PersonIcon sx={{ fontSize: 80 }} />
                                    </Avatar>
                                </IconButton>
                            </div>
                        </Grid>




                    </Grid>

                    <Grid container spacing={2} padding={2} >


                        <Grid item xs={6}>
                            <b>First Name</b>
                            <OutlinedInput size='small' fullWidth value={fname} onChange={(e) => setFname(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <b>Last Name</b>
                            <OutlinedInput size='small' fullWidth onChange={(e) => setLname(e.target.value)} value={lname} />
                        </Grid>
                        <Grid item xs={6}>
                            <b>User Name</b>
                            <OutlinedInput size='small' onChange={(e) => setUname(e.target.value)} fullWidth value={uname} />
                        </Grid>
                        <Grid item xs={6}>
                            <b>Country</b>
                            <OutlinedInput size='small' onChange={(e) => setCountry(e.target.value)} fullWidth value={country} />
                        </Grid>

                        <Grid item xs={6}>
                            <b>Specialization</b>
                            <OutlinedInput size='small' onChange={(e) => setSpecialization(e.target.value)} fullWidth value={specialization} />
                        </Grid>

                        <Grid item xs={6}>
                            <b>Region</b>
                            <OutlinedInput size='small' onChange={(e) => setRegion(e.target.value)} fullWidth value={region} />
                        </Grid>

                        <Grid item xs={6}>
                            <b>Password</b>
                            <OutlinedInput size='small' type='password' onChange={(e) => setPassword(e.target.value)} fullWidth value={password} />
                        </Grid>

                        <Grid item xs={6}>
                            <b>Confirm Password</b>
                            <OutlinedInput size='small' type='password' onChange={(e) => setCnfPassowrd(e.target.value)} fullWidth value={cnfpassowrd} />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: "=10px" }}>
                            <b>Email</b>
                        </Grid>
                        <Grid item xs={6}>


                            <OutlinedInput size='small' fullWidth onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Grid>
                        <Grid item xs={6}>

                            <Button variant='contained' color='primary' fullWidth startIcon={<AddCircleTwoToneIcon />} onClick={createUser}>
                                Create
                            </Button>

                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                            Do you have Account? {" "}
                            <Link href="/" variant="body2">
                                Click Here to login
                            </Link>
                        </Grid>




                    </Grid>
                </div>
            </Grid>
        </Grid>

    )
}


