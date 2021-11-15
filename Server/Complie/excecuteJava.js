const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

const executeJava = (filepath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    exec(
      `java ${filepath} ` ,
      async  (error, stdout, stderr) => {
        try {
          //deleted file  after executing
        //   await fs.unlink(`${filepath}`,(err) => {
        //     if (err) console.log( err);
        //     // console.log('successfully deleted /tmp/hello');
        //   });
        } catch (error) {
          console.error('there was an error:', error.message);
        }
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeJava,
};