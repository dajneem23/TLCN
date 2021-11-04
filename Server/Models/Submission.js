const mongose = require('mongoose');

const Submission = new mongose.Schema(
    {
        problemId:{
            type: String,
            required: true,
        },
        submitter:{
            type: String,
            required: true,
        },
        code:{
            type: String,
            required: true,
        },
        language:{
            type: String,
            required: true,
        },
        results:{
            type:String
        },
        submitTime:{
            type: Date,
        }
    }
)


module.exports=mongose.model('Submission',Submission)