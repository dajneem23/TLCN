const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

const executeJava = (filepath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    exec(
      `docker exec -t java /bin/sh  -c " java ${filepath}" ` ,
      async  (error, stdout, stderr) => {
        try {
        } catch (error) {
          console.error('there was an error:', error.message);
        }
        resolve([ error, stderr,stdout]);
      }
    );
  });
};

module.exports = {
  executeJava,
};