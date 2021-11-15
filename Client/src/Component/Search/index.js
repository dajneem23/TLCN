/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { BaseListJob, NewListJob, TopCoop } from "../Home/BaseListJob";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import logo from "../../IMG/woekday.jpg";
import { Container, Grid } from "@mui/material";
import { calculateTimeAgo, getDateWithFormat } from "../../Utls/DateTimeUtls";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import "./style.css";
import ReactPaginate from "react-paginate";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
export default function Seach() {
  const [seachTerm, setSearchTerm] = useState("");
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [results, setResult] = React.useState(BaseListJob);
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeEX = (event) => {
    setExperience(event.target.value);
  };
  const onSearch = () => {
    const listFillter = BaseListJob.filter(
      (a) =>
        a.address.toLowerCase().includes(location.toLowerCase()) &&
        a.major.toLowerCase().includes(type.toLowerCase()) &&
        a.title.toLowerCase().includes(seachTerm.toLowerCase())
    );
    setResult(listFillter);
  };
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = results
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((a, i) => {
      return (
        <div>
          <Grid container className="container_all_jobs">
            <Grid className="container_grid_hover">
              <CardJob key={i} item={a} />
            </Grid>
          </Grid>
        </div>
      );
    });
  const pageCount = Math.ceil(results.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <Container maxWidth="xlg" className="container_home">
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel className="demo-customized-textbox">
              Name of work do you want, location,....
            </InputLabel>
            <BootstrapInput
              className="input-job-search"
              id="demo-customized-textbox"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel id="demo-customized-select-label">Location</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={location}
              onChange={handleChangeLocation}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"TP.HCM"}>TP.Hồ Chí Minh</MenuItem>
              <MenuItem value={"TP.Đà Nẵng"}>TP.Đà Nẵng</MenuItem>
              <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel id="demo-customized-select-label">
              Type of Job
            </InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={type}
              onChange={handleChangeType}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"ReactJs"}>ReactJs</MenuItem>
              <MenuItem value={"AngularJS"}>AngularJS</MenuItem>
              <MenuItem value={"PHP"}>PHP</MenuItem>
              <MenuItem value={"VueJs"}>VueJS</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel id="demo-customized-select-label">
              Experience
            </InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={experience}
              onChange={handleChangeEX}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>Dưới 1 năm</MenuItem>
              <MenuItem value={1}>1 năm</MenuItem>
              <MenuItem value={2}>2 năm</MenuItem>
              <MenuItem value={3}>3 năm</MenuItem>
              <MenuItem value={4}>5 năm</MenuItem>
              <MenuItem value={5}>5 năm</MenuItem>
              <MenuItem value={6}>Trên 5 năm</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
          <Button variant="contained" size="medium" style= {{margin: 35}}
              onClick={() => {
                onSearch();
              }}
            >
              Search
            </Button>
          </FormControl>
        </Box>
        <div className="search-page">
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <Grid container className="container_all_jobs">
              {displayUsers}
            </Grid>
          </Box>
        </div>
      </Container>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
  function CardJob(props) {
    const dateEnd = getDateWithFormat(props.item.endDate);
    const timeAgo = calculateTimeAgo(props.item.createDate);

    return (
      <Card variant="outlined" className="container_card_all_job">
        {/* <CardMedia component = "img" image={logo} height = "140" width = "380"/> */}
        <img src={logo} className="card_image" />
        <CardContent style={{ width: "100%" }}>
          <div className="card_title">{props.item.title}</div>
          <div className="">${props.item.salary}</div>
          <div className="card_date_to">
            <span>To: {dateEnd}</span>
          </div>
          <div className="card_date_to">{timeAgo}</div>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`job/${props.item.id}`}>About Page</Link>
          </Button>
        </CardActions>
      </Card>
    );
  }
}
