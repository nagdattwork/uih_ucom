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
import { Button, Grid, IconButton } from '@mui/material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import backend from '../../app/baseLink';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#6c8f71',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#d8ded9",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(srNo, id, country,institute, type, bu,start_date,status,outcome) {
  return { srNo, id, country, institute,type, bu,start_date,status,outcome };
}



export default function SearchPageData(props) {
 
  return (
   <div component={Paper}>
      
     <TableContainer component={Paper} style={{marginTop:"20px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left"><b>Sr. No</b></StyledTableCell>
            <StyledTableCell align="left"><b>ID </b></StyledTableCell>
            <StyledTableCell align="left"><b>Title </b></StyledTableCell>
            <StyledTableCell align="left"><b>Institute</b> </StyledTableCell>
            <StyledTableCell align="left"><b>Objective</b> </StyledTableCell>
            <StyledTableCell align="left"><b>Duration</b> </StyledTableCell>
            <StyledTableCell align="left"><b>Start Date</b> </StyledTableCell>
            <StyledTableCell align="left"><b>Status</b> </StyledTableCell>
            <StyledTableCell align="left"><b>Funded? </b></StyledTableCell>
            <StyledTableCell>Action </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row,index) => (
            <StyledTableRow key={row._id}>
           
                 
           <StyledTableCell align="left">{index}</StyledTableCell>
              <StyledTableCell align="left">{row._id}</StyledTableCell>
              <StyledTableCell align="left">{row.project_title.title}</StyledTableCell>
              <StyledTableCell align="left">{[...row.customer_details.institutes.map((data)=>data.institute_name)].toString()}</StyledTableCell>
              <StyledTableCell align="left">{row.project_title.objective}</StyledTableCell>

              <StyledTableCell align="left">{row.project_title.project_duration}</StyledTableCell>

              <StyledTableCell align="left">{row.project_title.act_start_date}</StyledTableCell>
              <StyledTableCell align="left">{row.project_title.current_stage}</StyledTableCell>
              <StyledTableCell align="left">{row.fi_funding?.fi_funding_status==true?"YES":"NO"}</StyledTableCell>

              <StyledTableCell align="left">
                <IconButton>
                <ModeEditTwoToneIcon color='success'/>
                </IconButton>
                <IconButton>
                    <DeleteTwoToneIcon color='error'/>
                </IconButton>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    <Stack spacing={2} style={{marginTop:"10px"}}>
      <Pagination count={10} />
      </Stack>
   </div>
  );
}
