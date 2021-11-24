const mongose = require('mongoose');

const Job = new mongose.Schema(
    {
        title: {
            type: String, required: true
        },
        position: {
            type: Array
        },
        description: {
            type: String, required: true
        },
        salary: {
            type: String
        },
        img: {
            type: String
        },
        address: {
            type: String
        },
        language: {
            type: Array
        },
        category: {
            type: String
        },
        listApply: {
            type: Array
        },
        listApprove: {
            type: Array
        },
        major: {
            type: String
        },
        startDate: {
            type: Number, default: new Date().getTime()
        },
        endDate: {
            type: Number, default: new Date().getTime()
        },
        createBy: {
            type: String, required: true
        },
        createDate: {
            type: Number, default: new Date().getTime()
        },
        isDelete: {
            type: Boolean, default: false
        }
    }
)

module.exports = mongose.model('Job', Job)