const express = require('express');
const {generateFile} =require('../Complie/generateFile')
const {executePy} =require('../Complie/executePy')
const {executeCpp}=require('../Complie/executeCpp')
const {executeJava} = require('../Complie/excecuteJava')
ComplierRouter=express.Router();
const LANGUAE=['cpp','py','java','cs'];
ComplierRouter.post('/',async (req,res)=>{
    const {code,language} =req.body
    // console.log(content.userName)
    if(!code){
        return res.status(500).json({
            'success':false,
            'error':"code is required"
        })
        
    }


    try {
            
        console.log(language)
        switch(language){
            case "c":
            case "cpp":{
    
            var output =await complierCPP(language,pathFile)
                break;
            }
            case "py":{
           

                var output =await complierPY(code,pathFile)
                break
            }
            case "java":{
                var output =await  complierJava(code,pathFile)
                break
            }
            default: {
                return res.status(500).json({
                    "message":"language not support"
                })
            }
        }
        

    } catch (error) {
        throw error
    }
//    console.log(output)
    return res.status(200).json({
        'code':code,
        'language':language,
        'output':output
    })

})
const complierCPP=async (language,pathFile)=>{
    /**
     * 
     * 
     * 
     */
    let [error,stderr, output] = await executeCpp(pathFile,language)
    if(error) {console.log(error);}
    if(stderr) {console.log(stderr);}
    console.log(output)
    return output.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
const complierPY = async (code,pathFile)=>{
    /**
     * 
     * 
     */
     let [error,stderr, output] = await executePy(pathFile)
     if(error) {console.log(error);}
     if(stderr) {console.log(stderr);}
    return output.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
const complierJava = async (code,pathFile)=>{
    /**
     * 
     * 
     */
     let [error,stderr, output]  = await executeJava(pathFile)
        if(error) {console.log(error);}
        if(stderr) {console.log(stderr);}
    return output.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
module.exports = ComplierRouter;