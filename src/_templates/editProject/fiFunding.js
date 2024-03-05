import { Alert, Autocomplete, Button, Collapse, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput, Paper, Stack, TextField, Typography, backdropClasses } from '@mui/material'
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
import { Sync } from '@mui/icons-material';
export default function FiFunding() {
    //Global Redux
    const dispatch = useDispatch()
    const projectData = useSelector(state => state.editData)
    const fundingDataT = projectData.fiFunding
    //Feilds
    const [isFunded, setIsFunded] = useState(fundingDataT?.fi_funding_status?.fi_funding_funded ? fundingDataT?.fi_funding_status?.fi_funding_funded : false)
    const [whoFunded, setWhoFunded] = useState(fundingDataT?.fi_funding_status?.fi_funding_funding_person ? fundingDataT?.fi_funding_status?.fi_funding_funding_person : "")
    const [amount, setAmount] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_amount ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_amount : "")
    const [bu, setBU] = useState(fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu ? fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu : "")


    let temp = (fundingDataT?.fi_funding_status?.fi_funding_uih_funding_bu_aprroval?.split(","))
    temp = temp?.filter((file) => { return file != "" && file != "undefined" })



    const [oldApprovalFiles, setOldApprovalFiles] = useState(temp ? temp : [])


    let temp2 = (fundingDataT?.fi_funding_status?.fi_funding_customer_invoice?.split(","))
    temp2 = temp2?.filter((file) => { return file != "" && file != "undefined" })

    const [oldCustomerInvoices, setOldCustomerInvoices] = useState(temp2 ? temp2 : [])
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
        dispatch(appendEdits({
            fiFunding: fundingData,
        }))
    }, [isFunded, whoFunded, bu, amount, oldApprovalFiles, oldCustomerInvoices])

    const downloadFiles = (urlGlob) => {
        // url = process.env.REACT_APP_DOCUMENT_PATH + url;

        console.log(urlGlob,urlGlob.split("/")[1].split(".").splice(-2).join("."))
        urlGlob=urlGlob.replaceAll("\\","/")
        // url=url.replaceAll("","\\\\")

        // window.open(url, "_self")

        try {
            backend.post('/download', { url:urlGlob }, {
                responseType: 'blob'
            }).then((response) => {
                // Create a URL for the blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                // Create a link element
                const link = document.createElement('a');
                link.href = url;
                console.log(urlGlob.split("/")[1].split(".").splice(-2).join("."))
                link.setAttribute('download',urlGlob.split("/")[1].split(".").splice(-2).join(".")); // Modify filename as needed
                // Append the link to the body
                document.body.appendChild(link);
                // Click the link to initiate the download
                link.click();
                // Clean up
                link.parentNode.removeChild(link);

            })


        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }
    const handleDeleteApprovalFile = async (filename, indexToDelete) => {
        if (!filename) alert("file not uploaded")
        try {
            await backend.delete(`test/delete/${encodeURIComponent(filename)}`);
            // oldApprovalFiles(newArr);

        } catch (error) {
            console.error(error);
        }
        setOldApprovalFiles((prevItems) => prevItems.filter((_, index) => index !== indexToDelete));


    };

    const handleDeleteCIFile = async (filename, indexToDelete) => {
        if (!filename) alert("file not uploaded")
        try {
            await backend.delete(`test/delete/${encodeURIComponent(filename)}`);
            // oldApprovalFiles(newArr);

        } catch (error) {
            console.error(error);
            setOldCustomerInvoices((prevItems) => prevItems.filter((_, index) => index !== indexToDelete));

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
                            <Grid item xs={4}>
                                <EditCIFileUpload />
                            </Grid>
                        </Grid>


                    </ListItem>


                </List>
            </Collapse>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <h4>Previously Uploaded Approval Files</h4>
                    {oldApprovalFiles.map((data, index) => {
                        
                        
                        return(
                        <ListItem key={index}  >

                            <Stack sx={{ width: '100%' }} direction={'row'} >
                                <Alert icon={false} severity='info'
                                    sx={{ width: '100%' }}
                                    action={
                                        <>
                                            {/* <a href={process.env.REACT_APP_DOCUMENT_PATH + data} download>
                                                <DownloadIcon />
                                                </a> */}
                                            <IconButton color='info' onClick={() => { downloadFiles(data) }}>
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton color='error' onClick={() => handleDeleteApprovalFile(data, index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }>
                                     {data?.split("/")[1]?.split(".")?.splice(-2)?.join(".")}
                                </Alert>
                            </Stack>
                        </ListItem>
                    )})}
                </Grid>
                <Grid item xs={6}>
                    <h4>Previously Uploaded Customer Invoice Files Files</h4>
                    {oldCustomerInvoices.map((data, index) => {
                        // console.log(data,"-<Original, Copy->",data?.split("/")[1]?.split(".")?.splice(-2)?.join("."))
                        return (
                        <ListItem key={index}  >

                            <Stack sx={{ width: '100%' }} direction={'row'} >
                                <Alert icon={false} severity='info'
                                    sx={{ width: '100%' }}
                                    action={
                                        <>
                                            <IconButton color='info' onClick={() => { downloadFiles(data) }}>
                                                <DownloadIcon />
                                            </IconButton>
                                            <IconButton color='error' onClick={() => handleDeleteCIFile(data, index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }>
                                    {data?.split("/")[1]?.split(".")?.splice(-2)?.join(".")
                                   
                                    }
                                </Alert>
                            </Stack>
                        </ListItem>
                    )})}
                </Grid>



            </Grid>
        </div>
    )
}
