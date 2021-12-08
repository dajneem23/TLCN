/* eslint-disable default-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import './style.css';
import { Link } from 'react-router-dom';
import { BasicListExercise } from './BasicListExercise';
import sortIcon from "../../IMG//icon/sort.png"
import { useEffect } from 'react';
import { Compile } from '../../Service/Compile.service';

const HARD = "Hard";
const MEDIUM = "Medium";
const EASY = "Easy";
const TITLE = "title";
const STATUS = "status";
const TYPE = "type";
const AUTHOR = "author";

const listDone = ["1", "4", "6", "7", "8", "12"];

const columns = [
    { id: 'title', label: 'Title', minWidth: 300 },
    { id: 'category', label: 'Category', minWidth: 100, align: 'center', },
    { id: 'type', label: 'Difficulty', minWidth: 100 },
    { id: 'author', label: 'Author', minWidth: 100 },
];

const titleStyle = {
    fontSize: 15,
    fontWeight: "550"
}

const easyStyle = {
    fontSize: 13,
    color: '#80FF00',
    fontWeight: "550"
}

const mediumStyle = {
    fontSize: 13,
    color: '#FF9933',
    fontWeight: "550"
}

const hardStyle = {
    fontSize: 13,
    color: 'red',
    fontWeight: "550"
}

const authorStyle = {
    fontSize: 13,
}

const categoryStyle = {
    fontSize: 15,
    color: "#3618F3",
    fontWeight: "550"
}

export default function Exercise() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isAsc, setFilter] = React.useState(true);
    const [listProblems, setListProblems] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    BasicListExercise.forEach(item => {
        item.status = listDone.includes(item._id) ? "Done" : "-";
    })

    useEffect(() => {
        Compile.GetAllProblems().then(result => {
            setListProblems(result);
            setRows(result);
        })
    },[])

    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sort = (order) => {
        const newRows = rows.sort((a,b) => {
            let sort = 1;
            if (isAsc) {
                sort = a[order] > b[order] ? 1 : -1;
            } else {
                sort = a[order] < b[order] ? 1 : -1;
            }
            return sort
        })
        setRows(newRows);
        setFilter(!isAsc);
        console.log(newRows);
    }

    return (
        <div className="page_code_container">
            <Container maxWidth='lg' className="problem_container">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                            <img src={sortIcon} className = "sort_icon" onClick = {() => {
                                                sort(column.id)
                                            }}/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row._id} component={Link} to={`/code/${row._id}`}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    let display = value;
                                                    let style;
                                                    switch (column.id) {
                                                        case 'title':
                                                            style = titleStyle;
                                                            break;
                                                        case 'author':
                                                            style = authorStyle;
                                                            break;
                                                        default:
                                                            style = categoryStyle;
                                                            break;
                                                    }
                                                    switch (value) {
                                                        case 1:
                                                            display = EASY;
                                                            style = easyStyle;
                                                            break;
                                                        case 2:
                                                            display = MEDIUM;
                                                            style = mediumStyle;
                                                            break;
                                                        case 3:
                                                            display = HARD;
                                                            style = hardStyle;
                                                            break;
                                                    }

                                                    return (
                                                        <TableCell key={column.id} align={column.align} style={style}>
                                                            {display}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    );
}
