const { exec } = require("child_process");
const fs = require("fs");

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `docker exec -t py /bin/sh  -c  "python3 ${filepath}"`,
      async  (error, stdout, stderr) => {
        try {
        } catch (error) {
          console.error('there was an error:', error.message);
        }
        resolve([ error, stderr, stdout ]);
      }
    );
  });
};

module.exports = {
  executePy,
};