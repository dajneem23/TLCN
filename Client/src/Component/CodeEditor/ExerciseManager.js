/* eslint-disable default-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { BasicListExercise } from "./BasicListExercise";
import sortIcon from "../../IMG//icon/sort.png";
import { useEffect } from "react";
import { Compile } from "../../Service/Compile.service";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const HARD = "Hard";
const MEDIUM = "Medium";
const EASY = "Easy";
const TITLE = "title";
const STATUS = "status";
const TYPE = "type";
const AUTHOR = "author";

const listDone = ["1", "4", "6", "7", "8", "12"];

const columns = [
  { id: "title", label: "Title", minWidth: 300 },
  { id: "category", label: "Category", minWidth: 100, align: "center" },
  { id: "type", label: "Difficulty", minWidth: 100 },
  { id: "author", label: "Author", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

const titleStyle = {
  fontSize: 15,
  fontWeight: "550",
};

const easyStyle = {
  fontSize: 13,
  color: "#80FF00",
  fontWeight: "550",
};

const mediumStyle = {
  fontSize: 13,
  color: "#FF9933",
  fontWeight: "550",
};

const hardStyle = {
  fontSize: 13,
  color: "red",
  fontWeight: "550",
};

const authorStyle = {
  fontSize: 13,
};

const categoryStyle = {
  fontSize: 15,
  color: "#3618F3",
  fontWeight: "550",
};

export default function Exercise() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isAsc, setFilter] = React.useState(true);
  const [listProblems, setListProblems] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    Compile.GetAllProblems().then((result) => {
      setListProblems(result);
      setRows(result);
      console.log("ssss", rows);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick=(row)=>{
      
      console.log(row._id);
  }
  const sort = (order) => {
    const newRows = rows.sort((a, b) => {
      let sort = 1;
      if (isAsc) {
        sort = a[order] > b[order] ? 1 : -1;
      } else {
        sort = a[order] < b[order] ? 1 : -1;
      }
      return sort;
    });
    setRows(newRows);
    setFilter(!isAsc);
    console.log(newRows);
  };

  return (
    <div className="manager_ex_container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Diffculty</th>
            <th scope="col">Author</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <tr>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>{row.type}</td>
                  <td>{row.author}</td>
                  <td className="btn_del_ex"><button className="btn btn-danger " onClick={()=>handleClick(row)}>Delete<DeleteForeverIcon/></button></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
