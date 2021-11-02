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
         `gcc ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
     async (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        try {
      
          await fs.unlink(`${outPath}`,(err) => {
            if (err) console.log(err); 
            // console.log('successfully deleted /tmp/hello');
          });
          await fs.unlink(`${filepath}`,(err) => {
            if (err) console.log( err);
            // console.log('successfully deleted /tmp/hello');
          });
        } catch (error) {
          console.error('there was an error:', error.message);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};