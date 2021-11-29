/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import logo from "../../IMG/copy_60612516.png";
import { FaUserAlt, FaSignOutAlt, FaExpeditedssl } from "react-icons/fa";
import { GrLogin, GrContactInfo } from "react-icons/gr";
import { ImHome } from "react-icons/im";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FcAbout } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcNews } from "react-icons/fc";
import { ImNewspaper } from "react-icons/im";
import { IoIosLogIn } from "react-icons/io";
import { FcContacts } from "react-icons/fc";
import { AuthContext } from "../../Service/Auth.context";
import "./style.css";

export default function Header() {
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
  console.log("Header", user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-blue sticky">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className="logo" src={logo} alt="logo...."></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              {" "}
              <FcHome /> Home <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/job">
              {" "}
              <FcNews /> Jobs{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/code">
              {" "}
              <FcNews /> Exercise{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              {" "}
              <FcAbout /> About{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contacts">
              {" "}
              <FcContacts /> Contacts{" "}
            </a>
          </li>
        </ul>
        {!isAuthenticated ? <NoAuth /> : <Auth />}
      </div>
    </nav>
  );
}
function NoAuth() {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="btn-sign-up nav-link " href="/signup">
            {" "}
            <FaExpeditedssl /> Sign up{" "}
          </a>
        </li>
        <li className="nav-item">
          <a className="btn-sign-up nav-link" href="/signin">
            Sign in <IoIosLogIn />{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}
function Auth() {
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
  console.log("isAuth", user.userName);
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/profile">
            {" "}
           {user._id}
          </a>
        </li>
        <li className="nav-item">
          <a className="btn-sign-up nav-link" href="/signin">
            Log out <IoIosLogIn />{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}
