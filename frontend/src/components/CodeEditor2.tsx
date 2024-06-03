import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { python } from '@codemirror/lang-python';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: code,
        extensions: [basicSetup, python()],
      });

      viewRef.current = new EditorView({
        state: startState,
        parent: editorRef.current,
        dispatch: (tr) => {
          const newState = viewRef.current!.state.update(tr);
          viewRef.current!.update([tr]);
          setCode(newState.doc.toString());
        },
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: code },
      });
    }
  }, [code]);

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
      {/* <div ref={editorRef} className="border p-2 h-64"></div> */}
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