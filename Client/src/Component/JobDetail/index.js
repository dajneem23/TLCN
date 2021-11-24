/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import "./sytle.css";
import { BaseListJob } from "../Home/BaseListJob";
import logo from "../../IMG/woekday.jpg"
import { Job } from "../../Service/Job.service";

export default function Detail() {
  const { id } = useParams();
  const [sWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setdata] = useState([]);
  const [job, setJob] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    Job.GetAllJobs().then(function (data) {
      setdata(data);
      const details = Object.values(data).filter((data, index) => {
        return data._id == id;
      });
      setJob(details[0]);
      console.log("data",data);
      console.log(details);
    });
  }, []);

  return (
    <div className="container-detail">
      <div className="container">
        <div className="team-single">
          <div className="row">
            <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
              <div className="team-single-img">
                <img
                  src={logo}
                  alt=""
                />
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
                          <i className="fas fa-graduation-cap text-orange"></i>
                          <strong className="margin-10px-left text-orange">
                            Address:
                          </strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>{job.position}</p>
                        </div>
                      </div>
                    </li>
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
                          <p>Design Category</p>
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
                          <p>Regina ST, London, SK.</p>
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
                            <a href="javascript:void(0)">addyour@emailhere</a>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <h5 className="font-size24 sm-font-size22 xs-font-size20">
                  Professional Skills
                </h5>

                <div className="sm-no-margin">
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">Positive Behaviors</div>
                      <div className="col-5 text-right">40%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      className="animated custom-bar progress-bar slideInLeft bg-sky"
                    ></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">Teamworking Abilities</div>
                      <div className="col-5 text-right">50%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      className="animated custom-bar progress-bar slideInLeft bg-orange"
                    ></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">Time Management </div>
                      <div className="col-5 text-right">60%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      className="animated custom-bar progress-bar slideInLeft bg-green"
                    ></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">Excellent Communication</div>
                      <div className="col-5 text-right">80%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      className="animated custom-bar progress-bar slideInLeft bg-yellow"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
