/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import LoadingPage from "../LoadingPage/LoadingPage"
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { calculateTimeAgo, getDateWithFormat } from "../../Utls/DateTimeUtls";
import logo from "../../IMG/woekday.jpg";
import { Job } from "../../Service/Job.service";
import Chip from "@mui/material/Chip";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Service/Auth.context";
import FileBase64 from "react-file-base64";
import { User } from "../../Service/User.service";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
const ROLE_ADMIN = 0;
const ROLE_COOP = 1;
const ROLE_INTER = 2;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function Detail() {
  const { id } = useParams();
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo, isLoaded, setIsLoaded } =
    useContext(AuthContext);
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    cv: "",
  });
  const [sWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setdata] = useState([]);
  const [job, setJob] = useState(false);
  const [listHotestJobs, setListHotestJobs] = useState([]);
  const [lang, setLang] = useState([]);
  const [isApprove,setApprove]= useState(false);
  const [isLoading,setLoading]= useState(false);
  const history = useHistory();

  useEffect(() => {

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    Job.GetSuggestJobs(id).then((result) => {
      if (result != undefined) {
        setListHotestJobs(result.splice(0, 4));
      } else {
        setListHotestJobs([]);
      }
    });
    Job.GetJobByID(id)
      .then((data) => {
        setJob(data);
        setLang(data.language);
        setApprove(data.listApprove.some(e=>e.userId===user._id))
      })
      .catch((error) => {
        history.replace("/notfound");
        window.location.reload();
      });
      User.GetDetails().then((result)=>{
        if(result.status==200){
          setValues(result.data.user);
        }
      })
  }, []);
  // const onApplyJob = () => {
  //   if (isAuthenticated) {
  //     User.AddApproveList(id,user._id)
  //       .then(() => {alert("Apply success")})
  //       .catch((error) => console.log(error));

  //   } else {
  //     history.push("/signin");
  //   }
  // };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onSubmit = () =>{
    if(!values.fullname||!values.phoneNumber||!values.email||!values.cv){
      alert("Please fill in your form!")
    }
    else{
      setLoading(true);
      User.ApproveJob(id,values).then(result =>{
        if (result.status == 200) {
          alert("Apply successfully!");
          setApprove(true);
          setLoading(false);
          setOpen(false);
        } else {
          alert("Apply failed, please try later!");
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Apply failed, please try later!");
      });
    }
    }
  const defaultImg =
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
  return !job ? <LoadingPage/>:(
    
    <div>
      <div className="container-detail">
        <div className="container">
          <div className="team-single">
            <div className="row">
              <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                <div className="team-single-img">
                  <img src={!job.img ? defaultImg : job.img} alt="" />
                </div>
                <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
                  <h4 className="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">
                    {job.createBy}
                  </h4>
                </div>
                <div className="btn_apply">
                  {isAuthenticated && user.role!= ROLE_ADMIN && user.role!=ROLE_COOP && <Button variant="contained" color="success" onClick={handleOpen} disabled = {isApprove}>Apply job</Button>}
                  {!isAuthenticated && <Button variant="contained" color="success" onClick={()=>{history.push("/signin")}}>Apply job</Button>}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 600 }}>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <label className="labels">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fullname"
                            id="fullname"
                            value={values.fullname || ""}
                             onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <label className="labels">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            id="email"
                            value={values.email || ""}
                             onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <label className="labels">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={values.phoneNumber || ""}
                             onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                        <div className="file btn btn-lg">
                          <FileBase64
                            accept="image/*"
                            multiple={false}
                            type="file"
                            value={values.cv||""}
                             onDone={({ base64 }) =>
                              setValues({ ...values, cv: base64 })
                            }
                          />
                        </div>
                        </div>
                      </div>
                     
                      <button className="btn btn-primary" onClick={() => onSubmit()} disabled = {isLoading}>
                        Submit
                      </button>
                    </Box>
                  </Modal>
                </div>
              </div>

              <div className="col-lg-8 col-md-7">
                <div className="team-single-text padding-50px-left sm-no-padding-left">
                  <h4 className="font-size38 sm-font-size32 xs-font-size30">
                    {job.title}
                  </h4>
                  <p className="no-margin-bottom">
                    <div
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </p>
                  <div className="contact-info-section margin-40px-tb">
                    <ul className="list-style9 no-margin">
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="far fa-gem text-yellow"></i>
                            <strong className="margin-10px-left text-yellow">
                              Salary:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{job.salary}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="far fa-file text-lightred"></i>
                            <strong className="margin-10px-left text-lightred">
                              Courses:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{job.major}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-map-marker-alt text-green"></i>
                            <strong className="margin-10px-left text-green">
                              Address:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{job.address}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-map-marker-alt text-blue"></i>
                            <strong className="margin-10px-left text-blue">
                              WorkTime:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{job.workTime}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-map-marker-alt text-purple"></i>
                            <strong className="margin-10px-left text-purple">
                              Language:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            {lang.map((item, i) => {
                              return (
                                <Chip label={item} sx={{ marginRight: 1 }} />
                              );
                            })}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <h5 className="font-size24 sm-font-size22 xs-font-size20">
                  Best for you
                </h5>
                <div className="sm-no-margin">
                  <Box>
                    <Grid container className="container_all_jobsdetail">
                      {listHotestJobs.map((item, i) => {
                        return (
                          <Grid className="container_grid_hover">
                            <CardJob key={i} item={item} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </div>
              </div>

              <div className="col-md-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CardJob(props) {
  const dateEnd = getDateWithFormat(props.item.endDate);
  const timeAgo = calculateTimeAgo(props.item.createDate);
  return (
    <a href={`/job/` + props.item._id}>
      <Card variant="outlined" className="container_card_all_jobdetail">
        {/* <CardMedia component = "img" image={logo} height = "140" width = "380"/> */}
        <img
          src={props.item.img ? props.item.img : logo}
          className="card_image"
        />
        <CardContent style={{ width: "100%" }}>
          <div className="card_title_detail">{props.item.title}</div>
          <div className="">$ {props.item.salary}</div>
          <div className="card_date_to">
            <span>To: {dateEnd}</span>
          </div>
          <div className="card_date_to">{timeAgo}</div>
        </CardContent>
      </Card>
    </a>
  );
}
