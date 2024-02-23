import React from 'react';
import { Grid, Button } from '@mui/material';

function NavigationHome() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Button variant="contained" color="success" fullWidth>
         Create NEW
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="success" fullWidth>
         Search & edits
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="success" fullWidth>
         Dashboard
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="success" fullWidth>
         Template- L&C
        </Button>
      </Grid>
    </Grid>
  );
}

export default NavigationHome;
