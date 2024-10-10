import React, { useRef, useState } from "react";
import { Box, ChakraProvider, Grid, Button } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "./constants";
import { executeCode } from "./api";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import theme from "./theme";
import { useNavigate } from "react-router-dom";
import { NioButton } from "../../components";
import { BiArrowBack } from "react-icons/bi";


const CodeEditors = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };  const goBack = () => {
    navigate(-1);
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  const saveToFile = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    let extension = "";

    switch (language) {
        case "javascript":
            extension = "js";
            break;
        case "typescript":
            extension = "ts";
            break;
        case "python":
            extension = "py";
            break;
        case "java":
            extension = "java";
            break;
        case "csharp":
            extension = "cs";
            break;
        case "php":
            extension = "php";
            break;
        default:
            extension = "txt"; // Fallback to plain text if language is not recognized
            break;
    }

    element.href = URL.createObjectURL(file);
    element.download = `code.${extension}`;
    document.body.appendChild(element);
    element.click();
};

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <Box gridColumn="span 12">
      <Button
      onClick={goBack}
      backgroundColor="transparent"
      color="blue.500"
      _hover={{ color: "blue.700" }}
      _active={{ color: "blue.700" }}
      _focus={{ boxShadow: "none" }}
    >
      <BiArrowBack  fontSize="24px" />
    </Button>
          </Box>
      <ChakraProvider>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <Box gridColumn="span 6">
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="75vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
            <Button mt={4} onClick={saveToFile}>
              Enregistrer dans un fichier
            </Button>
          </Box>
          <Box gridColumn="span 6">
            <Output
              editorRef={editorRef}
              language={language}
              output={output}
              isLoading={isLoading}
              isError={isError}
              onRunCode={runCode}
            />
          </Box>
          
        </Grid>
      </ChakraProvider>
    </Box>
  );
};

export default CodeEditors;
