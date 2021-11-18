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
     
        //  await fs.unlink(`${outPath}`,(err) => {
        //    if (err) console.log(err); 
        //    // console.log('successfully deleted /tmp/hello');
        //  });
        //  await fs.unlink(`${filepath}`,(err) => {
        //    if (err) console.log( err);
        //    // console.log('successfully deleted /tmp/hello');
        //  });
       } catch (error) {
         console.error('there was an error:', error.message);
       }
      //  if(error){console.log(error)}
      //  if(stderr){console.log(stderr)}
      //  if(stdout){console.log(stdout)}
        // error && reject({ error, stderr });
        // stderr && reject(stderr);
        resolve([ error, stderr,stdout ]);
      }
    );
  });
};

module.exports = {
  executeCpp,
};