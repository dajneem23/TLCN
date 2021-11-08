import React from "react";
import FileBase64 from "react-file-base64";
import "./style.css";

export default function Profile() {
  const [data, setData] = React.useState({
    image: "",
  });

  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log({ data });
    },
    [data]
  );

  return (
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                alt=""
              />
              <div className="file btn btn-lg btn-primary">
                  Change image
                <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  value={data.image}
                  onDone={({ base64 }) => setData({ ...data, image: base64 })}
                />
              </div>
            </div>
            <button className="btn btn-save-img" onClick={onSubmit}>Save image</button>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>Kshiti Ghelani</h5>
              <h6>Web Developer and Designer</h6>
              <p className="proile-rating">
                RANKINGS : <span>8/10</span>
              </p>
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
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>Kshiti Ghelani</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>kshitighelani@gmail.com</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>123 456 7890</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Location</label>
                  </div>
                  <div className="col-md-6">
                    <p>1110A7, Phạm Văn Đồng</p>
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
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Hourly Rate</label>
                  </div>
                  <div className="col-md-6">
                    <p>10$/hr</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Total Projects</label>
                  </div>
                  <div className="col-md-6">
                    <p>230</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>English Level</label>
                  </div>
                  <div className="col-md-6">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Availability</label>
                  </div>
                  <div className="col-md-6">
                    <p>6 months</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Your Bio</label>
                    <br />
                    <p>Your detail description</p>
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
