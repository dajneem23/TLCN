import React, { useState, useEffect, useContext } from "react";
import FileBase64 from "react-file-base64";
import { AuthContext } from "../../Service/Auth.context";
import { User } from "../../Service/User.service";
import { getDateWithFormat, getDateWithString } from "../../Utls/DateTimeUtls";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import sortIcon from "../../IMG//icon/sort.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Viewer } from "@react-pdf-viewer/core";
import { Link } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./style.css";

const columns = [
  { id: "title", label: "Title", minWidth: 300 },
  { id: "cv", label: "CV", minWidth: 100, align: "center", width: 100 },
];

const titleStyle = {
  fontSize: 15,
  fontWeight: "550",
  maxLines: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function Profile() {
  const {
    user,
    setUser,
    isAuthenticated,
    setisAuthenticated,
    info,
    setinfo,
    isLoaded,
    setIsLoaded,
  } = useContext(AuthContext);
  const [values, setValues] = useState({
    fullname: "",
    avatar: "",
    email: "",
    phoneNumber: "",
    sex: "",
    dob: "",
    experience: "",
    address: "",
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isAsc, setFilter] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [cv, setCV] = useState("");

  useEffect(() => {
    User.GetDetails().then((result) => {
      if (result != undefined) {
        setValues(result.data.user);
        //     setRows(values.listApprove);
        setRows(result.data.user.listApprove || []);
      } else {
        setValues([]);
      }
    });
  }, []);
  console.log(rows);
  const defaultImg =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    setOpen(true);
    setCV(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return !values._id ? (
    <LoadingPage />
  ) : (
    <div className="container-profile emp-profile">
      <div className="row">
        <div className="col-md-3 pt-5">
          <div className="profile-img">
            <img src={!values.avatar ? defaultImg : values.avatar} alt="" />
          </div>
          <a className="btn btn-save-img" href="/editprofile">
            {" "}
            Edit profile{" "}
          </a>
        </div>
        <div className="col-md-9">
          <div className="row">
            <h4>{values.fullname}</h4>
            {/* <h6>Web Developer and Designer</h6> */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Work
                </a>
              </li>
            </ul>
          </div>
          <div className="row mt-5">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>User Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.userName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Sex</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.sex}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Date of birth</label>
                  </div>
                  <div className="col-md-6">
                    <p>{getDateWithFormat(parseInt(values.dob))}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.phoneNumber}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.experience} years</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.address}</p>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row">
                  <h4>LIST APPROVE</h4>
                  <Paper sx={{ width: "100%" }}>
                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column, index) => (
                              <TableCell
                                key={index}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                                {column.id != "cv" && (
                                  <img
                                    src={sortIcon}
                                    className="sort_icon"
                                    onClick={() => {
                                      sort(column.id);
                                    }}
                                  />
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row._id}
                                >
                                  {columns.map((column) => {
                                    const value = row[column.id];
                                    let display = value;
                                    let style = {};
                                    if (column.id == "cv") {
                                      display = (
                                        <div>
                                          <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleOpen(value)}
                                          >
                                            Preview
                                          </button>
                                        </div>
                                      );
                                    }
                                    else{
                                      display = (
                                        <a
                                          className="review-job"
                                          href={`job/${row.jobId}`}
                                        >
                                          {value}
                                        </a>
                                      );
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
                              // eslint-disable-next-line no-unreachable
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...styleModal, width: 800, height: "80%" }}>
          <div clasName="cv_pr_contrainer">
            {cv && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <Viewer
                    sx={{ overflow: "scroll" }}
                    fileUrl={cv}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}

            {/* if we dont have pdf or viewPdf state is null */}
            {!cv && <>No pdf file selected</>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
