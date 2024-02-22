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
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),
  createData('1', 1589283,'India','Celera Dignostic','WIP','MR','27-05-2022','Active','Report'),


];

export default function TableHome() {
  return (
   <div>
     <TableContainer component={Paper} style={{marginTop:"20px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell><b>Sr. No</b></StyledTableCell>
            <StyledTableCell><b>ID </b></StyledTableCell>
            <StyledTableCell><b>Country </b></StyledTableCell>
            <StyledTableCell><b>Institute</b> </StyledTableCell>
            <StyledTableCell><b>Type</b> </StyledTableCell>
            <StyledTableCell><b>BU</b> </StyledTableCell>
            <StyledTableCell><b>Start Date</b> </StyledTableCell>
            <StyledTableCell><b>Status</b> </StyledTableCell>
            <StyledTableCell><b>Outcomes </b></StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
           
              <StyledTableCell align="right">{row.srNo}</StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
              <StyledTableCell align="right">{row.country}</StyledTableCell>
              <StyledTableCell align="right">{row.institute}</StyledTableCell>
              <StyledTableCell align="right">{row.type}</StyledTableCell>

              <StyledTableCell align="right">{row.bu}</StyledTableCell>

              <StyledTableCell align="right">{row.start_date}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.outcome}</StyledTableCell>

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
