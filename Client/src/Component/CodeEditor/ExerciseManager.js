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
import LoadingPage from "../LoadingPage/LoadingPage"

export default function Exercise() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isAsc, setFilter] = React.useState(true);
  const [listProblems, setListProblems] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [isDeleting, setDeleting] = React.useState(false);

  useEffect(() => {
    Compile.GetAllProblems().then((result) => {
      setListProblems(result);
      setRows(result);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (row) => {
    const confirm = window.confirm("Do you want to delete this exercise?");
    if (confirm) {
      setDeleting(true);
      console.log(row._id);
      Compile.DeleteExerciseById(row._id).then(result => {
        if (result.status == 200) {
          alert("Delete exercise successfully!");
          Compile.GetAllProblems().then((result) => {
            setListProblems(result);
            setRows(result);
          });
        } else {
          alert("Delete failed, please try later!");
        }
        setDeleting(false)
      }).catch(error => {
        alert("Delete failed, please try later!");
        setDeleting(false);
      })
    }
  }
  const sort = (order) => {
    const newRows = rows.sort((a, b) => {
      let sort = 1;
      if (isAsc) {
        sort = a[order].toString().toLowerCase() > b[order].toString().toLowerCase() ? 1 : -1;
      } else {
        sort = a[order].toString().toLowerCase() < b[order].toString().toLowerCase() ? 1 : -1;
      }
      return sort;
    });
    setRows(newRows);
    setFilter(!isAsc);
    console.log(newRows);
  };

  return rows.length==0? <LoadingPage/>:(
    <div className="manager_ex_container">
      <div style={{ margin: 40, textAlign: 'center' }}>
        <h3>EXERCISE MANAGEMENT</h3>
      </div>
      <table class="table" style={{ borderTopWidth: 2, borderTopColor: 'black', width: '80%' }}>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: 'center' }}>Title</th>
            <th scope="col" style={{ textAlign: 'center', width: 100 }}>Author</th>
            <th scope="col" style={{ textAlign: 'center', width: 50 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <tr>
                  <td><a style={{ color: 'black', fontSize: 18, fontWeight: "550", }} href={`/code/${row._id}`}>{row.title}</a></td>
                  <td style={{ color: 'black', fontSize: 18, fontWeight: "550", }}>{row.author}</td>
                  <td style={{ textAlign: 'center' }}><button disabled={isDeleting} className="btn btn-danger " onClick={() => handleClick(row)}><DeleteForeverIcon /></button></td>
                </tr>
              );
            })}
        </tbody>
      </table >
    </div >
  );
}
