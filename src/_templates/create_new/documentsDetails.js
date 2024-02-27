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
import PDDFileUpload from './documents/pddFileUpload';
import DAFileUpload from './documents/daFileUpload';
import SAFileUpload from './documents/saFileUpload';
import OtherFileUpload from './documents/otherFileUpload';

export default function DocumentsDetails() {
    //backdrops

    
    return (
        <div>

            <Grid container>
                <h4>Project Description Document</h4>
                <Grid item xs={12}>
                    <PDDFileUpload />

                </Grid>
            </Grid>

            <Grid container>
                <h4>Draft Agreement</h4>
                <Grid item xs={12}>
                    <DAFileUpload />

                </Grid>
            </Grid>


            <Grid container>
                <h4>Signed Agreement</h4>
                <Grid item xs={12}>
                    <SAFileUpload />

                </Grid>
            </Grid>

            <Grid container>
                <h4>Others (ie. Draft Manuscript, abstracts, articles, IPR, legal/compliance etc</h4>
                <Grid item xs={12}>
                    <OtherFileUpload />

                </Grid>
            </Grid>
        </div>
    )
}


