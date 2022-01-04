import * as React from "react";
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
import { getDateWithFormat } from "../../Utls/DateTimeUtls";
import { User } from "../../Service/User.service";
import LoadingPage from "../LoadingPage/LoadingPage";
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;
const ROLE_INTER = 2;

const columns = [
  { id: "userName", label: "Full name", minWidth: 300 },
  { id: "role", label: "Role", minWidth: 100, align: "center" },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "isdelete", label: "Status", minWidth: 100, align: "center" },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

const textStyle = {
  fontSize: 15,
  fontWeight: "550",
  maxLines: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const activeStyle = {
  fontSize: 15,
  fontWeight: "550",
  maxLines: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: 'green'
};

const blockStyle = {
  fontSize: 15,
  fontWeight: "550",
  maxLines: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: 'red'
};

const adminStyle = {
  fontSize: 13,
  color: 'crimson',
  fontWeight: "550"
}

const coopStyle = {
  fontSize: 13,
  color: '#FF9933',
  fontWeight: "550"
}

const internStyle = {
  fontSize: 13,
  color: 'blue',
  fontWeight: "550"
}

export default function JobsManagement() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isAsc, setFilter] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    User.GetAllUsers().then(result => {
      if (result) {
        setRows(result)
      }
    }).catch(error => alert("Server error, please try later!"));
  }, [])

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
        sort = a[order].toString().toLowerCase() > b[order].toString().toLowerCase() ? 1 : -1;
      } else {
        sort = a[order].toString().toLowerCase() < b[order].toString().toLowerCase() ? 1 : -1;
      }
      return sort;
    });
    setRows(newRows);
    setFilter(!isAsc);
  };

  const onDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this user?");

    if (confirm) {
      setLoading(true);
      User.DeleteUser(id).then(result => {
        if (result.status == 200) {
          alert("Delete successfully!");
          window.location.reload();
        } else {
          alert("Delete fail, please try later!");
          setLoading(false)
        }
      }).catch((error) => {
        setLoading(false)
      });
    }
  }

  const onActive = async (id) => {
    const confirm = window.confirm("Do you want to active this user?");

    if (confirm) {
      setLoading(true);
      User.DeleteUser(id).then(result => {
        if (result.status == 200) {
          alert("Active successfully!");
          window.location.reload();
        } else {
          alert("Active fail, please try later!");
          setLoading(false);
        }
      }).catch((error => {
        setLoading(false);
      }));
    }
  }

  return rows.length==0 ? <LoadingPage/> : (
    <div className="page_container_user_manager">
      {!isLoading && <Container maxWidth="lg" className="problem_container">
        <div className="page_title">LIST USERS</div>
        <Paper sx={{ width: "100%" }} >
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
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          let display = value;
                          let style = textStyle;

                          if (column.id == "role") {
                            switch (Number(value)) {
                              case ROLE_ADMIN:
                                display = "Admin"
                                style = adminStyle
                                break;
                              case ROLE_COOP:
                                display = "Company"
                                style = coopStyle
                                break;
                              case ROLE_INTER:
                                display = "Developer"
                                style = internStyle
                                break;
                              default:
                                break;
                            }
                          } else if (column.id == "verifyEmail") {
                            if (value == false) {
                              display = "Not verify"
                            } else {
                              display = "Verified"
                            }
                          } else if (column.id == "isdelete") {
                            if (value) {
                              style = blockStyle
                              display = "Block"
                            } else {
                              style = activeStyle
                              display = "Active"
                              // display = <button className="btn btn-outline-danger">Active</button>
                            }
                          } else if (column.id == "action") {
                            if (row.isdelete) {
                              display = <button className="btn btn-success" type="button" onClick={() => onActive(row._id)}>Active</button>
                            } else {
                              display = <button className="btn btn-outline-danger" type="button" onClick={() => onDelete(row._id)}>Block</button>
                            }
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
      </Container>}
      {isLoading && <LoadingPage/>}
    </div>
  );
}
