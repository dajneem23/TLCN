/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState, useContext } from "react";
import {useHistory} from "react-router-dom"
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { BaseListJob } from "../Home/BaseListJob";
import sortIcon from "../../IMG//icon/sort.png";
import AddIcon from "@mui/icons-material/Add";
import { getDateWithFormat } from "../../Utls/DateTimeUtls";
import { Job } from "../../Service/Job.service";
import { AuthContext } from "../../Service/Auth.context";
const columns = [
  { id: "title", label: "Title", minWidth: 300 },
  { id: "tinyDes", label: "Tiny Description", minWidth: 300 },
  { id: "address", label: "Address", minWidth: 300 },
  { id: "createDate", label: "Create", minWidth: 100, align: "center" },
  { id: "startDate", label: "From", minWidth: 100, align: "center" },
  { id: "endDate", label: "To", minWidth: 100, align: "center" },
];

const titleStyle = {
  fontSize: 15,
  fontWeight: "550",
  maxLines: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;
const ROLE_INTER = 2;
export default function JobsManagement() {
  const { user, setUser } = useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isAsc, setFilter] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  let history = useHistory();
  useEffect(() => {
    if(user.role== ROLE_ADMIN){

      Job.GetAllJobs().then((result) => {
        setRows(result);
        console.log(result);
      });
    }
    else if(user.role == ROLE_COOP){
      Job.GetJobsByCoop().then((result)=>{
        setRows(result);
      })
    }
    else{
      history.push("/notfound")
    }
  }, []);
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sort = (order) => {
    const newRows = rows.sort((a, b) => {
      let sort = 1;
      if (isAsc) {
        sort = a[order] > b[order] ? 1 : -1;
      } else {
        sort = a[order] < b[order] ? 1 : -1;
      }
      return sort;
    });
    setRows(newRows);
    setFilter(!isAsc);
  };

  return (
    <div className="page_manager_container">
      <Container maxWidth="fixed" className="problem_container">
        <div className="page_title">LIST JOBS</div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
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
                      <img
                        src={sortIcon}
                        className="sort_icon"
                        onClick={() => {
                          sort(column.id);
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                        component={Link}
                        to={`/job/update/${row._id}`}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          let display = value;
                          let style = {};
                          if (
                            column.id != "title" &&
                            column.id != "tinyDes" &&
                            column.id != "address"
                          ) {
                            display = getDateWithFormat(value);
                          } else {
                            style = { ...titleStyle };
                          }

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={style}
                            >
                              {display}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <div className="container-create">
        <button className="btn btn-success">
          <a href="/createjob">Create Job</a> <AddIcon />
        </button>
      </div>
    </div>
  );
}
