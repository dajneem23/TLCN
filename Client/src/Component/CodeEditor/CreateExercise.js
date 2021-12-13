/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import TagInput from "../TagsInput/TagInput";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import PropTypes from "prop-types";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AceEditor from "react-ace";
import { FormControl, MenuItem, Select, Container, Tab, Tabs, Typography, Box } from "@mui/material";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import { Compile } from "../../Service/Compile.service";
import { AuthContext } from "../../Service/Auth.context";
// import "./style.css";

export default function CreateExercise() {
    const { user } = useContext(AuthContext);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [type, setType] = useState(1);

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const [javaCode, setJavaCode] = useState(codeDefault.codeJava);
    const [pythonCode, setPythonCode] = useState(codeDefault.codePy);
    const [cCode, setCCode] = useState(codeDefault.codeC);
    const [cppCode, setCppCode] = useState(codeDefault.codeCpp);
    const [csCode, setCsCode] = useState(codeDefault.codeCs);

    const onSubmit = async () => {
        const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const body = {
            title,
            description,
            category,
            type,
            codeDefault: {
                c: cCode,
                cpp: cppCode,
                cs: csCode,
                py: pythonCode,
                java: javaCode
            },
            testCase: [
                {
                    input: input,
                    output: output,
                    type: {}
                }
            ],
            author: user.userName,
        }
        Compile.CreateExercise(body).then((result) => {
            if (result.status == 200) {
                alert("Create successfully!");
                window.location.reload();
            } else {
                alert("Create fail, please try later");
            }
        })
    }

    const [input, setInput] = useState([]);
    function handleSelecetedInput(items) {
        setInput(items);
    }

    const [output, setOutput] = useState([]);
    function handleSelecetedOutput(items) {
        setOutput(items);
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row create_exercise_container ">
                <form className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Create Exercise</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12" style={{ minHeight: "300px" }}>
                                <label className="labels"> Description</label>
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={(editorState) => setEditorState(editorState)}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels">Type</label>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <Select
                                        value={type}
                                        onChange={handleChangeType}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={1}>Easy</MenuItem>
                                        <MenuItem value={2}>Medium</MenuItem>
                                        <MenuItem value={3}>Hard</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="mt-5">
                            <label className="labels">Code Default</label>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label="Java" {...a11yProps(0)} />
                                    <Tab label="Python" {...a11yProps(1)} />
                                    <Tab label="C" {...a11yProps(2)} />
                                    <Tab label="C++" {...a11yProps(3)} />
                                    <Tab label="C#" {...a11yProps(4)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <AceEditor
                                    width="100%"
                                    placeholder="Start Coding"
                                    mode="java"
                                    theme="github"
                                    name="editor"
                                    onChange={(code) => setJavaCode(code)}
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={javaCode}
                                    setOptions={{
                                        fontFamily: "monospace",
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 1,
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <AceEditor
                                    width="100%"
                                    placeholder="Start Coding"
                                    mode="python"
                                    theme="github"
                                    name="editor"
                                    onChange={(code) => setPythonCode(code)}
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={pythonCode}
                                    setOptions={{
                                        fontFamily: "monospace",
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 1,
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <AceEditor
                                    width="100%"
                                    placeholder="Start Coding"
                                    mode="java"
                                    theme="github"
                                    name="editor"
                                    onChange={(code) => setCCode(code)}
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={cCode}
                                    setOptions={{
                                        fontFamily: "monospace",
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 1,
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <AceEditor
                                    width="100%"
                                    placeholder="Start Coding"
                                    mode="java"
                                    theme="github"
                                    name="editor"
                                    onChange={(code) => setCppCode(code)}
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={cppCode}
                                    setOptions={{
                                        fontFamily: "monospace",
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 1,
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <AceEditor
                                    width="100%"
                                    placeholder="Start Coding"
                                    mode="java"
                                    theme="github"
                                    name="editor"
                                    onChange={(code) => setCsCode(code)}
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={csCode}
                                    setOptions={{
                                        fontFamily: "monospace",
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 1,
                                    }}
                                />
                            </TabPanel>
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Input</label>
                            <TagInput
                                selectedTags={handleSelecetedInput}
                                fullWidth
                                variant="outlined"
                                id="input"
                                name="input"
                                allowDuplicated = {true}
                                value={input}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Output</label>
                            <TagInput
                                selectedTags={handleSelecetedOutput}
                                fullWidth
                                variant="outlined"
                                id="output"
                                name="output"
                                allowDuplicated = {true}
                                value={output}
                            />
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="button" onClick={() => onSubmit()}>
                                CREATE
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const codeDefault = {
    codeC: '#include<stdio.h>\nn\nint main(int argc, char *argv[])\n{\n return 0;\n}',
    codeCpp: '#include<iostream>\nint main(int argc, char *argv[])\n{\n return 0;\n \n}',
    codeCs: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Text;\nusing System.Threading.Tasks;\npublic class NewExercise\n{\n         \n    public static void Main(string[] args){\n         \n }\n}',
    codeJava: 'public class SubTwoNumber{\n\n  public static void main(String []args){\n   \n    \n    \n  }\n\n}',
    codePy: 'import math\nimport os\nimport random\nimport re\nimport sys\n'
}