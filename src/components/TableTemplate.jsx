import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { useNavigate } from "react-router-dom";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TableSearch from './TableSearch';
import DeleteConfirmation from './DeleteConfirmation';

const TableTemplate = (props) => {
  const { columns, data, path, handleDelete, loading } = props;
  const COLUMNS = useMemo(() => columns, [columns]);
  const DATA = useMemo(() => data, [data]);
  
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = useTable({
    columns: COLUMNS,
    data: DATA
  }, useGlobalFilter, useSortBy);
  const { globalFilter } = state;

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleDeleteOpen = () => {
    setDialogueOpen(true);
  }

  return (
    <>
    {
      loading ? 
        <Box sx={{ width:"100%", justifyContent:'center', alignItems:'center' }}>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '5rem' }}/>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '2rem' }}/>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '2rem' }}/>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '2rem' }}/>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '2rem' }}/>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '2rem' }}/>
            <Skeleton  variant="text" width={"100%"} sx={{ fontSize: '3rem' }}/>
        </ Box>
      :
      <> 
      <TableSearch filter={globalFilter} setFilter={setGlobalFilter}/>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
              {
                  headerGroups.map(headerGroup => (
                      <TableRow {...headerGroup.getHeaderGroupProps()}>
                          {
                              headerGroup.headers.map(column => (
                                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <Typography sx={{textWeight: 'bold'}}>
                                      {column.render('Header')}
                                      {column.isSorted ? (column.isSortedDesc ? <ArrowDownwardIcon sx={{fontSize: '1rem', px:1}} /> : <ArrowUpwardIcon sx={{fontSize: '1rem', px:1}} /> ) : ''}
                                    </Typography>
                                  </TableCell>
                              ))  
                          }
                          <TableCell align="right" sx={{px: 4}}><Typography>Actions</Typography></TableCell>
                      </TableRow> 
                  ))
              }
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {
              rows.length > 0 ? 
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  prepareRow(row);
                  console.log(row);
                  return (
                  <TableRow {...row.getRowProps() } hover>
                      {
                          row.cells.map((cell) => {
                              return <TableCell {...cell.getCellProps()} onClick={() => navigate(`${path}/${row.original.id}`)}>{cell.render('Cell')}</TableCell>
                          })
                      }
                      <TableCell align="right">
                          <Button 
                              variant="text" 
                              startIcon={<EditIcon />}  
                              color="primary" 
                              sx={{ml:1}}
                              onClick={() => navigate(`${path}/update/${row.original.id}`)}
                          >
                              Update
                          </Button>
                          <Button 
                              variant="text" 
                              startIcon={<DeleteIcon />}  
                              color="error" 
                              sx={{ml:1}}
                              onClick={() => handleDeleteOpen()/*<DeleteConfirmation handleDelete={handleDelete} id={row.original.id} />*/}
                          >
                              Delete
                          </Button>
                          <DeleteConfirmation handleDelete={handleDelete} id={row.original.id} dialogueOpen={dialogueOpen} setDialogueOpen={setDialogueOpen} />
                      </TableCell>
                  </TableRow>
              )})
              :
              <TableRow style={{height: 69.5 }}>
                    <TableCell colSpan={COLUMNS.length+1} align='center' style={{ color: "#808080" }}> No Data Found... </TableCell>
              </TableRow>
            }
            {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 69.5 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={COLUMNS.length+1} />
                  </TableRow>
      )}
          </TableBody>
        </Table>  
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
    }
  </>
  )
};

export default TableTemplate
