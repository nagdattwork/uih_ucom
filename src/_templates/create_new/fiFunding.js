import { Autocomplete, Button, Collapse, Grid, List, ListItem, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
export default function FiFunding() {
    //Global Redux
    const dispatch=useDispatch()
    const projectData=useSelector(state=>state.projectData)
    const fundingDataT=projectData.fiFunding
    //Feilds
    const [isFunded, setIsFunded] = useState(fundingDataT?.fi_funding_status?fundingDataT?.fi_funding_status:false)
    const [whoFunded,setWhoFunded]=useState(fundingDataT?.fi_who_funded?fundingDataT?.fi_who_funded:"")
    const [amount,setAmount]=useState(fundingDataT?.fi_uih_uii_funded_amount?fundingDataT?.fi_uih_uii_funded_amount:"")
    const [bu,setBU]=useState(fundingDataT?.fi_uih_uii_funded_bu?fundingDataT?.fi_uih_uii_funded_bu:"")

    useEffect(() => {

        let fundingData=projectData.fiFunding
        fundingData={...fundingData,...{
            fi_funding_status:isFunded,
            fi_uih_uii_funded_amount:amount,
            fi_uih_uii_funded_bu:bu,
            fi_who_funded:whoFunded
           
          }}
        console.log(fundingData)
          dispatch(append({
            fiFunding:fundingData,
          }))
    }, [isFunded,whoFunded,bu,amount])
    return (
        <div>
            <Grid container spacing={2} mt={2} >
                <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Is this project is Funded?</Typography>
                <Switch onClick={() => setIsFunded(!isFunded)} defaultChecked ={isFunded} />
            </Grid>

            <Collapse in={isFunded}>
                <List component={Paper}>
                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Who is Funded</Typography>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={whoFunded}
                                options={["UIH", "OTHERS"]}
                                size='small'
                                onInputChange={(event, newInputValue) => {
                                    setWhoFunded(newInputValue);
                                  }}
                                sx={{ width: 300, ml: 2 }}
                                renderInput={(params) => <TextField {...params} label="Funding Company" />}
                            />
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid container spacing={2} mt={2} >
                            <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>If UIH/ UII funded</Typography>
                          
                            <OutlinedInput placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} size='small' style={{marginLeft:"12px"}}/>
                          
                            <OutlinedInput placeholder='BU'  value={bu} onChange={(e)=>setBU(e.target.value)} size='small' style={{marginLeft:"12px"}}/>
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
