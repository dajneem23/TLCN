/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import TagInput from "../TagsInput/index";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Job } from "../../Service/Job.service";

// import "./style.css";

export default function PostNewJob() {
  const [tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const flag = false;
  const [values, setValues] = useState({
    title: "",
    description: "",
    salary: "",
    workTime: "",
    address: "",
    language: "",
    category: "",
    major: "",
    startDate: "",
    endDate: "",
    img: "",
  });
  const defaultImg =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    values.language = tags;
    values.description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
    const startDate = values.startDate;
    const endDate = values.endDate;

    const result = await Job.CreateNewJob({
      ...values, 
      startDate:new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime()
    });
    console.log(result);
  };
  function handleSelecetedTags(items) {
    setTags(items);
  }
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <div className="profile-img">
              <img
                src={values.img.length == 0 ? defaultImg : values.img}
                alt=""
              />
              <div className="file btn btn-lg btn-primary">
                Change image
                <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  value={values.img}
                  onDone={({ base64 }) => setValues({ ...values, img: base64 })}
                />
              </div>
            </div>
          </div>
        </div>
        <form className="col-md-8 border-right">
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
                  value={values.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Description</label>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Salary</label>
                <input
                  id="salary"
                  name="salary"
                  className="form-control"
                  value={values.salary}
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
                  value={values.workTime}
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
                  value={values.address}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Language</label>
                <TagInput
                  selectedTags={handleSelecetedTags}
                  fullWidth
                  variant="outlined"
                  id="language"
                  name="language"
                  value={values.language}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={values.category}
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
                  value={values.major}
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
                  value={values.startDate}
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
                  value={values.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button" onClick={handleSubmit}>
                Save Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
