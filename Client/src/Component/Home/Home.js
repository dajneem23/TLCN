import React, { useEffect, useState } from 'react';
import { BaseListJob, NewListJob, TopCoop } from './BaseListJob';
import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css';
import logo from "../../IMG/woekday.jpg"
import { Container, Grid } from '@mui/material';
import { getDateWithFormat } from '../../Utls/DateTimeUtls'

export default function Home() {

    const [sWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });
    })

    return (
        <Container maxWidth="xlg" className="container_home">
            <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={2} direction={sWidth > 800 ? "row" : "column"}>
                    <Grid item xs={8}>
                        <Typography variant="h5" component="div" style={{ margin: 20 }}>
                            Hotest jobs
                        </Typography>
                        <Carousel className="container_carousel">
                            {
                                BaseListJob.map((item, i) => <CardHotJob key={i} item={item} />)
                            }
                        </Carousel>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" component="div" style={{ margin: 20 }}>
                            Newest jobs
                        </Typography>
                        {NewListJob.map((item, i) => <CardNewJob key={i} item={item} />)}
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

            <Container maxWidth='xlg'>
                <Box>
                    <Typography variant="h5" component="div" style={{ margin: 20 }}>
                        All jobs
                    </Typography >
                    <Grid container className = "container_all_jobs">
                        {BaseListJob.map((item, i) => {
                            return (
                                <Grid>
                                    <CardJob key={i} item={item} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Container>
        </Container>
    )
}

function CardHotJob(props) {

    const createDate = getDateWithFormat(props.item.createDate);

    return (
        <a href="/">
            <Card variant="outlined" sx={{ height: 300 }}>
                <div className="card_hot_job">
                    <img
                        style={{ width: '50%', height: 'fit' }}
                        src={logo}
                        alt={props.item.title}
                        loading="lazy"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="blue" fontWeight='bold' gutterBottom>
                            {props.item.coopName}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="black" fontWeight='bold' gutterBottom>
                            {props.item.title}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            {props.item.description}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            {props.item.address}
                        </Typography>
                        <Typography sx={{ fontSize: 18, marginTop: 5 }} gutterBottom>
                            {props.item.listLang.map((item, key) => <span className="language_card">{item}</span>)}
                        </Typography>
                        <Typography sx={{ fontSize: 18, marginTop: 5, color: 'Highlight' }} gutterBottom>
                            {props.item.numberApply} jobs
                        </Typography>
                        <div style={{ position: 'absolute', bottom: 40, right: 10 }}>
                            <p style={{ fontStyle: 'italic' }}>{createDate}</p>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </a>
    )
}

function CardNewJob(props) {
    return (
        <a href="/">
            <Card variant="outlined" style={{ height: 100, flexDirection: 'row', padding: 10 }}>
                <div>
                    <p style={{ fontSize: 12, color: 'gray', fontWeight: 'bold', marginBottom: 5 }}>{props.item.coopName}</p>
                    <p style={{ fontSize: 17, color: 'black', fontWeight: 'bold', marginBottom: 5 }}>{props.item.title}</p>
                    <p style={{ fontSize: 17, color: 'yellow', fontWeight: 'bold', marginBottom: 5 }}>$ {props.item.salary}</p>
                </div>
                <div>
                    <p>sadxzc</p>
                </div>
            </Card>
        </a>
    )
}

function CardCoop(props) {
    return (
        <a href="/">
            <Card variant="outlined" style={{ height: 100, width: 150, borderRadius: 10, margin: 20 }}>
                <img src={logo} style={{ height: 100, width: 150 }} />
            </Card>
        </a>
    )
}

function CardJob(props) {
    return (
        <a href="/" >
            <Card variant="outlined" style={{ height: 200, width: 400, borderRadius: 10, margin: 20, justifyContent: 'center' }}>
                <img src={logo} style={{ height: 150, width: 350 }} />
                <CardContent>
                    <div> abc</div>
                </CardContent>
            </Card>
        </a>
    )
}