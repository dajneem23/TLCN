const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
         `docker exec -t gcc /bin/sh  -c "gcc ${filepath} -o ${outPath} && cd ${outputPath} &&  ./${jobId}.out"`,
     async (error, stdout, stderr) => {
       try {
     
       } catch (error) {
         console.error('there was an error:', error.message);
       }
        resolve([ error, stderr,stdout ]);
      }
    );
  });
};

module.exports = {
  executeCpp,
};