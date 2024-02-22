import { Autocomplete, Button, Collapse, Grid, List, ListItem, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
export default function FiFunding() {

    const [isFunded, setIsFunded] = useState(false)

    useEffect(() => {
        console.log(isFunded)
    }, [isFunded])
    return (
        <div>
            <Grid container spacing={2} mt={2} >
                <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Is this project is Funded?</Typography>
                <Switch onClick={() => setIsFunded(!isFunded)} />
            </Grid>

            <Collapse in={isFunded}>
                <List component={Paper}>
                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Who is Funded</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={["UIH", "OTHERS"]}
                                size='small'
                                sx={{ width: 300, ml: 2 }}
                                renderInput={(params) => <TextField {...params} label="Funding Company" />}
                            />
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>If UIH/ UII funded</Typography>
                          
                            <OutlinedInput placeholder='Amount' size='small' style={{marginLeft:"12px"}}/>
                          
                            <OutlinedInput placeholder='BU' size='small' style={{marginLeft:"12px"}}/>
                            <Button variant='contained' style={{marginLeft:"12px"}}>Select Approval File</Button>
                            
                            <Button variant='contained' style={{marginLeft:"12px"}}>Selected File</Button>
                            <Button variant='contained' style={{marginLeft:"12px"}}>C</Button>

                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Customer Invoice</Typography>
                          
                           
                            <Button variant='contained' style={{marginLeft:"12px"}}>Select  File</Button>
                            
                            <Button variant='contained' style={{marginLeft:"12px"}}>Selected File</Button>
                            <Button variant='contained' style={{marginLeft:"12px"}}>C</Button>

                        </Grid>
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}
