/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "./style.css";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { calculateTimeAgo, getDateWithFormat } from "../../Utls/DateTimeUtls";
import { BaseListJob } from "../Home/BaseListJob";
import logo from "../../IMG/woekday.jpg";
import { Job } from "../../Service/Job.service";

export default function Detail() {
  const { id } = useParams();
  const [sWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setdata] = useState([]);
  const [job, setJob] = useState("");
  const [listHotestJobs, setListHotestJobs] = useState([]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    Job.GetHostestJobs().then((result) => {
      if (result != undefined) {
        setListHotestJobs(result.splice(0, 4));
      } else {
        setListHotestJobs([]);
      }
    });
    Job.GetAllJobs().then(function (data) {
      setdata(data);
      const details = Object.values(data).filter((data, index) => {
        return data._id == id;
      });
      setJob(details[0]);
      console.log("data", data);
      console.log(details);
    });
  }, []);

  return (
    <div>
      <div className="container-detail">
        <div className="container">
          <div className="team-single">
            <div className="row">
              <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                <div className="team-single-img">
                  <img src={logo} alt="" />
                </div>
                <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
                  <h4 className="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">
                    ClassName Teacher
                  </h4>
                  <p className="sm-width-95 sm-margin-auto">
                    We are proud of child student. We teaching great activities
                    and best program for your kids.
                  </p>
                </div>
              </div>

              <div className="col-lg-8 col-md-7">
                <div className="team-single-text padding-50px-left sm-no-padding-left">
                  <h4 className="font-size38 sm-font-size32 xs-font-size30">
                    {job.title}
                  </h4>
                  <p className="no-margin-bottom">{job.description}</p>
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
                            <i className="fas fa-mobile-alt text-purple"></i>
                            <strong className="margin-10px-left xs-margin-four-left text-purple">
                              Phone:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>(+44) 123 456 789</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-envelope text-pink"></i>
                            <strong className="margin-10px-left xs-margin-four-left text-pink">
                              Email:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>
                              <p>addyour@emailhere</p>
                            </p>
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
      <a href="/" >
          <Card variant="outlined" className="container_card_all_jobdetail">
              {/* <CardMedia component = "img" image={logo} height = "140" width = "380"/> */}
              <img src={logo} className="card_image" />
              <CardContent style={{ width: '100%' }}>
                  <div className="card_title_detail">{props.item.title}</div>
                  <div className="">$ {props.item.salary}</div>
                  <div className="card_date_to"><span>To: {dateEnd}</span></div>
                  <div className="card_date_to">{timeAgo}</div>
              </CardContent>
          </Card>
      </a>
  )
}
