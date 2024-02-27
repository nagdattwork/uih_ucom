import { Autocomplete, Button, Collapse, Grid, List, ListItem, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
import AprovalFileUpload from './fifdocs/approvalFileUpload';
import CIFileUpload from './fifdocs/ciFileUpload';
export default function FiFunding() {
    //Global Redux
    const dispatch = useDispatch()
    const projectData = useSelector(state => state.projectData)
    const fundingDataT = projectData.fiFunding
    //Feilds
    const [isFunded, setIsFunded] = useState(fundingDataT?.fi_funding_status?.fi_funding_funded ? fundingDataT?.fi_funding_status?.fi_funding_funded : false)
    const [whoFunded, setWhoFunded] = useState(fundingDataT?.fi_funding_status?.fi_funding_funding_person ? fundingDataT?.fi_funding_status?.fi_funding_funding_person : "")
    const [amount, setAmount] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_amount ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_amount : "")
    const [bu, setBU] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu : "")

    useEffect(() => {

        let fundingData = projectData.fiFunding
        fundingData = {
            ...fundingData, ...{
                fi_funding_status: {
                    fi_funding_funded: isFunded,
                    fi_funding_uih_funding_amount: amount,
                    fi_funding_uih_funding_bu: bu,
                    fi_funding_funding_person: whoFunded
                }

            }
        }
        console.log(fundingData)
        dispatch(append({
            fiFunding: fundingData,
        }))
    }, [isFunded, whoFunded, bu, amount])
    return (
        <div>
            <Grid container spacing={2} mt={2} >
                <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Is this project is Funded?</Typography>
                <Switch onClick={() => setIsFunded(!isFunded)} defaultChecked={isFunded} />
            </Grid>

            <Collapse in={isFunded}>
                <List component={Paper}>
                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                            <Grid item xs={2}>
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Who is Funded</Typography>

                            </Grid>
                            <Grid item xs={4}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={whoFunded}
                                options={["UIH", "UII", "OTHERS"]}
                                size='small'
                                onInputChange={(event, newInputValue) => {
                                    setWhoFunded(newInputValue);
                                }}
                               
                                renderInput={(params) => <TextField {...params} label="Funding Company" />}
                            />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>If UIH/ UII funded</Typography>

                            </Grid>                   
                             <Grid item xs={2}>

                                <OutlinedInput placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} size='small' style={{ marginLeft: "12px" }} />
                            </Grid>
                            <Grid item xs={2}>
                                <OutlinedInput placeholder='BU' value={bu} onChange={(e) => setBU(e.target.value)} size='small' style={{ marginLeft: "12px" }} />
                            </Grid>
                           
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                        <Grid item xs={2}>
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Approval Document</Typography>

                            </Grid>
                        <Grid item xs={4}>
                                <AprovalFileUpload />

                            </Grid>
                            <Grid item xs={2}>
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Customer Invoce</Typography>

                            </Grid>
                        <Grid item xs={2}>
                                {/* <AprovalFileUpload /> */}
                                    <CIFileUpload/>
                            </Grid>
                        </Grid>
                        

                    </ListItem>

                  
                </List>
            </Collapse>
        </div>
    )
}
