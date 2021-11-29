const { spawnSync } = require("child_process");
const fs = require("fs");
require("format-unicorn");
const { generateFile } = require("./generateFile");
const Config = require("./config");
const path = require("path");
const testCase = [0, 1, 3, 4];
// docker exec -t py /bin/sh

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const CreateProcess = async (language, code, testcase, typeInput) => {
  console.log(...testcase);
  var filepath = await generateFile(
    language,
    code.formatUnicorn({ input: CreateInput(language, testcase, typeInput) })
  ).catch((err) => {
    console.log(err);
  });
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);
  let command = "";
  switch (language) {
    case "c": {
      command = Config[language].command.formatUnicorn({
        filepath: filepath,
        outPath: outPath,
        outputPath: outputPath,
        jobId: jobId,
      });
      break;
    }
    case "cpp": {
      command = Config[language].command.formatUnicorn({
        filepath: filepath,
        outPath: outPath,
        outputPath: outputPath,
        jobId: jobId,
        option: "-lstdc++",
      });
      break;
    }
    default: {
      command = Config[language].command.formatUnicorn({ filepath: filepath });
      break;
    }
  }

  let container = Config[language].container;

  try {
    var process = spawnSync(
      "docker",
      [
        "exec",
        "-t",
        container,
        "/bin/sh",
        "-c",
        command + " " + testcase.join(" "),
      ],
      { cwd: outputPath }
    );
    return [
      process.stdout ? process.stdout.toString() : "",
      process.stder ? process.stder.toString() : "",
    ];
  } catch (e) {
    throw new Error(e);
  }
};

const CreateInput = (language, testcase, type) => {
  let output = "";
  switch (language) {
    case "py": {
      testcase.forEach((element, index) => {
        let arg =
          type == "string" ? 'arg{index}="{case}"\n' : "arg{index}={case}\n";
        output += arg.formatUnicorn({ index: index, case: testcase[index] });
      });
      return output;
    }
    case "c": {
      testcase.forEach((element, index) => {
        let arg = "";
        switch (type) {
          case "string": {
            arg = 'string arg{index}="{case}";\n';
            break;
          }
          default: {
            arg = `${type} arg{index}={case};\n`;
            break;
          }
        }
        output += arg.formatUnicorn({ index: index, case: testcase[index] });
      });
      return output;
    }
    case "cpp": {
      testcase.forEach((element, index) => {
        let arg = "";
        switch (type) {
          case "string": {
            arg = 'string arg{index}="{case}";\n';
            break;
          }
          default: {
            arg = `${type} arg{index}={case};\n`;
            break;
          }
        }
        output += arg.formatUnicorn({ index: index, case: testcase[index] });
      });
      return output;
    }
    case "java": {
      testcase.forEach((element, index) => {
        let arg = "";
        switch (type) {
          case "String": {
            arg = 'String arg{index}="{case}";\n';
            break;
          }
          default: {
            arg = `${type} arg{index}={case};\n`;
            break;
          }
        }
        output += arg.formatUnicorn({ index: index, case: testcase[index] });
      });
      return output;
    }
    case "cs": {
      testcase.forEach((element, index) => {
        let arg = "";
        switch (type) {
          case "String": {
            arg = 'String arg{index}="{case}";\n';
            break;
          }
          default: {
            arg = `${type} arg{index}={case};\n`;
            break;
          }
        }
        output += arg.formatUnicorn({ index: index, case: testcase[index] });
      });
      return output;
    }
    default: {
      return "";
    }
  }
};
// console.log(CreateInput('cs',['name',1,2,3,'qwe'],'int'))
// CreateProcess(
//   "c",
//   '#include<stdio.h>\nint main(int argc, char *argv[])\n{int a,b,c;sscanf(argv[0], "%d", &a);\nsscanf(argv[1], "%d", &b);\nsscanf(argv[2], "%d", &c);\nprintf("%d",a+b+c);\nreturn 0;\n}',
//   [1, 2, 3,4],
//   "int"
// ).then((data) => console.log);
//  CreateProcess('java','public class Test {\npublic static void main(String[] args){\n{input}\n int c= arg0+arg1+arg2;\n\nSystem.out.println(c);}\n}\n',[1,2,3],'int').then(data=>console.log)
// CreateProcess('c','#include<stdio.h>\n int sum(int n){\nint add = 0;\nfor(int i=1; i<=n; i++){add += i;}\nreturn add;\n }\nint main()\n{{input}\nint c=arg1+arg2+arg0;\nprintf("%d",sum(arg0));\nreturn 0;\n}\n',["5",2,3],'int').then(data=>console.log)
// CreateProcess('py','{input}\nprint(arg0+arg1+arg2)',["5",2,3],'int').then(console.log)
module.exports = {
  CreateProcess,
};
