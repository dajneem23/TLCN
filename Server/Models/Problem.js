const mongose = require('mongoose');

const Problem = new mongose.Schema(
    {
        title: {
            type: String,
            required: true,

        },
        description:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        type:{
            type: String,
        },
        author:{
            type: String,
        },
        testCase:{
            type: Array
        },
        isDeleted:{
            type: Boolean,
        }
    }
)


module.exports=mongose.model('Problem',Problem)