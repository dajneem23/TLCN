const express = require("express");
const { CreateProcess } = require("../Complie/createProcess");
const Problem = require('../Models/Problem');
ComplierRouter = express.Router();
const LANGUAE = ["cpp", "py", "java", "cs", "c"];
ComplierRouter.post("/", async (req, res) => {
  const { code, language, problemId, userId } = req.body;
  if (!code) {
    return res.status(500).json({
      success: false,
      error: "code is required",
    });
  }
  if (LANGUAE.indexOf(language) == -1) {
    return res.status(500).json({
      success: false,
      error: "language error",
    });
  }
  const problem = await Problem.findById(problemId);

  if (problem == null || problem == undefined || problem.isDelete) {
    return res.status(404).json({ 'message': 'Can not find this problem', msgError: true });
  }

  try {
    var [output, error] = CreateProcess(language, code, problem.testcase.pop(), prolem.type[language]);
  } catch (error) {
    return res.status(500).json({
      "message": error.message,
      msgError: true
    })
  }
  return res.status(200).json({
    code: code,
    language: language,
    output: output.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    ),
    error: error,
  });
});

module.exports = ComplierRouter;
