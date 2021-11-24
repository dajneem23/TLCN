/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./style.css";

export default function EditProFile() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber:"",
    sex:"",
    dob:"",
    experience:"",
    address:"",

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">Edogaru</span>
            <span> </span>
          </div>
        </div>
        <form className="col-md-8 border-right" onSubmit={handleSubmit}>
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="fullName"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Sex</label>
                <select
                  id="sex"
                  name="sex"
                  className="form-control"
                  value={values.sex}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-12">
                <label className="labels">DoB</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id="dob"
                  value={values.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Experience</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  id="experience"
                  value={values.experience}
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
                <label className="labels">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="submit">
                Save Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
