// FileUpload.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, CircularProgress, Collapse, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { append } from '../../features/projectData/projectData';
import { appendEdits } from '../../features/projectData/editData';
import { Download } from '@mui/icons-material';
import backend from '../../../app/baseLink';
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

const EditDAFileUpload = () => {
    const data=useSelector(state=>state.editData)
    const docs=(data.documents)
    const [files, setFiles] = useState(docs?.draft_agreement?[...docs?.draft_agreement]:[]);
    const [loading, setLoading] = useState(false);
    const[visible,setVisible]=useState(false)
    const [uploadedFiles,setUploadedFiles]=useState([])
    const prevData=data.prevDocuments

    let temp=(prevData?.draft_agreement?.split(","))
    temp=temp?.filter((file)=>{return file!="" && file!=undefined && file !='undefined'} )
    const [prevDA,setPrevDA]=useState(temp?temp:[])
    const dispatch=useDispatch()
   
    useEffect(()=>{
        
        let documentsData=data.documents
        documentsData={
            ...documentsData,
           ... {
            draft_agreement:uploadedFiles.map((data) => {console.log(data); return (data) })
            }
        }
        let preDocumentsData=data.prevDocuments
        preDocumentsData={
            ...preDocumentsData,...{
                draft_agreement:prevDA.toString()
            }
        }
        
        dispatch(appendEdits({
            documents:documentsData,
            prevDocuments:preDocumentsData
        }))


    },[uploadedFiles,prevDA])


    const [details,setDetails] = useState(data?.documentsDetails?.da_ag_type?data?.documentsDetails?.da_ag_type:"")
    const [detailsOwner,setDetailsOwner] = useState(data?.documentsDetails?.da_ag_owner?data?.documentsDetails?.da_ag_owner:"")

    useEffect(()=>{
        let documentsData=data.documentsDetails
        documentsData={...documentsData,
            ...{
                da_ag_type:details,
                da_ag_owner:detailsOwner
            }
        }
        // console.log(documentsData)
        dispatch(appendEdits({
            documentsDetails:documentsData
        }))
    
    
    },[details,detailsOwner])
    useEffect(() => {
       const t=
       files.filter((ele)=>{
        return ele?.uploaded_path
       })
       setUploadedFiles(t)
      
    }, [files])

   
    const handleFileChange = (e) => {

        const filesToAdd = files

        Array.from(e.target.files).map((ele) => {
            let flag = false
            filesToAdd.forEach((e) => {
                if (e.name === ele.name) {
                    flag = true

                }
            })
            if (!flag)
                filesToAdd.push(ele)
        })

        setFiles([...filesToAdd]);
    };

    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        files.forEach(file => {
            if (!file?.uploaded_path)
                formData.append('files', file);
        });


        try {
            const response = await backend.post('api/projects/document/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            response.data.forEach(element => {
                files.forEach((temp) => {
                    if (element.originalname === temp.name) {
                        temp.uploaded_path = element.path

                    }
                })
            });
            setFiles([...files])
           
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (filename, file) => {
        if (!filename) alert("file not uploaded")
        try {
            await backend.delete(`test/delete/${encodeURIComponent(filename)}`);
            delete file.uploaded_path

            const afterDelete = [...files]
            setFiles(afterDelete)

        } catch (error) {
            console.error(error);
        }

    };

    const handleDeleteFrontend = (indexT) => {
        const tem = files.filter((file, index) => {
            return index != indexT
        })
        setFiles(tem)
    }
    const downloadFiles=(urlGlob)=>{
        // url=process.env.REACT_APP_DOCUMENT_PATH+url;
        // window.open(url,"_blank")

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
    const handleDeletePrevFiles = async (filename,indexT) => {
        if (!filename) alert("file not uploaded")
        try {
            await backend.delete(`test/delete/${encodeURIComponent(filename)}`);
            // oldApprovalFiles(newArr);

        } catch (error) {
            console.error(error);
        }
        setPrevDA((prevItems) => prevItems.filter((_, index) => index !== indexT));          

    }
    return (
        <div>
            {/* <input type="file" multiple onChange={handleFileChange} /> */}
           
            <Grid container spacing={2} >
            <Grid item xs={5}>
                    <OutlinedInput size='small' placeholder='Agreement Type'
                    
                    value={details}
                    onChange={(e)=>setDetails(e.target.value)}
                    fullWidth/>
                </Grid>
                <Grid item xs={5}>
                    <OutlinedInput size='small' placeholder='Document Owner' 
                    
                    
                    value={detailsOwner}
                    onChange={(e)=>setDetailsOwner(e.target.value)}
                    fullWidth/>
                </Grid>
                <Grid item>


                    <ButtonGroup variant="contained" aria-label="Basic button group">
                       <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                        >
                            <AttachFileTwoToneIcon/>
                            <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
                        </Button>
                         <Button variant="contained" color="primary" onClick={handleUpload} disabled={files.length === 0 || loading}>
                            {loading ? <CircularProgress size={24} /> : <CloudUploadTwoToneIcon />}
                        </Button>
                        <Button onClick={()=>setVisible(!visible)}>
                           {
                            visible?<VisibilityOffTwoToneIcon/>: <VisibilityTwoToneIcon/>
                           }
                            
                            </Button>
                    </ButtonGroup>

                </Grid>


            </Grid>
           <Grid container spacing={2} style={{marginTop:"5px"}}>
          <Grid item xs={12}>
          <Collapse in={visible} component={Paper}>
          <Typography style={{marginLeft:"10px"}}>
                <b >Previous Files</b>
            </Typography>
            <List> {
                           
                            prevDA.map((file,index)=>{

                             return ( 
                                 <ListItem>
                                    <ListItemText primary= {file?.split("/")[1]?.split(".")?.splice(1)?.join(".")}/>
                                 <ListItemSecondaryAction>
                                 <IconButton color='info' onClick={()=>{downloadFiles(file)}}>
                                        <Download />
                                    </IconButton>
                                    <IconButton color='error' onClick={()=>{handleDeletePrevFiles(file,index)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              )
                            }
                            )
                            
                           } </List>
           <Typography style={{marginLeft:"10px"}}>
                <b >Current Files</b>
            </Typography>
           <List>
                {files.map((file, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={file.name} />
                        <ListItemSecondaryAction>
                            <IconButton color='error' edge="end" aria-label="delete" disabled={file?.uploaded_path}
                                onClick={() => handleDeleteFrontend(index)}
                            >
                                <DeleteIcon />
                            </IconButton>

                            {file?.uploaded_path &&
                                (<IconButton edge="end" color='primary' aria-label="delete" onClick={() => handleDelete(file?.uploaded_path, file)}>
                                    <CloudOffIcon />
                                </IconButton>)}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List></Collapse>
          </Grid>
           </Grid>
        </div>
    );
};

export default EditDAFileUpload;
