const mongose = require('mongoose');
const Submition = require('./Submition');

const TestCase = new mongose.Schema(
    {
        input: {
            type: Array
        },
        output: {
            type: Array
        },
        typeC: {
            type: String
        },
        typeCP: {
            type: String
        },
        typeCS: {
            type: String
        },
        typeJava: {
            type: String
        },
        typePy: {
            type: String
        },
    }
)

const Problem = new mongose.Schema(
    {
        title: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
        },
        author: {
            type: String,
        },
        listSubmits: {
            type: [Submition],
        },
        testCase: {
            type: [TestCase],
            required: true,
        },
        codeC: {
            type: String,
        },
        codeCP: {
            type: String,
        },
        codeCS: {
            type: String,
        },
        codePy: {
            type: String,
        },
        codeJava: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    }
)

module.exports = mongose.model('Problem', Problem);