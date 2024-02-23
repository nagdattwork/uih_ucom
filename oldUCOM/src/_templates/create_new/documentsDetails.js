import { Alert, Backdrop, Button, CircularProgress, Collapse, Grid, IconButton, OutlinedInput, Paper, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../features/projectData/projectData';
import backend from '../../app/baseLink';

export default function DocumentsDetails() {
    //backdrops

    const [fileBackdrop, setFileBackdrop] = React.useState(false)
    //const global data
    const dispatch = useDispatch()
    //PDD Files
    const [selectedPDDFiles, setSelectedPDDFiles] = React.useState([]);
    const [pddPath, setPDDPath] = React.useState("")
    const [openPDD, setOpenPDD] = React.useState(false);

    const handleFileInputChangePDD = (event) => {
        setSelectedPDDFiles([...selectedPDDFiles, ...event.target.files]);

    };
    const handleFileDeletePDD = (index) => {
        const updatedFiles = [...selectedPDDFiles];
        updatedFiles.splice(index, 1);
        setSelectedPDDFiles(updatedFiles);
    };

    //DA Files
    const [selectedDAFiles, setSelectedDAFiles] = React.useState([]);
    const [daPath, setDAPath] = useState("")
    const [openDA, setOpenDA] = React.useState(false);

    const handleFileInputChangeDA = (event) => {
        setSelectedDAFiles([...selectedDAFiles, ...event.target.files]);
    };
    const handleFileDeleteDA = (index) => {
        const updatedFiles = [...selectedDAFiles];
        updatedFiles.splice(index, 1);
        setSelectedDAFiles(updatedFiles);
    };


    //SA Files
    const [selectedSAFiles, setSelectedSAFiles] = React.useState([]);
    const [sapath, setSAPath] = useState("")
    const [openSA, setOpenSA] = React.useState(false);

    const handleFileInputChangeSA = (event) => {
        setSelectedSAFiles([...selectedSAFiles, ...event.target.files]);
    };
    const handleFileDeleteSA = (index) => {
        const updatedFiles = [...selectedSAFiles];
        updatedFiles.splice(index, 1);
        setSelectedSAFiles(updatedFiles);
    };

    //Others Files
    const [selectedOthersFiles, setSelectedOthersFiles] = React.useState([]);
    const [othersPath, setOthersPath] = useState("")
    const [openOthers, setOpenOthers] = React.useState(false);

    const handleFileInputChangeOthers = (event) => {
        setSelectedOthersFiles([...selectedOthersFiles, ...event.target.files]);
    };
    const handleFileDeleteOthers = (index) => {
        const updatedFiles = [...selectedOthersFiles];
        updatedFiles.splice(index, 1);
        setSelectedOthersFiles(updatedFiles);
    };

    //NOtification Content
    const [openNotification, setOpenNotification] = useState(false)
    const [typeNotification, setTypeNotification] = useState('success')
    const [contentNotification, setContentNotification] = useState("")

    const handlecloseNotification = () => {
        setOpenNotification(false)
    }

    //Upload Files

    const uploadPDdDocument = () => {
        setFileBackdrop(true)
        const formData = new FormData()

        selectedPDDFiles.forEach((file) => {
            console.log(file)
            formData.append("files[]", file)

        })
        console.log(formData)
        backend.post('api/projects/document/upload/', formData).then((res) => {
            console.log(res.data.data.join())

            setPDDPath(res.data.data.join())

            setTypeNotification('success')
            setContentNotification("File Uploaded successfully")
            setOpenNotification(true)
            setFileBackdrop(false)

        }).catch(err => setFileBackdrop(false))
    }

    const uploadDADocument = () => {
        setFileBackdrop(true)
        const formData = new FormData()

        selectedDAFiles.forEach((file) => {
            console.log(file)
            formData.append("files[]", file)

        })
        console.log(formData)
        backend.post('api/projects/document/upload/', formData).then((res) => {
            console.log(res.data.data.join())

            setDAPath(res.data.data.join())

            setTypeNotification('success')
            setContentNotification("File Uploaded successfully")
            setOpenNotification(true)
            setFileBackdrop(false)
        }).catch(err => setFileBackdrop(false))
    }


    const uploadSADocument = () => {
        setFileBackdrop(true)
        const formData = new FormData()

        selectedSAFiles.forEach((file) => {
            console.log(file)
            formData.append("files[]", file)

        })
        console.log(formData)
        backend.post('api/projects/document/upload/', formData).then((res) => {

            setSAPath(res.data.data.join())

            setTypeNotification('success')
            setContentNotification("File Uploaded successfully")
            setOpenNotification(true)
            setFileBackdrop(false)
        }).catch(err => setFileBackdrop(false))

    }

    const uploadOthersDocument = () => {
        setFileBackdrop(true)
        const formData = new FormData()

        selectedOthersFiles.forEach((file) => {
            console.log(file)
            formData.append("files[]", file)

        })
        console.log(formData)
        backend.post('api/projects/document/upload/', formData).then((res) => {

            setOthersPath(res.data.data.join())

            setTypeNotification('success')
            setContentNotification("File Uploaded successfully")
            setOpenNotification(true)
            setFileBackdrop(false)
        })
            .catch(err => setFileBackdrop(false))
    }


    useEffect(() => {
        dispatch(append({
            documents: {
                pdd_document: pddPath,
                draft_agreement: daPath,
                signed_agreement: sapath,
                others: othersPath
            }
        }))
        // console.log(selectedPDDFiles)


    }, [pddPath, daPath, sapath, othersPath])

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={fileBackdrop}
            >
                <CircularProgress style={{ marginRight: "5px" }} color="inherit" />
                Uploading Files
            </Backdrop>
            <h4>Project Description Document</h4>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <OutlinedInput fullWidth size='small' placeholder='Details' />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth

                    >
                        select Document PDD
                        <VisuallyHiddenInput onChange={handleFileInputChangePDD} multiple type="file" />
                    </Button>
                </Grid>

                <Grid item xs={4} fullWidth>
                    <Button variant="contained" startIcon={<GetAppIcon />} fullWidth onClick={() => setOpenPDD(!openPDD)}>Selected Files ({selectedPDDFiles.length} Files)</Button>
                    <Collapse in={openPDD}>
                        <div>

                            <List component={Paper}>
                                {selectedPDDFiles.map((file, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={file.name} />
                                        <IconButton color='success' variant="outlined" size="small" href={URL.createObjectURL(file)} download>
                                            <GetAppIcon />
                                        </IconButton>
                                        <IconButton color='error' variant="outlined" size="small" onClick={() => handleFileDeletePDD(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Collapse>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        onClick={() => uploadPDdDocument()}
                    >
                        <CloudUploadIcon />
                    </Button>
                </Grid>
            </Grid>
            <h4>Draft Agreement</h4>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <OutlinedInput fullWidth size='small' placeholder='Agreement Type' />
                </Grid>
                <Grid item xs={2}>
                    <OutlinedInput fullWidth size='small' placeholder='Document Owner' />
                </Grid>

                <Grid item xs={3}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Document DA
                        <VisuallyHiddenInput onChange={handleFileInputChangeDA} multiple type="file" />
                    </Button>
                </Grid>

                <Grid item xs={4} fullWidth>
                    <Button variant="contained" startIcon={<GetAppIcon />} fullWidth onClick={() => setOpenDA(!openDA)}>Selected Files ({selectedDAFiles.length} Files)</Button>
                    <Collapse in={openDA}>
                        <div>

                            <List component={Paper}>
                                {selectedDAFiles.map((file, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={file.name} />
                                        <IconButton color='success' variant="outlined" size="small" href={URL.createObjectURL(file)} download>
                                            <GetAppIcon />
                                        </IconButton>
                                        <IconButton color='error' variant="outlined" size="small" onClick={() => handleFileDeleteDA(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Collapse>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        onClick={() => uploadDADocument()}
                    >
                        <CloudUploadIcon />
                    </Button>
                </Grid>
            </Grid>
            <h4>Signed Agreement</h4>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <OutlinedInput fullWidth size="small" placeholder='Details' />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Document sA
                        <VisuallyHiddenInput onChange={handleFileInputChangeSA} multiple type="file" />
                    </Button>
                </Grid>

                <Grid item xs={4} fullWidth>
                    <Button variant="contained" startIcon={<GetAppIcon />} fullWidth onClick={() => setOpenSA(!openSA)}>Selected Files ({selectedSAFiles.length} Files)</Button>
                    <Collapse in={openSA}>
                        <div>

                            <List component={Paper}>
                                {selectedSAFiles.map((file, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={file.name} />
                                        <IconButton color='success' variant="outlined" size="small" href={URL.createObjectURL(file)} download>
                                            <GetAppIcon />
                                        </IconButton>
                                        <IconButton color='error' variant="outlined" size="small" onClick={() => handleFileDeleteSA(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Collapse>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        onClick={() => uploadSADocument()}
                    >
                        <CloudUploadIcon />
                    </Button>
                </Grid>
            </Grid>
            <h4>Others (ie. Draft Manuscript, abstracts, articles, IPR, legal/compliance etc
            </h4>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <OutlinedInput fullWidth size="small" placeholder='Details' />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Document Others
                        <VisuallyHiddenInput onChange={handleFileInputChangeOthers} multiple type="file" />
                    </Button>
                </Grid>

                <Grid item xs={4} fullWidth>
                    <Button variant="contained" startIcon={<GetAppIcon />} fullWidth onClick={() => setOpenOthers(!openOthers)}>Selected Files ({selectedOthersFiles.length} Files)</Button>
                    <Collapse in={openOthers}>
                        <div>

                            <List component={Paper}>
                                {selectedOthersFiles.map((file, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={file.name} />
                                        <IconButton color='success' variant="outlined" size="small" href={URL.createObjectURL(file)} download>
                                            <GetAppIcon />
                                        </IconButton>
                                        <IconButton color='error' variant="outlined" size="small" onClick={() => handleFileDeleteOthers(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Collapse>
                </Grid>
                <Grid item xs={1}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        onClick={() => uploadOthersDocument()}
                    >
                        <CloudUploadIcon />
                    </Button>
                </Grid>
            </Grid>

            <Notification open={openNotification} handleClose={handlecloseNotification} type={typeNotification} content={contentNotification} />
        </div>
    )
}


//NOtifications

const Notification = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={2000} onClose={props.handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            key={'bottom' + 'right'}>
            <Alert
                onClose={props.handleClose}
                severity={props.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {props.content}
            </Alert>
        </Snackbar>
    )
}