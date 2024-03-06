import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Toolbar, Card, CardContent, Alert, Switch } from '@mui/material';
import { PieChart, BarChart } from '@mui/x-charts';
import backend from '../../app/baseLink';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';

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
    height={200}
  />
)





const Dashboard = () => {
  // Sample data for the charts
  const projectTypeData = {
    series: [
      {
        data: [{ id: 0, value: 10, label: 'RCA' }, { id: 1, value: 20, label: 'WIP' }, { id: 2, value: 15, label: 'Trial Lic' }, { id: 3, value: 70, label: 'MRA' }]
        ,
        innerRadius: 50,
        outerRadius: 100,

      }
    ]
  };

  const countryDistributionData = {
    xAxis: [{ id: 'barCategories', data: ['USA', 'UK', 'Canada'], scaleType: 'band' }],
    series: [{ data: [12, 19, 3] }], height: "100%",
  };

  const [completionDataState, setCompletionDataState] = useState({
    series: [{ data: [{ id: 0, value: 25, label: 'Completed' }, { id: 1, value: 75, label: 'Remaining' }] }]
  })
  const [documentTypeData, setDocumentTypeData] = useState({
    series: [
      { data: [{ id: 0, value: 8, label: 'Type 1' }, { id: 1, value: 10, label: 'Type 2' }, { id: 2, value: 5, label: 'Type 3' }] }
    ]
  })

  const [funder, setFunder] = useState([0, 0, 0])
  const user = useSelector((state) => state.login)
  const [open, setOpen] = useState(false)
  const [obj, setObj] = useState({})
  useEffect(() => {

    backend.post("/api/projects/currentstagedash", obj).then((res) => {
      const dataArray = []
      res.data.result.map((res, index) => {
        if (res._id !== null)
          dataArray.push({ id: index, value: res.count, label: res._id })
      })
console.log(dataArray)
      setCompletionDataState({
        series: [{ data: dataArray }]
      })

    })


    backend.post("/api/projects/documentsdash", obj).then((res) => {
      const dataArray = []
      // console.log(res.data)
      dataArray.push({
        id: 0,
        value: 100 - ((res.data.pdd_count.count / res.data.pdd_count.original_count) * 100),
        label: 'PDD'
      })
      dataArray.push({
        id: 1,
        value: 100 - ((res.data.da_count.count / res.data.da_count.original_count) * 100),
        label: 'DA'
      })
      dataArray.push({
        id: 2,
        value: 100 - ((res.data.sa_count.count / res.data.sa_count.original_count) * 100),
        label: 'SA'
      })
      dataArray.push({
        id: 3,
        value: 100 - ((res.data.others.count / res.data.others.original_count) * 100),
        label: 'OTHERS'
      })

      setDocumentTypeData({
        series: [{ data: dataArray }]
      })


    })


    backend.post("/api/projects/fundingownerdash", obj).then((res) => {
      setFunder([
        res.data.uih,
        res.data.uii,
        res.data.other

      ])

    })
  }, [obj])


  useEffect(() => {
    if (!open) {
      setObj({
        _id: user.user._id
      })
    }
    else {
      setObj({})
    }
  }, [open])


  return (
    <div>
      {/* <Toolbar/> */}
      <Box >
        {
          user.user.userType !== "basic" && (
            <Alert  severity="success"
              action={
                <Grid item container>
                  <Grid item xs={'auto'}>
                    <>
                      Personal
                    </>
                  </Grid>
                  <Grid item xs={'auto'}>
                    <Switch

                      checked={open}
                      onChange={(e) => setOpen(e.target.checked)}
                    />
                  </Grid>
                  <Grid item xs={'auto'}>
                    <>
                      Teams
                    </>
                  </Grid>
                </Grid>

              }

            >
              As a {user.user.userType} user, you can switch between personal dashboard and teams dashboard
            </Alert>
          )
        }
        <Grid container spacing={2} padding={2} sx={{ height: '100%', }}>
          {/* <Grid item xs={3}>
        
           <Card>
           <PieChart {...projectTypeData} height={200} />
           </Card>
         
        </Grid>
        <Grid item xs={3}>
          <Card  >
            <StackedBarChart />
          </Card>
        </Grid> */}
          <Grid item xs={4}>
            <Card >
              <CardContent style={{ textAlign: "center" }}>
                <b> Project's Status</b>
              </CardContent>
              <PieChart {...completionDataState} height={200} />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card >
              <CardContent style={{ textAlign: "center" }}>
                <b>Documents Missing</b>
              </CardContent>
              <PieChart {...documentTypeData}
                valueFormatter={(value) => { return value + " %" }}
                height={200} />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent style={{ textAlign: "center" }}>
                <b>Funding Status</b>
              </CardContent>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: ['UIH funded', 'UII Funded', 'Others'],
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    data: funder,
                  },
                ]}
                height={200}
              />
            </Card>
          </Grid>
        </Grid>

      </Box>

    </div>
  );
};

export default Dashboard;
