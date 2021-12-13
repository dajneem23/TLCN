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
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;

export default function UpdateJob() {
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
  const { id } = useParams();
  let history = useHistory();
  const [data, setdata] = useState({});
  const [tags, setTags] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          history.push("/jobsmanager")
        } else {
          alert("Delete failed, please try later!");
        }
      })
      .catch((error) => {
        alert("Delete failed, please try later!");
      });
  };
  const AdminManager = () => {
    return (
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
                <h4 className="text-right">Update your job</h4>
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
    // const { editorState } = values.description;
    return (
      <div className="container rounded bg-white mt-5 mb-5">
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
          <form className="col-md-8 border-right" onKeyPress={handleKeyPress}>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Create new job</h4>
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
                type= "button"
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
      </div>
    );
  };
  return user.role == ROLE_ADMIN ? AdminManager() : CoopManager();
}
