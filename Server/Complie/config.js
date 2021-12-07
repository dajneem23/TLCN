module.exports = Config={
    py: {
        "container":"py",
        "command":"python3 {filepath}",
        // "main":"import sys\n{input}\n{code}"
    },
    c:{
        "container":"gcc",
        "command":"gcc {filepath} -o {outPath} && cd {outputPath} &&  ./{jobId}.out",
        // "main":"#include<stdio.h>\nint main(int argc, char *argv[]){\n{input}\n{code}\nreturn 0;\n}"
    },
    cpp:{
        "container":"gcc",
        "command":"gcc {filepath} {option} -o {outPath} && cd {outputPath} &&  ./{jobId}.out",
        // "main":"#include <iostream>\nint main(int argc, char* argv[]) {\n{input}\n{code}\nreturn 0;\n}"
    },
    java:{
        "container":"java",
        "command":"java {filepath}",
        // "main":"public class Test {\npublic static void main(String[] args){\n{input}\n{code}\n}\n}\n"
    },
    cs:{
        "container":"mono",
        "command":"cd {codePath} && mcs -out:{jobId}.exe {jobId}.cs && mono {jobId}.exe"  ,
        // "main":"using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Text;\nusing System.Threading.Tasks;\nnamespace ConsoleApp1\n{\nclass Program\n{\nstatic void Main(string[] args)\n{\n{input}\n{code}\n}\n}\n}\n"
    }
}