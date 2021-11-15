const JWT = require('jsonwebtoken')
const express = require('express');
const passport = require('passport');
const passportConfig = require('../passport');
const dotenv = require('dotenv')
const Job = require('../Models/Job');
dotenv.config();

const TOP3 = 3;
const TOP5 = 5;

const JobRouter = express.Router();

/**
 * Get All Job in database
 *
 * ex: localhost:6000/job/getAllJobs
 */
JobRouter.get('/getAllJobs', async (req, res) => {
    console.log("GET getAllJobs");
    let listJobs = await Job.find({ 'isDelete': false });
    res.status(200).json({
        listAllJobs: listJobs
    })
})

/**
 * Get Top 3 Newest Job in database
 * 
 * ex: localhost:6000/job/getNewestJobs
 */
JobRouter.get('/getNewestJobs', async (req, res) => {
    console.log("GET getNewstJobs " + new Date());

    let listJobs = await Job.find({ 'isDelete': false }).where('endDate').gt(new Date().getTime());

    listJobs.sort((a, b) => a.createDate < b.createDate ? 1 : -1);

    let listNewestJob = [];
    for (let i = 0; i < (TOP3 > listJobs.length ? listJobs.length : TOP3); i++) {
        listNewestJob.push(listJobs[i])
    }

    res.status(200).json({
        listNewestJob: listNewestJob
    })

})

/**
 * Get Top 5 Hotest Job in database
 * 
 * localhost:6000/job/getHotestJobs
 */
 JobRouter.get('/getHotestJobs', async (req, res) => {
    console.log("GET getHostJobs " + new Date());

    let listJobs = await Job.find({ 'isDelete': false }).where('endDate').gt(new Date().getTime());

    listJobs.sort((a, b) => a.listApply.length < b.listApply.length ? 1 : -1);

    let listHotestJobs = [];
    for (let i = 0; i < (TOP5 > listJobs.length ? listJobs.length : TOP5); i++) {
        listHotestJobs.push(listJobs[i])
    }

    res.status(200).json({
        listHotestJobs: listHotestJobs
    })

})

/**
 * Create new Job
 * 
 * ex: localhost:6000/job/createNewJob
 */
//passport.authenticate('jwt',{session : false})
JobRouter.post('/createNewJob', (req, res) => {
    console.log("POST job/createNewJob " + new Date());
    const newJob = new Job(req.body);
    newJob.save(err => {
        if (err) {
            res.status(500).json({
                message: { msgBody: err.message },
                msgError: true
            })
            return
        } else {
            res.status(200).json({
                message: { msgBody: "Create new job successfully", newJob: newJob },
                msgError: false
            })
            return
        }
    })
})


module.exports = JobRouter;