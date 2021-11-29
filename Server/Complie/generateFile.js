const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  console.log(filepath,content);
  
  try {
  await fs.writeFileSync(filepath, content);
  const data = await fs.readFileSync(filepath,{encoding: "utf8"}); 
  return filepath;
} catch(err) {
  console.error(err);
}
};

module.exports = {
  generateFile,
};