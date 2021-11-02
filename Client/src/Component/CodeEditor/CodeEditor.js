import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs, Typography } from "@mui/material";
import AceEditor from "react-ace";
import PropTypes from 'prop-types';

import './style.css';
import 'ace-builds/src-noconflict/mode-javascript'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
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

    return (
        <div className="page_container">
            <ProblemTitle title="Add two number" />
            <Container maxWidth="lg" className="problem_container">
                <Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Item One" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </Box>
                </Box>
                {/* <AceEditor
                    placeholder='Start Coding'
                    mode='javascript'
                    theme='monokai'
                    name='basic-code-editor'
                    onChange={currentCode => setCode(currentCode)}
                    fontSize={18}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                /> */}
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