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
import EditPDDFileUpload from './documents/editPddFileUpload';
import EditDAFileUpload from './documents/editDaFileUpload';
import EditSAFileUpload from './documents/editSaFileUpload';
import EditOtherFileUpload from './documents/editOtherFileUpload';

export default function DocumentsDetails() {
    

    
    return (
        <div>

            <Grid container>
                <h4>PDD Documents</h4>
               <Grid item xs={12}>
               <EditPDDFileUpload/>
               </Grid>
               <h4>DA Documents</h4>
               <Grid item xs={12}>
               <EditDAFileUpload/>
               </Grid>
               <h4>SA Documents</h4>
               <Grid item xs={12}>
               <EditSAFileUpload/>
               </Grid>
               <h4>Others</h4>
               <Grid item xs={12}>
               <EditOtherFileUpload/>
               </Grid>
            </Grid>
           
       </div>
    )
}

