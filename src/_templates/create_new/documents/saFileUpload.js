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

const SAFileUpload = () => {
    const data=useSelector(state=>state.projectData)
    const docs=(data.documents)
    const [files, setFiles] = useState(docs?.signed_agreement?[...docs?.signed_agreement]:[]);
    const [loading, setLoading] = useState(false);
    const[visible,setVisible]=useState(false)
    const [uploadedFiles,setUploadedFiles]=useState([])
    const dispatch=useDispatch()
   
    useEffect(()=>{
        
        let documentsData=data.documents
        documentsData={
            ...documentsData,
           ... {
            signed_agreement:uploadedFiles.map((data) => {return (data) })
            }
        }

        
        dispatch(append({
            documents:documentsData
        }))


    },[uploadedFiles])
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
            const response = await axios.post(process.env.REACT_APP_LINK+'api/projects/document/upload/', formData, {
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
            await axios.delete(process.env.REACT_APP_LINK+`test/delete/${encodeURIComponent(filename)}`);
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

    return (
        <div>
            {/* <input type="file" multiple onChange={handleFileChange} /> */}
           
            <Grid container spacing={2} >
                <Grid item xs={10}>
                    <OutlinedInput size='small' placeholder='Details' fullWidth/>
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

export default SAFileUpload;
