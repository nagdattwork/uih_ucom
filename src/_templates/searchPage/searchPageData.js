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

const rows = [
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
 

];

export default function SearchPageData() {
  return (
   <div component={Paper}>
      
     <TableContainer component={Paper} style={{marginTop:"20px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr. No</StyledTableCell>
            <StyledTableCell>ID </StyledTableCell>
            <StyledTableCell>Country </StyledTableCell>
            <StyledTableCell>Institute </StyledTableCell>
            <StyledTableCell>Type </StyledTableCell>
            <StyledTableCell>BU </StyledTableCell>
            <StyledTableCell>Start Date </StyledTableCell>
            <StyledTableCell>Status </StyledTableCell>
            <StyledTableCell>Outcomes </StyledTableCell>
            <StyledTableCell>Action </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
           
              <StyledTableCell align="left">{row.srNo}</StyledTableCell>
              <StyledTableCell component="th" align="left">{row.id}</StyledTableCell>
              <StyledTableCell align="left">{row.country}</StyledTableCell>
              <StyledTableCell align="left">{row.institute}</StyledTableCell>
              <StyledTableCell align="left">{row.type}</StyledTableCell>

              <StyledTableCell align="left">{row.bu}</StyledTableCell>

              <StyledTableCell align="left">{row.start_date}</StyledTableCell>
              <StyledTableCell align="left">{row.status}</StyledTableCell>
              <StyledTableCell align="left">{row.outcome}</StyledTableCell>
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
