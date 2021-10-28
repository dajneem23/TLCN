const express = require('express');
const {generateFile} =require('../generateFile')
const {executeCpp}=require('../executeCpp')
ComplierRouter=express.Router();
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
        var  pathFile = await generateFile(language,code).catch(err=>{
            console.log(err)
        })
        // console.log(pathFile)
        var output = await executeCpp(pathFile).catch(err=>{
            console.log(err)
        })
    } catch (error) {
        throw error
    }
   
    return res.status(500).json({
        'code':code,
        'language':language,
        'filePath':pathFile,
        'output':output
    })

})
module.exports = ComplierRouter;