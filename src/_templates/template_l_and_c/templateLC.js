import { Grid, List, ListItem, ListItemButton } from '@mui/material'
import React from 'react'

export default function TemplateLC() {
  return (
    <div style={{margin:"10px"}}>
        <Grid container spacing={2}>
            <Grid item  xs={6}>

            
                <h1 style={{backgroundColor:'green',padding:"2px",color:"white",alignContent:"center", textAlign: 'center'}}>
                    Leagal Templates- Global
                </h1>
                <List>
                    {
                        [1,2,3,4,6].map(()=>{
                            return <ListItemButton> Hi </ListItemButton>
                        })
                    }
                </List>
            </Grid>

            <Grid item  xs={6}>
            <h1 style={{backgroundColor:'green',padding:"2px",color:"white",alignContent:"center", textAlign: 'center'}}>
                   Compliance-Templates
                </h1>
                <List>
                    {
                        [1,2,3,4,6].map(()=>{
                            return <ListItemButton> Hi </ListItemButton>
                        })
                    }
                </List>
            </Grid>

        </Grid>
    </div>
  )
}
