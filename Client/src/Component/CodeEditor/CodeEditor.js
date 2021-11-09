import React, { useEffect, useState } from 'react';
import { Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import AceEditor from "react-ace";
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './style.css';
import 'ace-builds/src-noconflict/mode-javascript'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import { Box } from '@mui/system';

//code
//language
//_id problems

export default function Exercise() {

    const [code, setCode] = useState("");
    // const [mode, setMode] = useState("C++");
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [theme, setTheme] = useState("github");
    const handleChangeTheme = (event) => {
        setTheme(event.target.value);
    }

    const [language, setLanguage] = useState("javascript");
    const handleChangeLanguage = (event) => {
        setLanguage(event.target.value);
    }

    const [fontSize, setFontSize] = useState(14);
    const handleChangeFontSize = (event) => {
        setFontSize(event.target.value);
    }

    return (
        <div className="page_container">
            <ProblemTitle title="Add two number" />
            <Container maxWidth="lg" className="problem_container">
                <Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Problem" {...a11yProps(0)} />
                                <Tab label="Discussions" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            Mô tả cho đề bài
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Thảo luận...
                        </TabPanel>
                    </Box>
                </Box>
            </Container>
            <Container className="problem_container">
                <div className="editor_header_container">
                    <div className="label_selection">Theme</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            sx={{ height: 50 }}
                            value={theme}
                            onChange={handleChangeTheme}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value={'github'}>github</MenuItem>
                            <MenuItem value={'monokai'}>monokai</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="label_selection">Language</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            sx={{ height: 50 }}
                            value={language}
                            onChange={handleChangeLanguage}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value={'javascript'}>javascript</MenuItem>
                            <MenuItem value={'C++'}>C++</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="label_selection">Font size</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            sx={{ height: 50 }}
                            value={fontSize}
                            onChange={handleChangeFontSize}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                            <MenuItem value={22}>22</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <AceEditor
                    width='100%'
                    placeholder='Start Coding'
                    mode={language}
                    theme={theme}
                    name='editor'
                    onChange={currentCode => setCode(currentCode)}
                    fontSize={fontSize}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    setOptions={{
                        fontFamily: 'monospace',
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 1
                    }}
                />
            </Container>
            <Container maxWidth='lg'>
                <div className="editor_header_container">
                    <Button variant="contained" color="success">
                        Submit
                    </Button>
                </div>
            </Container>
        </div>
    )
}

function ProblemTitle(props) {
    return (
        <div className='problem_title'>
            <h2>{props.title}</h2>
        </div>
    )
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}