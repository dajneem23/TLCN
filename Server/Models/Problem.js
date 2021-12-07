const mongose = require("mongoose");
const Submition = require("./Submition");

const TestCase = new mongose.Schema({
    input: {
        type: Array,
    },
    output: {
        type: Array,
    },
    type: {
        c: {
            type: String,
        },
        cpp: {
            type: String,
        },
        cs: {
            type: String,
        },
        java: {
            type: String,
        },
        py: {
            type: String,
        },
    },

});

const Problem = new mongose.Schema({
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
        type: Array,
    },
    testCase: {
        type: [TestCase],
        required: true,
    },
    codeDefault: {
        c: {
            type: String,
        },
        cpp: {
            type: String,
        },
        cs: {
            type: String,
        },
        py: {
            type: String,
        },
        java: {
            type: String,
        }
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongose.model("Problem", Problem);
