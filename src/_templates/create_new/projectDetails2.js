import { Autocomplete, Grid, ListItem, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function ProjectDetails2() {
    const [stage,setStage]=useState(["Draft","On-going","Completed","Terminated"])
    return (
        <div>

            <Grid container spacing={2} style={{ marginBottom: "10px" }}>

                <Grid item>
                   
                        <Grid container spacing={2} mt={2} >
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Current Stage</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={stage}
                                size='small'
                                onInputChange={(event, newInputValue) => {

                                }}
                                sx={{ width: 300, ml: 2 }}
                                renderInput={(params) => <TextField {...params} label="Stage" />}
                            />
                        </Grid>
                   
                </Grid>

                
            </Grid>

            <Grid container spacing={2}>
                   
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1' component="h2" style={{ fontWeight: "bold" }}> Expected Start Date</Typography>
                           <OutlinedInput type='date' size='small' fullWidth/>
                        </Grid>
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1' component="h2" style={{ fontWeight: "bold" }}> Actual Start Date</Typography>
                           <OutlinedInput type='date' size='small' fullWidth/>
                        </Grid>
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1' component="h2" style={{ fontWeight: "bold" }}> End Date</Typography>
                           <OutlinedInput type='date' size='small' fullWidth/>
                        </Grid>
                   
                </Grid>
        </div>
    )
}
