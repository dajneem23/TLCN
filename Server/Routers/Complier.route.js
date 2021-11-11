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
    if(LANGUAE.indexOf(language)==-1){
        return res.status(500).json({
            'success':false,
            'error':"language error"
        })
        
    }

    try {
            
        console.log(language)
        switch(language){
            case "cpp":{
            var  pathFile = await generateFile(language,code).catch(err=>{
                console.log(err)
             })
            var output =await complierCPP(code,pathFile)
                break;
            }
            case "py":{
                var  pathFile = await generateFile(language,code).catch(err=>{
                    console.log(err)
             })

                var output =await complierPY(code,pathFile)
                break
            }
            case "java":{
                var pathFile = await generateFile(language,code).catch(err=>{console.log(err)})
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
const complierCPP=async (code,pathFile)=>{
    /**
     * 
     * 
     * 
     */
    let output = await executeCpp(pathFile).catch(err=>{
        // console.log(err)
        if(err.stderr){
           
                return  err.stderr.replace(/^[/].*cpp/g, "") 
            
        }
    })

    return output
}
const complierPY = async (code,pathFile)=>{
    /**
     * 
     * 
     */
     let output = await executePy(pathFile).catch(err=>{
        // console.log(err)
        if(err.stderr){
    
                return  err
            
        }
    })

    return output
}
const complierJava = async (code,pathFile)=>{
    /**
     * 
     * 
     */
     let output = await executeJava(pathFile).catch(err=>{
        // console.log(err)
        if(err.stderr){
    
                return  err
            
        }
    })

    return output
}
module.exports = ComplierRouter;