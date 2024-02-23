import { Autocomplete, Grid, ListItem, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { append } from '../features/projectData/projectData'

export default function ProjectDetails2() {
    const projectData=useSelector((state)=>state.projectData)

    const [stage,setStage]=useState(["Draft","On-going","Completed","Terminated"])
    const [currentStage,setCurrentStage]=useState(projectData?.projectDetails?.current_stage?projectData?.projectDetails?.current_stage:"")
    const [expStartDate,setExpStartDate]=useState(projectData?.projectDetails?.exp_date?projectData?.projectDetails?.exp_date:"")
    const [startDate,setStartDate]=useState(projectData?.projectDetails?.act_start_date?projectData?.projectDetails?.act_start_date:"")
    const [endDate,setEndDate]=useState(projectData?.projectDetails?.end_date?projectData?.projectDetails?.end_date:"")
    const dispatch=useDispatch()

    useEffect(()=>{
        let projectDetails2=projectData.projectDetails
        projectDetails2={
            ...projectDetails2,...{
                current_stage:currentStage,
                exp_date:expStartDate,
                act_start_date:startDate,
                end_date:endDate
            }
        }
        dispatch(append({
            projectDetails:projectDetails2
        }))
        console.log(currentStage,expStartDate,startDate,endDate)
    },[currentStage,expStartDate,startDate,endDate])

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
                                value={currentStage}
                                
                                size='small'
                                onInputChange={(event, newInputValue) => {
                                    setCurrentStage(newInputValue)
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
                           <OutlinedInput type='date' size='small' fullWidth value={expStartDate} onChange={(e)=>setExpStartDate(e.target.value)}/>
                        </Grid>
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1'  component="h2" style={{ fontWeight: "bold" }}> Actual Start Date</Typography>
                           <OutlinedInput type='date' size='small' value={startDate} onChange={(e)=>setStartDate(e.target.value)} fullWidth/>
                        </Grid>
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1' component="h2" style={{ fontWeight: "bold" }}> End Date</Typography>
                           <OutlinedInput type='date' size='small'  value={endDate} onChange={(e)=>setEndDate(e.target.value)} fullWidth/>
                        </Grid>
                   
                </Grid>
        </div>
    )
}
