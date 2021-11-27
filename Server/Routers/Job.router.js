const JWT = require('jsonwebtoken')
const express = require('express');
const passport = require('passport');
const passportConfig = require('../passport');
const dotenv = require('dotenv')
const Job = require('../Models/Job');
const User = require('../Models/User');
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
        message: "Get successfully",
        listAllJobs: listJobs,
        msgError: false
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
        message: "Get successfully",
        listNewestJob: listNewestJob,
        msgError: false
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
        message: "Get successfully",
        listHotestJobs: listHotestJobs,
        msgError: false

    })

})

/**
 * Create new Job
 * 
 * ex: localhost:6000/job/createNewJob
 */
//passport.authenticate('jwt',{session : false})
JobRouter.post('/createNewJob', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const newJob = new Job(req.body);
    const { userName, _id, role } = req.user;
    // if role is not co-op
    if (role == null || role != 1) {
        return res.status(403).json({ 'message': ' Forbidden You dont have permission to access on one page', msgError: true });
    }

    newJob.createBy = userName;
    newJob.save(async (err, ok) => {
        if (err) {
            return res.status(500).json({
                message: { msgBody: err.message },
                msgError: true
            })
        }

        let user = await User.findById(_id);
        user.listJobDetails.push(ok._id);
        user.save();

        return res.status(200).json({
            message: { msgBody: "Create new job successfully", newJob: newJob },
            msgError: false
        })
    })

})

JobRouter.get('/getJobById', async (req, res) => {
    const id = req.query.id;
    const job = await Job.findById(id);

    if (job == null || job == undefined ) {
        return res.status(403).json({ 'message': 'Can not find this job', msgError: true });
    }

    if (job.isDelete) {
        return res.status(403).json({ 'message': 'Can not find this job', msgError: true });
    }

    return res.status(200).json({
        message: "Get successfully",
        job: job,
        msgError: false
    })

})

JobRouter.get('/getJobsByCoopId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("getJobsByCoopId")
    const { userName, _id, role } = req.user;
    // if role is not co-op
    if (role == null || role != 1) {
        return res.status(403).json({ 'message': ' Forbidden You dont have permission to access on one page', msgError: true });
    }

    const listJobs = await Job.find({'createBy' : userName});
    
    return res.status(200).json({
        message: "Get successfully",
        listJobs: listJobs,
        msgError: false
    })
})

JobRouter.get('/getSuggestJobsByJobId', async (req, res) => {
    const id = req.query.id;
    const job = await Job.findById(id);

    if (job == null || job == undefined ) {
        return res.status(403).json({ 'message': 'Can not find this problem', msgError: true });
    }

    const listSuggest = await Job.find({
        $and : [
            {$or : [ {'category' : job.category}, {'major' : job.major}]}, 
            {'isDelete' : false},
            {'_id' : {$ne : job._id}}
        ]});

    return res.status(200).json({
        message: "Get successfully",
        listJobs: listSuggest,
        msgError: false
    })

})


module.exports = JobRouter;