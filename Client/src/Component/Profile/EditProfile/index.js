/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from "react";
import FileBase64 from "react-file-base64";
import { AuthContext } from "../../../Service/Auth.context";
import { User } from "../../../Service/User.service";
import "./style.css";

export default function EditProFile() {
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
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
  const defaultImg =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
  useEffect(() => {
    User.GetDetails().then((result) => {
      console.log(result.data.user);
      setValues(result.data.user);
    });
  }, []);
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
    const dob = new Date(values.dob).getTime();
    User.UpdateUser({ ...values, dob})
      .then((result) => {
        if (result && result.status == 200) {
          alert("Update successfully!");
        } else {
          alert("Update faild, please try later!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="profile-img">
            <img src={!values.avatar ? defaultImg : values.avatar} alt="" />
            <div className="file btn btn-lg btn-primary">
              Change image
              <FileBase64
                accept="image/*"
                multiple={false}
                type="file"
                value={values.img}
                onDone={({ base64 }) => setValues({ ...values, avatar: base64 })}
              />
            </div>
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
                  name="fullname"
                  id="fullname"
                  value={values.fullname}
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
