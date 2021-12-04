import React, { useEffect, useState, useContext } from "react";
import { Container, Tab, Tabs, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AceEditor from "react-ace";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./style.css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
// there are many themes to import, I liked monokai.
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import { Box } from "@mui/system";
import { Compile } from "../../Service/Compile.service";
import { useParams } from "react-router";
import { AuthContext } from "../../Service/Auth.context";

//code
//language
//_id problems
const PY = "python";
const C = "c";
const CP = "c++";
const CS = "c#";
const JV = "java";

export default function Exercise() {
  const { id } = useParams();
  const { user, setUser, isAuthenticated, setisAuthenticated, info, setinfo } =
    useContext(AuthContext);
  const [problem, setProblem] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState("");
  const [code, setCode] = useState("");
  const [button, setButton] = useState({ enable: false, color: "success" });
  const [output, setOutput] = useState();
  const [lang, setLang] = useState(PY);
  // const [mode, setMode] = useState("C++");
  const [value, setValue] = useState(0);
  const [listSubmited, setListSubmited] = useState([]);
  useEffect(() => {
    Compile.GetSubmitByUserId(user._id || "619a0ed806d1fa5372cab99f", id).then(
      (result) => {
        // delete result.message;
        result.result.map((item, i) => {
          delete item._id;
          delete item.isDeleted;
          delete item.__v;
          delete item.userId;
          delete item.problemId;
          item.submitDate = new Date(item.submitDate).toLocaleString();
          item.result = item.result.match;
          //item.results= item.resluts.match;
          console.log("item1", item);
        });
        setListSubmited(result.result);
        console.log(result.result);
      }
    );
  }, []);
  console.log("Sub", listSubmited);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [theme, setTheme] = useState("github");
  const handleChangeTheme = (event) => {
    setTheme(event.target.value);
  };

  const [language, setLanguage] = useState(PY);

  const handleChangeLanguage = (event) => {
    const value = event.target.value;
    setLanguage(value);

    switch (value) {
      case PY:
        setLang("py");
        setCode(problem.codeDefault["py"]);
        break;
      case JV:
        setLang("java");
        setCode(problem.codeDefault["java"]);
        break;
      case C:
        setLang("c");
        setCode(problem.codeDefault["c"]);
        break;
      case CP:
        setLang("cpp");
        setCode(problem.codeDefault["cpp"]);
        break;
      case CS:
        setLang("cs");
        setCode(problem.codeDefault["cs"]);
        break;
      default:
        break;
    }
  };

  const [fontSize, setFontSize] = useState(16);
  const handleChangeFontSize = (event) => {
    setFontSize(event.target.value);
  };

  const onSubmit = (code, language) => {
    console.log(code);
    console.log(language);
    setButton({ enable: true, color: "error" });
    Compile.CompileCode(
      language,
      code,
      id,
      user._id || "619a0ed806d1fa5372cab99f"
    )
      .then((result) => {
        setIsSubmit(true);
        setButton({ enable: false, color: "success" });
        setResult(
          `Result: match ${result.data.match}\n Runtime: ${result.data.runtime}ms`
        );
        console.log(result.data.results);
        setOutput(result.data.results);
      })
      .catch((error) => {
        setIsSubmit(true);
        setResult(`error: ${error}`);
      });
  };

  useEffect(() => {
    Compile.GetProblemsById(id).then((result) => {
      setProblem(result);
      setCode(result.codeDefault["py"]);
      setLang("py");
    });
  }, []);

  return (
    <div className="page_code_container">
      <ProblemTitle title={problem.title} />
      <Container maxWidth="lg" className="problem_container">
        <Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Problem" {...a11yProps(0)} />
                <Tab label="Discussions" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {problem.description}
              {/* {problem.testCase && 
                            <div>
                                <div>Input</div>
                                <div>{problem.testCase.pop().input.join(" ")}</div>
                                <div>Output</div>
                                <div>{problem.testCase.pop().output.join(" ")}</div>
                            </div>} */}
              {problem.testCase && problem.testCase.length > 0 && (
                <div>
                  <div>Input</div>
                  <div>
                    {problem.testCase[problem.testCase.length - 1].input.join(
                      " "
                    )}
                  </div>
                  <div>Output</div>
                  <div>
                    {problem.testCase[problem.testCase.length - 1].output.join(
                      " "
                    )}
                  </div>
                </div>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {listSubmited ? (
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Language</th>
                      <th>Testcase done</th>
                      <th>Runtime</th>
                      <th>Date Submit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSubmited.map((item) => {
                      // changed here
                      console.log("item: ", item);
                      return (
                        <tr>
                          {Object.values(item).map((field) => {
                            // changed here
                            console.log("field: ", field);
                            return <td>{field}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                ""
              )}
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
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"github"}>github</MenuItem>
              <MenuItem value={"monokai"}>monokai</MenuItem>
            </Select>
          </FormControl>
          <div className="label_selection">Language</div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              sx={{ height: 50 }}
              value={language}
              onChange={handleChangeLanguage}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={C}>C</MenuItem>
              <MenuItem value={CS}>C#</MenuItem>
              <MenuItem value={CP}>C++</MenuItem>
              <MenuItem value={PY}>Python</MenuItem>
              <MenuItem value={JV}>Java</MenuItem>
            </Select>
          </FormControl>
          <div className="label_selection">Font size</div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              sx={{ height: 50 }}
              value={fontSize}
              onChange={handleChangeFontSize}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={22}>22</MenuItem>
            </Select>
          </FormControl>
        </div>
        <AceEditor
          width="100%"
          placeholder="Start Coding"
          mode="java"
          theme={theme}
          name="editor"
          onChange={(currentCode) => setCode(currentCode)}
          fontSize={fontSize}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          setOptions={{
            fontFamily: "monospace",
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 1,
          }}
        />
      </Container>
      <Container maxWidth="lg">
        <div className="editor_header_container">
          <Button
            disabled={button.enable}
            variant="contained"
            color={button.color}
            onClick={() => {
              onSubmit(code, lang);
            }}
          >
            Submit
          </Button>
        </div>
      </Container>
      {isSubmit && (
        <Container className="problem_container">
          <div>{result}</div>

          {output ? (
            <table>
              <thead>
                <tr>
                  <th>input</th>
                  <th>expectOutput</th>
                  <th>output</th>
                </tr>
              </thead>
              <tbody>
                {output.map((item) => {
                  // changed here
                  console.log("item: ", item);
                  return (
                    <tr>
                      {Object.values(item).map((field) => {
                        // changed here
                        console.log("field: ", field);
                        return <td>{field.join(" ")}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </Container>
      )}
    </div>
  );
}

function ProblemTitle(props) {
  return (
    <div className="problem_title">
      <h2>{props.title}</h2>
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
