import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Loaders from '../loaders/Loaders';

export default function TableGrid(props) {
  const {columns, rows, isLoading } = props;

  return (
  <>
      { isLoading ? <Loaders use='global' /> : 
     
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
     {rows.length >= 1 ?              
          <TableBody>
          {rows.map((row) => {

            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
          : <section className='not-found' style={{position:'absolute', padding:'1rem', textAlign:'center'}}><h4>Data Tidak Ditemukan</h4></section>
          }
        </Table>
      </TableContainer> 
      }
</>
  );
}