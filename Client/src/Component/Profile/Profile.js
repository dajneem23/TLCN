import React, { useState, useEffect, useContext } from "react";
import FileBase64 from "react-file-base64";
import { AuthContext } from "../../Service/Auth.context";
import { User } from "../../Service/User.service"; 
import { getDateWithFormat, getDateWithString } from "../../Utls/DateTimeUtls";
import "./style.css";

export default function Profile() {
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
  useEffect(()=>{
    User.GetDetails().then((result) => {
      
      console.log("profile",result)
      setValues(result.data.user);
    });
  },[])
  console.log(values);
  const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog";


  return (
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src={!values.avatar ? defaultImg : values.avatar} alt=""
                alt=""
                style={{maxHeight: 170}}
              />
              
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{values.fullname}</h5>
              <h6>Web Developer and Designer</h6>
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
          </div>
          <div className="col-md-2">
            {/* <button  className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/> */}
            <a className="btn btn-save-img" href="/editprofile">
              {" "}
              Edit profile{" "}
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-8">
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
                    <label>DoB</label>
                  </div>
                  <div className="col-md-6">
                    <p>{values.dob}</p>
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
                  <div className="col-md-6">
                    <label>CV</label>
                  </div>
                  <div className="col-md-6">
                    <p>Your CV here</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>ListSubmition</label>
                  </div>
                  <div className="col-md-6">
                    <p>[1,2,3]</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>WishLish</label>
                  </div>
                  <div className="col-md-6">
                    <p>[1,22,3]</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>ListAprove</label>
                  </div>
                  <div className="col-md-6">
                    <p>[1,22,3]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
