import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import backend from '../../app/baseLink'
import { Autocomplete, Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, TextField } from '@mui/material'
import { SelectAllSharp } from '@mui/icons-material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BackspaceIcon from '@mui/icons-material/Backspace';
export default function Account() {

    const user = useSelector((state) => state.login)
    const [userList, setUserList] = useState([])
    const history = useNavigate()
    const [selectedValues, setSelectedValues] = useState({});

    // Function to handle selection change in the autocomplete
    const handleAutocompleteChange = (index, selected) => {
        // console.log(selected,index)
      setSelectedValues(prevState => ({
        ...prevState,
        [index]: selected
      }));
    };
    useEffect(() => {
        if (user.user.userType === 'basic') { history("/") }

        backend.get("api/users/", { id: user.user._id }).then((res) => {
            // console.log(res)
            setUserList(res.data.response);
        })

    }
        , [])
    const approveUser=(id,index) => {
        console.log(selectedValues[index],index)
        let data={
            id:id,
        }
        if(user.user.userType==='root'  ){
            data = {
                ...data, // Spread the existing properties of data
                userType: selectedValues[index]
            };
           
        }
        backend.post("api/users/approval", data).then((res) => {
            console.log(res)
            window.location.reload()
        })
    }

   
    return (
        <div >
            <Grid container spacing={2} padding={2}>
           <Grid item  >
           <h3>Accounts</h3>
           </Grid>
            </Grid>
            <Grid container component={Paper} spacing={2} >
                <Grid item xs={12}>
                    <List>
                        {
                            userList.map((data, index) => {
                                if (data._id === user.user._id) return <></>
                                return (

                                    <>
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar src={process.env.REACT_APP_DOCUMENT_PATH + data.image} alt={data.fname} />

                                            </ListItemAvatar>
                                            <ListItemText primary={data.fname} 
                                            
                                            secondary={
                                                <Grid container spacing={2}>
                                                    <Grid item xs={'auto'}>
                                                   <b>Country-</b> { data.country}
                                                    </Grid>
                                                    <Grid item xs={'auto'}>
                                                    <b>Email-</b> { data.email}
                                                    </Grid>
                                                    <Grid item xs={'auto'}>
                                                    <b>Status-</b> { data.approved?"Approved":"Not Approved"}
                                                    </Grid>
                                                    
                                                </Grid>
                                            }
                                            />

                                            <ListItemSecondaryAction secondary>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                    <Autocomplete
                                                    value={data.userType}
                                                    disabled={(!(user.user.userType === 'root' )) || data.userType === 'root'}
                                                    size='small'
                                                    id="combo-box-demo"
                                                    options={['basic','super']}
                                                    sx={{ width: 300 }}
                                                    onInputChange={(event, newInputValue) => {
                                                        data.userType = newInputValue
                                                        handleAutocompleteChange(index,newInputValue);
                                                      }}
                                                    // onChange={(selected) => handleAutocompleteChange(index, selected)}
                                                    renderInput={(params) => <TextField {...params} label="User Level" />}
                                                />

                                                
                                                    </Grid>
                                                    <Grid item>
                                                    <Button startIcon={<AssignmentTurnedInIcon />} onClick={()=>approveUser(data._id,index)}  >
                                                    Approve
                                                </Button>
                                                <Button color='error' startIcon={<BackspaceIcon />} disabled={ data.approved}  >
                                                    Reject
                                                </Button>
                                                    </Grid>
                                                </Grid>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />


                                    </>
                                )
                            })


                        }

                    </List>
                </Grid>
            </Grid>
        </div>

    )
}
