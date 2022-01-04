/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FileBase64 from "react-file-base64";
import TagInput from "../TagsInput/TagInput";
import "./style.css";
import { Job } from "../../Service/Job.service";
import Chip from "@mui/material/Chip";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
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
import { Document, Page } from "react-pdf";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AuthContext } from "../../Service/Auth.context";
import { getDateWithFormat, getDateWithString } from "../../Utls/DateTimeUtls";
import LoadingPage from "../LoadingPage/LoadingPage";
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;

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

const columns = [
  { id: "fullname", label: "FullName", minWidth: 300 },
  { id: "email", label: "Email", minWidth: 300 },
  { id: "phoneNumber", label: "Phone", minWidth: 300 },
  { id: "cv", label: "CV", minWidth: 300 },
];

const titleStyle = {
  fontSize: 15,
  fontWeight: "550",
  maxLines: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function UpdateJob() {
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
  const { id } = useParams();
  let history = useHistory();
  const [data, setdata] = useState({});
  const [tags, setTags] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [values, setValues] = useState({
    title: "",
    description: "",
    salary: "",
    workTime: "",
    address: "",
    language: [],
    category: "",
    major: "",
    startDate: 0,
    endDate: 0,
    img: "",
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isAsc, setFilter] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cv, setCV] = useState("");
  const [viewPdf, setViewPdf] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const defaultImg =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
  useEffect(() => {
    let mounted = true;
    Job.GetJobByID(id).then(function (data) {
      if (mounted) {
        data.endDate = getDateWithFormat(data.endDate);
        data.startDate = getDateWithFormat(data.startDate);
        setdata(data);
        setValues(data);
        setTags(values.language);
        setFlag(true);
        setRows(data.listApprove);
        const blocksFromHTML = convertFromHTML(data.description);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
      }
    }, []);
    return () => (mounted = false);
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (value) => {
    setOpen(true);
    setCV(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.language = tags;
    values.description = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const startDate = new Date(values.startDate).getTime();
    const endDate = new Date(values.endDate).getTime();
    Job.UpdateJob({ ...values, startDate, endDate })
      .then((result) => {
        if (result && result.status == 200) {
          alert("Update successfully!");
        } else {
          alert("Update faild, please try later!");
        }
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };
  function handleSelecetedTags(items) {
    setTags(items);
  }
  const handleDelete = () => {
    Job.DeleteJobById(id)
      .then((result) => {
        if (result.status == 200) {
          alert("Delete exercise successfully!");
          history.push("/jobsmanager");
        } else {
          alert("Delete failed, please try later!");
        }
      })
      .catch((error) => {
        alert("Delete failed, please try later!");
      });
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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const AdminManager = () => {
    return !values._id ? <LoadingPage/> : (
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <div className="profile-img">
                <img src={values.img} alt="" />
                <div className="file btn btn-lg btn-primary">
                  Change image
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    value={values.img}
                    onDone={({ base64 }) =>
                      setValues({ ...values, img: base64 })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <form className="col-md-8 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right title_list_approve">Job Manager</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={values.title}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Tiny Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tinyDes"
                    id="tinyDes"
                    value={values.tinyDes}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Description</label>
                  <textarea
                    type="text"
                    cols="40"
                    rows="5"
                    className="form-control"
                    name="description"
                    id="description"
                    value={values.description}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Salary</label>
                  <input
                    id="salary"
                    name="salary"
                    className="form-control"
                    value={values.salary}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Work Time</label>
                  <input
                    type="text"
                    className="form-control"
                    name="workTime"
                    id="workTime"
                    value={values.workTime}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    id="address"
                    value={values.address}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Language</label>
                  {}
                </div>
                <div className="col-md-12">
                  <label className="labels">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="form-control"
                    value={values.category}
                  >
                    <option value="fulltime">Full time</option>
                    <option value="parttime">Part time</option>
                    <option value="intern">Intern</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="labels">Major</label>
                  <input
                    type="text"
                    className="form-control"
                    name="major"
                    id="major"
                    value={values.major}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Start date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    id="startDate"
                    value={values.startDate}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">End date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    id="endDate"
                    value={Date(values.endDate)}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="delete-button btn btn-danger">
                  Delete Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const CoopManager = () => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = (value) => {
      setOpen(true);
      setCV(value);
    };
    const handleClose = () => {
      setOpen(false);
    };
    // const { editorState } = values.description;
    return !values._id ? <LoadingPage/> : (
      <div className="container rounded bg-white mt-5 mb-5">
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...styleModal }}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description"></p>
          </Box>
        </Modal>
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <div className="profile-img">
                <img src={!values.img ? defaultImg : values.img} alt="" />
                <div className="file btn btn-lg btn-primary">
                  Change image
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    value={values.img || ""}
                    onDone={({ base64 }) =>
                      setValues({ ...values, img: base64 })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <form className="col-md-9 border-right" onKeyPress={handleKeyPress}>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right title_list_approve">
                  Job Manager
                </h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={values.title || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Tiny Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tinyDes"
                    id="tinyDes"
                    value={values.tinyDes || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Description</label>
                  {flag && (
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                    />
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Salary</label>
                  <input
                    id="salary"
                    name="salary"
                    className="form-control"
                    value={values.salary || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Work Time</label>
                  <input
                    type="text"
                    className="form-control"
                    name="workTime"
                    id="workTime"
                    value={values.workTime || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    id="address"
                    value={values.address || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Language</label>
                  {flag && (
                    <TagInput
                      selectedTags={handleSelecetedTags}
                      fullWidth
                      variant="outlined"
                      id="language"
                      name="language"
                      tags={values.language || ""}
                    />
                  )}
                </div>
                <div className="col-md-12">
                  <label className="labels">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="form-control"
                    value={values.category || ""}
                    onChange={handleChange}
                  >
                    <option value="none">Full time</option>
                    <option value="male">Part time</option>
                    <option value="female">Intern</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="labels">Major</label>
                  <input
                    type="text"
                    className="form-control"
                    name="major"
                    id="major"
                    value={values.major || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Start date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    id="startDate"
                    value={values.startDate || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">End date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    id="endDate"
                    value={values.endDate || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button mr-2"
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Update Job
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-12">
          <label className="labels title_list_approve">List Approve</label>
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
                        {column.id!="cv" &&<img
                          src={sortIcon}
                          className="sort_icon"
                          onClick={() => {
                            sort(column.id);
                          }}
                        />}
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
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            let display = value;
                            let style = {};
                            if (column.id == "cv") {
                              display = (
                                <div>
                                  <button className="btn btn-outline-primary" onClick={() => handleOpen(value)}>
                                    Preview
                                  </button>
                                </div>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...styleModal, width: 800,height: "80%"}}>
            <div clasName="cv_pr_contrainer" >
              {cv && (
                <>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer
                      sx={{overflow: "scroll"}}
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
  };
  return user.role == ROLE_ADMIN ? AdminManager() : CoopManager();
}
