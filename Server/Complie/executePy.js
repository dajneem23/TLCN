const { exec } = require("child_process");
const fs = require("fs");

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `docker exec -t py /bin/sh  -c  "python3 ${filepath}"`,
      async  (error, stdout, stderr) => {
        try {
          //deleted FILE  after executing
          // await fs.unlink(`${filepath}`,(err) => {
          //   if (err) console.log( err);
          //   // console.log('successfully deleted /tmp/hello');
          // });
        } catch (error) {
          console.error('there was an error:', error.message);
        }
        // if(error){
        //   console.log(error)
        // }
        // if(stderr){console.log(stderr)}
        // error && reject({ error, stderr });
        // stderr && reject(stderr);
        resolve([ error, stderr, stdout ]);
      }
    );
  });
};

module.exports = {
  executePy,
};