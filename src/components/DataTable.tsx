import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import useStore from '../store/globalStore';
import { useState } from 'react';
import TablePaginationActions from './TablePaginationActions';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function DataTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const data = useStore((state) => state.data);
  const isLoading = useStore((state) => state.isLoading);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 420, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {isLoading && (
        <Box sx={{ width: '100%', padding: '1rem' }}>
          <Grid container spacing={2}>
            {Array.from(Array(20)).map((_, index) => (
              <Grid item xs={6} key={index}>
                <Skeleton />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!isLoading && data.length > 0 && (
        <Table stickyHeader size="small" aria-label="time series table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 700 }}>Time (UTC)</TableCell>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 700 }} align="right">
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map(
              ({ time, value }, index) => (
                <TableRow key={`${time}_${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{dayjs(time).utc().format('LTS')}</TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100, 200]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </TableContainer>
  );
}
