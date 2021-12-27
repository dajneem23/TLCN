
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import { BaseListJob, NewListJob, TopCoop } from './BaseListJob';
import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css';
import logo from "../../IMG/woekday.jpg"
import createIcon from "../../IMG//icon/create.png"
import uploadIcon from "../../IMG//icon/upload.png"
import { Container, Grid } from '@mui/material';
import LoadingPage from "../LoadingPage/LoadingPage"
import { calculateTimeAgo, getDateWithFormat } from '../../Utls/DateTimeUtls'
import { Job } from '../../Service/Job.service';

export default function Home() {

    const [sWidth, setScreenWidth] = useState(window.innerWidth)
    const [listAllJobs, setListAllJobs] = useState([])
    const [listNewestJobs, setListNewestJobs] = useState([])
    const [listHotestJobs, setListHotestJobs] = useState([])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });
        Job.GetAllJobs().then((result) => {
            // console.log(result.splice(0, 10));
            if (result != undefined) {
                setListAllJobs(result.splice(0, 12));
            } else {
                setListAllJobs([])
            }
        })
        Job.GetNewestJobs().then((result) => {
            if (result != undefined) {
                setListNewestJobs(result);
            } else {
                setListNewestJobs([]);
            }
        })
        Job.GetHostestJobs().then((result) => {
            if (result != undefined) {
                setListHotestJobs(result);
            } else {
                setListHotestJobs([]);
            }
        })
    }, [])

    return listAllJobs.length==0 ? <LoadingPage/>:(
        <div>
            <Container maxWidth="xlg" className="container_home">
                <Box sx={{ flexGrow: 2 }}>
                    <Grid container spacing={2} direction={sWidth > 800 ? "row" : "column"}>
                        <Grid item xs={8}>
                            <Typography variant="h5" component="div" style={{ margin: 20 }}>
                                Hotest jobs
                            </Typography>
                            <Carousel className="container_carousel">
                                {
                                    listHotestJobs.map((item, i) => <CardHotJob key={i} item={item} />)
                                }
                            </Carousel>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5" component="div" style={{ margin: 20 }}>
                                Newest jobs
                            </Typography>
                            {listNewestJobs.map((item, i) => <CardNewJob key={i} item={item} />)}
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Typography variant="h5" component="div" style={{ margin: 20 }}>
                        Top Coop
                    </Typography>
                    <Grid container>
                        {TopCoop.map((item, i) => {
                            return (
                                <Grid>
                                    <CardCoop key={i} item={item} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>

                <Box>
                    <Typography variant="h5" component="div" style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>
                        All jobs
                    </Typography >
                    <Grid container className="container_all_jobs">
                        {listAllJobs.map((item, i) => {
                            return (
                                <Grid className="container_grid_hover">
                                    <CardJob key={i} item={item} />
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid container className="container_all_jobs">
                        <a style={{color: 'blue', fontSize: 18, margin: 20}} href='/job'>See all jobs</a>
                    </Grid>
                </Box>
                <Box>
                    <Grid container className="container_create_cv">
                        <Grid className="card_create_cv">
                            <div className="card_create_cv_title">Create new CV</div>
                            <div>You don't have CV, create here!</div>
                            <a href="/createcv">
                                <div className="create_cv_button">
                                    <img src={createIcon} className='create_icon' /> Create CV
                                </div>
                            </a>
                        </Grid>
                        {/* <Grid className="card_upload_cv">
                            <div className="card_create_cv_title">Already have CV</div>
                            <div>If you have CV in your device, upload here!</div>
                            <a href="/"><div className="create_cv_button">
                                <img src={uploadIcon} className='create_icon' /> Upload CV
                            </div></a>
                        </Grid> */}
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

function CardHotJob(props) {

    const createDate = getDateWithFormat(props.item.createDate);

    return (
        <a href={`/job/${props.item._id}`}>
            <Card variant="outlined" sx={{ minHeight: 300, maxHeight: 400, height: 300 }}>
                <div className="card_hot_job">
                    <img
                        style={{ width: '50%', height: 'fit' }}
                        src={props.item.img ? props.item.img : logo}
                        alt={props.item.title}
                        loading="lazy"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="blue" fontWeight='bold' gutterBottom>
                            {props.item.coopName}
                        </Typography>
                        <Typography className="card_title" color="black" fontWeight='bold' gutterBottom>
                            {props.item.title}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            <p className="no-margin-bottom">
                                <div dangerouslySetInnerHTML={{ __html: props.item.tinyDes }} />
                            </p>
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            {props.item.address}
                        </Typography>
                        <Typography sx={{ fontSize: 18, marginTop: 5 }} gutterBottom>
                            {props.item.language.map((item, key) => <span className="language_card">{item}</span>)}
                        </Typography>
                        <Typography sx={{ fontSize: 18, marginTop: 5, color: 'Highlight' }} gutterBottom>
                            Apply: {props.item.listApprove.length}
                        </Typography>
                        <div className="card_hot_create_date">
                            <p style={{ fontStyle: 'italic' }}>{createDate}</p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    )
}

function CardNewJob(props) {
    const jobDetailsUrl = `/job/${props.item._id}`;
    const timeAgo = calculateTimeAgo(props.item.createDate);
    return (
        <a href={jobDetailsUrl} >
            <Card variant="outlined" className="container_card_new_job">
                <div>
                    <p style={{ fontSize: 17, color: 'black', fontWeight: 'bold', marginBottom: 5 }} className="card_title">{props.item.title}</p>
                    <p style={{ fontSize: 17, color: 'red', fontWeight: 'bold', marginBottom: 5 }}>$ {props.item.salary}</p>
                </div>
                <div>
                    <p className="card_date_to">{timeAgo}</p>
                </div>
            </Card>
        </a>
    )
}

function CardCoop(props) {
    return (
        <a href="/">
            <Card variant="outlined" style={{ height: 100, width: 150, borderRadius: '50%', margin: 10 }}>
                <img src={logo} style={{ height: 100, width: 150 }} />
            </Card>
        </a>
    )
}

function CardJob(props) {

    const dateEnd = getDateWithFormat(props.item.endDate);
    const timeAgo = calculateTimeAgo(props.item.createDate);

    return (
        <a href={`/job/${props.item._id}`} >
            <Card variant="outlined" className="container_card_all_job">
                {/* <CardMedia component = "img" image={logo} height = "140" width = "380"/> */}
                <img  src={props.item.img ? props.item.img : logo} className="card_image" />
                <CardContent style={{ width: '100%' }}>
                    <div className="card_title">{props.item.title}</div>
                    <div className="">$ {props.item.salary}</div>
                    <div className="card_date_to"><span>To: {dateEnd}</span></div>
                    <div className="card_date_to">{timeAgo}</div>
                </CardContent>
            </Card>
        </a>
    )
}