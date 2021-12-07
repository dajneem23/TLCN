const express = require("express");
const { CreateProcess } = require("../Complie/createProcess");
const Problem = require("../Models/Problem");
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
      error: "Language error",
    });
  }
  const problem = await Problem.findById(problemId);

  if (problem == null || problem == undefined || problem.isDelete) {
    return res.status(404).json({ message: "Can not find this problem", msgError: true });
  }
  try {
    const before = Date.now();
    var Results = await testCode(language,code,problem)
    const after = Date.now();
    var runtime = after - before
    return res.status(200).json({
      code: code,
      language: language,
      runtime:runtime,
       ...Results,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      msgError: true,
    });
  }
});
const testCode=async (language,code,problem)=> {
  var Results = [];
  var count=0
  var numTestcase=problem.testCase.length;
  for (const testCase of problem.testCase){
    var [output, error] = await CreateProcess(
      language,
      code,
      testCase.input,
      testCase.type[language]
    );
    for( let i =0;i< testCase.output.length;i++){
      count += testCase.output[i]==output[i]
    }
    Results.push({input: testCase.input,expectOutput:testCase.output ,output: output }); 
  }

  return {results:Results,match:`${count}/${numTestcase}`};
}

module.exports = ComplierRouter;
