import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const onChange = React.useCallback((value: string, viewUpdate: any) => {
    setCode(value);
  }, []);

  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error running code');
    }
  };

  return (
    <div className="container mx-auto my-8">
      {/* <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        onChange={onChange}
      /> */}
      <div className="mt-4">
        <button onClick={runCode} className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded">
          Test Code
        </button>
      </div>
      <pre className="mt-4 bg-gray-200 p-4">{output}</pre>
    </div>
  );
};

export default CodeEditor;
