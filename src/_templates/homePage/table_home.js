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
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import tableCSS from './table.css'
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
  const currentUser=useSelector((state)=>state.login)
  React.useEffect(()=>{
    backend.post("api/projects/getmyprojects",{id:currentUser.user._id}).then((res)=>{
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



const columns = [
  { field: '_id', headerName: 'ID' },
  { field: 'project_title.title', headerName: 'Title',valueGetter: (params) => params.row.project_title.title,width:180 },
  { field: 'project_title.objective', headerName: 'Objective',valueGetter: (params) => params.row.project_title.objective,width:160,  cellClassName: 'wrap-cell-content'},
  { field: 'customer_details.institutes', headerName: 'Institutes',valueGetter: (params) => [...params.row.customer_details.institutes.map((data)=>data.institute_name)].toString(),width:150,  cellClassName: 'wrap-cell-content'},
  { field: 'project_title.project_duration', headerName: 'Duration',valueGetter: (params) => params.row.project_title.project_duration,width:90,  cellClassName: 'wrap-cell-content'},
  { field: 'project_title.act_start_date', headerName: 'Start Date',valueGetter: (params) => params.row.project_title.act_start_date,width:110,  cellClassName: 'wrap-cell-content'},
  { field: 'project_title.current_stage', headerName: 'Status',valueGetter: (params) => params.row.project_title.current_stage,width:100,  cellClassName: 'wrap-cell-content'},
  { field: 'fi_funding?.fi_funding_status', headerName: 'Funded?',valueGetter: (params) => params.row.fi_funding?.fi_funding_status?.fi_funding_funded==true?"YES":"NO",width:100,  cellClassName: 'wrap-cell-content'},

  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   renderCell: (params) => (
  //     <div>
       
  //       <div align="left">
  //               <IconButton>
  //               <ModeEditTwoToneIcon color='success'/>
  //               </IconButton>
  //               <IconButton>
  //                   <DeleteTwoToneIcon color='error'/>
  //               </IconButton>
  //             </div>
  //     </div>
  //   ),
  // },
];


const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
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
  },
}));
function CustomDataGrid(props) {
//   const classes = useStyles();

  return (
    <div style={{ maxHeight: 550, width: '100%',marginTop:"20px" }}>
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
        pageSizeOptions={[8,16,24]}
      />
    </div>
  );
}