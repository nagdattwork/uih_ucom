import React from 'react'
import Milstones from './outcomesDocs/milstones'
import { Grid } from '@mui/material'
import Petents from './outcomesDocs/petents'
import Articles from './outcomesDocs/articles'
import Abstract from './outcomesDocs/abstract'

export default function Outcomes() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Milstones />
                </Grid>
                <Grid item xs={12}>
                    <Petents />
                </Grid>
                <Grid item xs={12}>
                    <Articles />
                </Grid>

                <Grid item xs={12}>
                    <Abstract />
                </Grid>
            </Grid>

        </div>
    )
}
