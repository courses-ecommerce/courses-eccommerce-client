import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import "./TableData.scss";

interface TableDataProps {
  title: string;
  headerColumns: Array<string>;
  dataColumns: Array<Object>;
}

const TableData: React.FC<TableDataProps> = ({
  title,
  headerColumns,
  dataColumns,
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    // console.log(event.target.value);
  };

  const renderTableHeaders = (headerColumns: Array<string>) => {
    return (
      headerColumns.length > 0 &&
      headerColumns.map((headerColumn, index) => (
        <TableCell key={index}>{headerColumn}</TableCell>
      ))
    );
  };

  const checkKeys = (dataColumns: Array<Object>, _limit: number) => {
    return (
      dataColumns.length > 0 &&
      dataColumns.map((data: any, index) => {
        let keys = Object.keys(data);
        return (
          index < _limit && (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {keys.map((key, index) => {
                if (Array.isArray(data[key])) {
                  // console.log(data[key], "là mảng");
                  return;
                } else {
                  return <TableCell key={index}>{data[key]}</TableCell>;
                }
              })}
            </TableRow>
          )
        );
      })
    );
  };

  return (
    <div className="table-data">
      <h3 className="title">{title}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{renderTableHeaders(headerColumns)}</TableRow>
          </TableHead>
          <TableBody>{checkKeys(dataColumns, rowsPerPage)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataColumns.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableData;
