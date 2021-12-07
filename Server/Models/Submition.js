const mongose = require('mongoose');

const Submition = new mongose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        problemId:{
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        result: {
            type: Object,
        },
        runTime: {
            type: String,
        },
        submitDate:{
            type: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    }
)

module.exports = mongose.model('Submition', Submition)