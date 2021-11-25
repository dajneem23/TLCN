const mongose = require('mongoose');

const Submition = new mongose.Schema(
    {
        submitter: {
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
            type: String
        },
        submitTime: {
            type: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    }
)

module.exports = Submition;