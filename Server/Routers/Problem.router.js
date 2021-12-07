const JWT = require("jsonwebtoken");
const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport");
const dotenv = require("dotenv");
const Job = require("../Models/Job");
const User = require("../Models/User");
const Problem = require("../Models/Problem");
const Submition = require("../Models/Submition");
dotenv.config();

const ProblemRouter = express.Router();

ProblemRouter.post(
  "/createNewProblem",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const body = req.body;

    //Todo: required authentication

    if (body == null || body == undefined) {
      return res
        .status(500)
        .json({ message: "Body is required", msgError: true });
    }
    const newProblem = new Problem(body);
    newProblem.save(async (err, ok) => {
      if (err) {
        return res.status(500).json({
          message: { msgBody: err.message },
          msgError: true,
        });
      }

      return res.status(200).json({
        message: {
          msgBody: "Create new problem successfully",
          newProblem: newProblem,
        },
        msgError: false,
      });
    });
  }
);

ProblemRouter.get("/getAllProblems", async (req, res) => {
  const allProblem = await Problem.find({ isDelete: false });

  return res.status(200).json({
    message: "Get successfully",
    listAllProblems: allProblem,
    msgError: false,
  });
});

ProblemRouter.get("/getProblemById", async (req, res) => {
  const id = req.query.id;
  const problem = await Problem.findById(id);

  if (problem == null || problem == undefined) {
    return res
      .status(404)
      .json({ message: "Can not find this problem", msgError: true });
  }

  if (problem.isDelete) {
    return res
      .status(404)
      .json({ message: "Can not find this problem", msgError: true });
  }

  return res.status(200).json({
    message: "Get successfully",
    problem: problem,
    msgError: false,
  });
});
ProblemRouter.get("/submit", async (req, res) => {
  const userId = req.query.userId;
  const problemId = req.query.problemId;
  const listSubmit = await Submition.find(
    { userId: userId, problemId: problemId },
    (error, result) => {
      if (error) {
        console.log(error);
      }
      if (!result) {
        return res
          .status(404)
          .json({ message: "Can not find this Submiittion", msgError: true });
      }
      return res.status(200).json({ message: "Success",result: [...result] });
    }
  );
});

module.exports = ProblemRouter;
