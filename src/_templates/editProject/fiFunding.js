import { Autocomplete, Button, Collapse, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput, Paper, TextField, Typography, backdropClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { appendEdits } from '../features/projectData/editData';
import EditAprovalFileUpload from './editfifdocs/editApprovalFileUpload';
import EditCIFileUpload from './editfifdocs/editCIFileUpload';
import backend from '../../app/baseLink';
export default function FiFunding() {
    //Global Redux
    const dispatch = useDispatch()
    const projectData = useSelector(state => state.editData)
    const fundingDataT = projectData.fiFunding
    console.log(fundingDataT)
    //Feilds
    const [isFunded, setIsFunded] = useState(fundingDataT?.fi_funding_status?.fi_funding_funded ? fundingDataT?.fi_funding_status?.fi_funding_funded : false)
    const [whoFunded, setWhoFunded] = useState(fundingDataT?.fi_funding_status?.fi_funding_funding_person ? fundingDataT?.fi_funding_status?.fi_funding_funding_person : "")
    const [amount, setAmount] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_amount ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_amount : "")
    const [bu, setBU] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu : "")
    const [oldApprovalFiles, setOldApprovalFiles] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu_aprroval ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu_aprroval.split(",") : [])
    const [oldCustomerInvoices, setOldCustomerInvoices] = useState(fundingDataT?.fi_funding_status?.fi_funding_customer_invoice ? fundingDataT?.fi_funding_status?.fi_funding_customer_invoice.split(",") : [])
    useEffect(() => {

        let fundingData = projectData.fiFunding
        fundingData = {
            ...fundingData, ...{
                fi_funding_status: {
                    fi_funding_funded: isFunded,
                    fi_funding_uih_funding_amount: amount,
                    fi_funding_uih_funding_bu: bu,
                    fi_funding_funding_person: whoFunded,
                    fi_funding_uih_funding_bu_aprroval: oldApprovalFiles?.toString(),
                    fi_funding_customer_invoice: oldCustomerInvoices?.toString()

                }

            }
        }
        console.log(fundingData)
        dispatch(appendEdits({
            fiFunding: fundingData,
        }))
    }, [isFunded, whoFunded, bu, amount,oldApprovalFiles,oldCustomerInvoices])

    const downloadFiles=(url)=>{
        url=process.env.REACT_APP_DOCUMENT_PATH+url;
        window.open(url,"_blank")
    }
    const handleDeleteApprovalFile = async (filename, indexToDelete) => {
        if (!filename) alert("file not uploaded")
        try {
            await backend.delete(`test/delete/${encodeURIComponent(filename)}`);
            setOldApprovalFiles((prevItems) => prevItems.filter((_, index) => index !== indexToDelete));          
              console.log(oldApprovalFiles)
            // oldApprovalFiles(newArr);

        } catch (error) {
            console.error(error);
        }

    };

    const handleDeleteCIFile = async (filename, indexToDelete) => {
        if (!filename) alert("file not uploaded")
        try {
            await backend.delete(`test/delete/${encodeURIComponent(filename)}`);
            setOldCustomerInvoices((prevItems) => prevItems.filter((_, index) => index !== indexToDelete));          
              console.log(oldApprovalFiles)
            // oldApprovalFiles(newArr);

        } catch (error) {
            console.error(error);
        }

    };

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

                                <EditAprovalFileUpload />

                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant='subtitle1' ml={2} component="h2" style={{ fontWeight: "bold" }}>Customer Invoice</Typography>

                            </Grid>
                            <Grid item xs={2}>
                                {/* <AprovalFileUpload /> */}
                                <EditCIFileUpload />
                            </Grid>
                        </Grid>


                    </ListItem>


                </List>
            </Collapse>
            <Grid container>

                <Grid item xs={6}>
                    <h4>Previously Uploaded Approval Files</h4>
                    <List>
                        {
                            oldApprovalFiles.map((data, index) => {

                                return (
                                    <ListItem key={index}>
                                        <ListItemText primary={data} />
                                        <ListItemSecondaryAction>
                                        <IconButton color='info' onClick={()=>{downloadFiles(data)}}>
                                                <DownloadIcon  />
                                            </IconButton>

                                            <IconButton color='error' onClick={(()=>handleDeleteApprovalFile(data,index))}>
                                                <DeleteIcon  />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )

                            })
                        }
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <h4>Previously Uploaded Customer Invoice Files Files</h4>
                    <List>
                        {
                            oldCustomerInvoices.map((data, index) => {

                                return (
                                    <ListItem key={index}>
                                        <ListItemText primary={data} />
                                        <ListItemSecondaryAction>
                                            <IconButton color='info' onClick={()=>{downloadFiles(data)}}>
                                                <DownloadIcon  />
                                            </IconButton>

                                            <IconButton color='error' onClick={(()=>handleDeleteCIFile(data,index))}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )

                            })
                        }
                    </List>
                </Grid>



            </Grid>
        </div>
    )
}