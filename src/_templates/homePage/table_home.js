import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import backend from '../../app/baseLink';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/material/styles';
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { Avatar, Grid, IconButton } from '@mui/material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import tableCSS from './table.css'
import { useNavigate } from 'react-router';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#7986cb',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#c5cae9",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#e8eaf6",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function TableHome() {
  const [rows,setRows]=React.useState([])
    const currentUser=useSelector(state=>state.login)

  React.useEffect(()=>{
    backend.post("api/projects/getmyprojects",{id:currentUser.user._id,type:currentUser.user.userType}).then((res)=>{
      console.log(res.data.response)
      setRows(res.data.response)
    })
  },[])
  return (
   <div>
    


<CustomDataGrid style={{marginTop:"20px"}}  rows={rows}/>
      
   </div>
  );
}




const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor:  theme.palette.mode === 'dark' ?'#1a237e' : '#e8eaf6',
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      cursor:"pointer",
      '@media (hover: none)': {
        backgroundColor: 'transparent',

      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
    '& .MuiDataGrid-row':{
      cursor:"pointer",
    },
  },
 [ `& .${gridClasses.row}.odd`]:{
  '&:hover, &.Mui-hovered': {
    cursor:"pointer"
  }

 }
}));
function CustomDataGrid(props) {

  const currentUser=useSelector(state=>state.login)

  const columns = [
    // { field: '_id', headerName: 'ID',flex:1,clickable:true },
    { field: 'project_title.title', headerName: 'Title',valueGetter: (params) => params.row.project_title.title,flex:1 },
    { field: 'project_title.objective', headerName: 'Objective',valueGetter: (params) => params.row.project_title.objective,flex:1,  cellClassName: 'wrap-cell-content'},
    { field: 'customer_details.institutes', headerName: 'Institutes',valueGetter: (params) => [...params.row.customer_details.institutes.map((data)=>data.institute_name)].toString(),flex:1,  },
    { field: 'project_title.project_duration', headerName: 'Duration',valueGetter: (params) => params.row.project_title.project_duration,flex:0.5,  cellClassName: 'wrap-cell-content'},
    { field: 'project_title.act_start_date', headerName: 'Start Date',valueGetter: (params) => params.row.project_title.act_start_date,flex:0.5,  cellClassName: 'wrap-cell-content'},
    { field: 'project_title.current_stage', headerName: 'Status',valueGetter: (params) => params.row.project_title.current_stage,flex:0.7,  cellClassName: 'wrap-cell-content'},
   
  ];
  
  if(currentUser.user.userType!=='basic'){
    columns.push(
    { field: 'owner',flex:0.5, headerName: 'Owner',renderCell: (params) =>{
      return(
        <div>
          <Grid container spacing={1}>
            <Grid item xs={'auto'}>
            <Avatar sx={{ width: 24, height: 24 }} src= { process.env.REACT_APP_DOCUMENT_PATH+ params.row?.owner?.image}/>  
  
            </Grid>
            <Grid item xs='auto'>
            <b>{params.row?.owner?.fname }</b>
            </Grid>
          </Grid>
        </div>
      )
    },flex:1,resizable:true }
  
    )
  }

//   const classes = useStyles();
const history=useNavigate()
const handleRowClick = (params) => {
  history('/editproject',{
    state:{
      data:params.row
    }
  })
};


  return (
    <div style={{ height: 550, width: '100%',marginTop:"20px" }}>
      <StripedDataGrid
        rows={props.rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        getRowId={(row) => row._id}
        // headerClassName={classes.customHeader}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        headerClassName="header-style"
        pageSizeOptions={[8]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        onRowClick={handleRowClick}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
}