import { Download } from '@mui/icons-material'
import { Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import backend from '../../app/baseLink'

export default function TemplateLC() {
    const [leagalTemp,setLeagalTemp]=useState(["Leagal Template 1","Leagal Template 2","Leagal Template 3","Leagal Template 4","Leagal Template 5"])
    const [complianceTemp,setComplianceTemp]=useState(["Compliance Template 1","Compliance Template 2","Compliance Template 3","Compliance Template 4","Compliance Template 5"])

        useEffect(()=>{
            backend.get("api/important_docs/getfiles").then((res)=>{
                console.log(res.data.response)
                const arr1=[]
                const arr2=[]
                res.data.response?.map((rest)=>{
                    if(rest.doc_type=="complaince_templates"){
                        arr2.push(rest)
                       
                    }
                    else{
                        arr1.push(rest)
                    }
                })
                setLeagalTemp(arr1)
                setComplianceTemp(arr2)
            })
            
        },[])


        const downloadFiles=(urlGlob)=>{
    
            try {
                backend.post('/download', { url:urlGlob }, {
                    responseType: 'blob'
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download',urlGlob); // Modify filename as needed
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
    
                })
    
    
            } catch (error) {
                console.error('Error downloading file:', error);
            }
            
        }
    return (
    <div style={{margin:"10px"}}>
        <Grid container spacing={2} >
            <Grid item  xs={6} component={Paper}>

            
                <h1 style={{backgroundColor:'#3f51b5',padding:"2px",color:"white", textAlign: 'center'}}>
                    Leagal Templates- Global
                                    </h1>
                <List>
                    {
                        leagalTemp.map((row,index)=>{
                            return (
                                <>
                                <ListItem> {"Leagal Template "+(index+1)}
                            
                            <ListItemSecondaryAction>
                                <IconButton color='info' onClick={()=>downloadFiles(row.path)}>
                                    <Download/>
                                </IconButton>
                            </ListItemSecondaryAction>
                             </ListItem>
                             <Divider/>
                                </>
                            )
                        })
                    }
                </List>
            </Grid>

            <Grid item  xs={6} component={Paper}>
            <h1 style={{backgroundColor:'#3f51b5',padding:"2px",color:"white",alignContent:"center", textAlign: 'center'}}>
                   Compliance-Templates
                </h1>
                <List>
                    {
                        complianceTemp.map((row,index)=>{
                            return (
                                <>
                                <ListItem> {"Compliance  Template "+(index+1)} 
                            <ListItemSecondaryAction>
                                <IconButton color='info' onClick={()=>downloadFiles(row.path)}>
                                    <Download/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                            <Divider/>
                                </>
                            )
                        })
                    }
                </List>
            </Grid>

        </Grid>
    </div>
  )
}
