import { Autocomplete, Grid, ListItem, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { append } from '../features/projectData/projectData';
import { appendEdits } from '../features/projectData/editData';

export default function ProjectDetails2() {
    const [stage,setStage]=useState(["Draft","On-going","Completed","Terminated"])
    const data=useSelector(state=>state.editData)
    const pr_data=data.projectDetails

    const [stagevalue,setStageValue]=useState(pr_data?.current_stage?pr_data?.current_stage:"")

    const [expDate,setExpDate]=useState(pr_data?.exp_date?pr_data?.exp_date:"")
    const [startDate,setStartDate]=useState(pr_data?.act_start_date?pr_data?.act_start_date:"")
    const [endDate,setEndDate]=useState(pr_data?.end_date?pr_data?.end_date:"")
    const dispatch=useDispatch()
    useEffect(()=>{
        let projectDetails=data.projectDetails
        projectDetails={
            ...projectDetails,...{
                current_stage:stagevalue,
                exp_date:expDate,
                act_start_date:startDate,
                end_date:endDate

            }
        }
        dispatch(appendEdits({
            projectDetails:projectDetails
        }))
    },[stagevalue,expDate,startDate,endDate])
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
                                value={stagevalue}
                                size='small'
                                onInputChange={(event, newInputValue) => {
                                        setStageValue(newInputValue)
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
                           <OutlinedInput type='date' value={expDate} onChange={(e)=>setExpDate(e.target.value)} size='small' fullWidth/>
                        </Grid>
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1' component="h2" style={{ fontWeight: "bold" }}> Actual Start Date</Typography>
                           <OutlinedInput type='date'  value={startDate} onChange={(e)=>setStartDate(e.target.value)} size='small' fullWidth/>
                        </Grid>
                        <Grid item xs={4}  >
                        <Typography variant='subtitle1' component="h2" style={{ fontWeight: "bold" }}> End Date</Typography>
                           <OutlinedInput type='date' value={endDate} onChange={(e)=>setEndDate(e.target.value)} size='small' fullWidth/>
                        </Grid>
                   
                </Grid>
        </div>
    )
}
