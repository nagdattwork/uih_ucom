import { Download } from '@mui/icons-material'
import { Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, Paper } from '@mui/material'
import React, { useState } from 'react'

export default function TemplateLC() {
    const [leagalTemp,setLeagalTemp]=useState(["Leagal Template 1","Leagal Template 2","Leagal Template 3","Leagal Template 4","Leagal Template 5"])
    const [complianceTemp,setComplianceTemp]=useState(["Compliance Template 1","Compliance Template 2","Compliance Template 3","Compliance Template 4","Compliance Template 5"])

    return (
    <div style={{margin:"10px"}}>
        <Grid container spacing={2} >
            <Grid item  xs={6} component={Paper}>

            
                <h1 style={{backgroundColor:'#3f51b5',padding:"2px",color:"white", textAlign: 'center'}}>
                    Leagal Templates- Global
                                    </h1>
                <List>
                    {
                        leagalTemp.map((row)=>{
                            return (
                                <>
                                <ListItem> {row}
                            
                            <ListItemSecondaryAction>
                                <IconButton color='info'>
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
                        complianceTemp.map((row)=>{
                            return (
                                <>
                                <ListItem> {row} 
                            <ListItemSecondaryAction>
                                <IconButton color='info'>
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
