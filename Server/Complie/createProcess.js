const {spawn}  = require("child_process");
const fs = require("fs");
require('format-unicorn') 
const {generateFile} =require('./generateFile')

const Config = require("./config")
const path = require("path");
const testCase=[0,1,3,4]
// docker exec -t py /bin/sh 

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const CreateProcess= async(language,code,testcase,typeInput) =>{
  var  filepath = await generateFile(language,code.formatUnicorn({input:CreateInput(language,testcase,typeInput)})).catch(err=>{console.log(err)})
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);
  let command=''
  switch(language){
  case 'c':{
     command=Config[language].command.formatUnicorn({filepath: filepath,outPath:outPath,outputPath:outputPath,jobId:jobId});
    break;
  }
  case 'cpp':{
     command=Config[language].command.formatUnicorn({filepath: filepath,outPath:outPath,outputPath:outputPath,jobId:jobId,option:'-lstdc++'});
    break;
  }
  default:{ 
     command=Config[language].command.formatUnicorn({filepath: filepath});
    break;
  }
}

let container=Config[language].container

try{
  var process = spawn('docker',['exec','-t',container,'/bin/sh','-c',command],{ cwd: outputPath} )
 var error =process.stderr.on('data',(error)=>{
  return error.toString()
  })
  var result  =  process.stdout.on('data',function(output) {
    console.log(output.toString())
    return output.toString().split('\n')
  });
  // console.log(result)
  return [result,error]
}
catch(e){

throw new Error(e)

}


}

//
const CreateInput=(language,testcase,type) =>{
  let output =''
  switch(language){
    case 'py':{
      testcase.forEach((element,index) => {
        let arg=type=='int'?'arg{index}={case}\n':'arg{index}="{case}"\n'
        output += arg.formatUnicorn({index:index,case:testcase[index]})
      });
      return output
    }
    case 'c':{
      testcase.forEach((element,index) => {
        let arg='';
       switch(type){
         case 'int':{
           arg='int arg{index}={case};\n'
           break;
         }
         case 'float':{
          arg='float arg{index}={case};\n'
          break;
        } 
        case 'string':{
          arg='string arg{index}="{case}";\n'
          break;
        }
       
       }
        output += arg.formatUnicorn({index:index,case:testcase[index]})
      });
      return output
    }
    case'cpp':{
      testcase.forEach((element,index) => {
        let arg='';
       switch(type){
         case 'int':{
           arg='int arg{index}={case};\n'
           break;
         }
         case 'float':{
          arg='float arg{index}={case};\n'
          break;
        } 
        case 'string':{
          arg='string arg{index}="{case}";\n'
          break;
        }
       
       }
        output += arg.formatUnicorn({index:index,case:testcase[index]})
      });
      return output;
    }
    case'java':{
      testcase.forEach((element,index) => {
        let arg='';
       switch(type){
         case 'int':{
           arg='int arg{index}={case};\n'
           break;
         }
         case 'float':{
          arg='float arg{index}={case};\n'
          break;
        } 
        case 'String':{
          arg='String arg{index}="{case}";\n'
          break;
        }
       
       }
        output += arg.formatUnicorn({index:index,case:testcase[index]})
      });
      return output;
    }
    case 'cs':{
      testcase.forEach((element,index) => {
        let arg='';
       switch(type){
         case 'int':{
           arg='int arg{index}={case};\n'
           break;
         }
         case 'float':{
          arg='float arg{index}={case};\n'
          break;
        } 
        case 'string':{
          arg='String arg{index}="{case}";\n'
          break;
        }
       
       }
        output += arg.formatUnicorn({index:index,case:testcase[index]})
      });
      return output;
    }
    default: {
      return ''
    }
  }
}
// console.log(CreateInput('cs',['name',1,2,3,'qwe'],'int'))
CreateProcess('c','#include<stdio.h>\nint main()\n{{input}\nint c=arg1+arg2+arg0;\nprintf("%d",c);\nreturn 0;\n}',[1,2,3],'int').then(data=>console.log)