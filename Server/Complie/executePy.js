const { exec } = require("child_process");

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `python ${filepath}`,
      (error, stdout, stderr) => {
        try {
          //deleted FILE  after executing
          await fs.unlink(`${filepath}`,(err) => {
            if (err) console.log( err);
            // console.log('successfully deleted /tmp/hello');
          });
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
  executePy,
};