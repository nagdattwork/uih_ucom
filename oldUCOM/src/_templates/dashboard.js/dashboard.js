import React from 'react';
import { Grid, Box, Typography, Toolbar } from '@mui/material';
import { PieChart, BarChart } from '@mui/x-charts';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const StackedBarChart = () => (
  <BarChart
    
    series={[
      { data: pData, label: 'pv', id: 'pvId', stack: 'total' },
      { data: uData, label: 'uv', id: 'uvId', stack: 'total' },
    ]}
    xAxis={[{ data: xLabels, scaleType: 'band' }]}
    height={400}
  />
)





const Dashboard = () => {
  // Sample data for the charts
  const projectTypeData = {
    series: [
      { data: [{ id: 0, value: 10, label: 'RCA' }, { id: 1, value: 20, label: 'WIP' }, { id: 2, value: 15, label: 'Trial Lic' }, { id: 3, value: 70, label: 'MRA' }]
    ,
    innerRadius: 50,
    outerRadius: 100,
    
    }
    ]
  };

  const countryDistributionData = {
    xAxis: [{ id: 'barCategories', data: ['USA', 'UK', 'Canada'], scaleType: 'band' }],
    series: [{ data: [12, 19, 3] }],height:400,
  };

  const completionData = {
    series: [{ data: [{ id: 0, value: 25, label: 'Completed' }, { id: 1, value: 75, label: 'Remaining' }] }]
  };

  const documentTypeData = {
    series: [
      { data: [{ id: 0, value: 8, label: 'Type 1' }, { id: 1, value: 10, label: 'Type 2' }, { id: 2, value: 5, label: 'Type 3' }] }
    ]
  };

  return (
    <div>
      {/* <Toolbar/> */}
      <Box >
      <Grid container spacing={3} sx={{ height: '100%',  }}>
        <Grid item xs={6}>
          <Box sx={{ height: '100%' }}>
            <PieChart {...projectTypeData} height={400} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box  >
            <StackedBarChart />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box >
            <PieChart {...completionData}  height={300}/>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box >
            <PieChart {...documentTypeData} height={300}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Dashboard;
 