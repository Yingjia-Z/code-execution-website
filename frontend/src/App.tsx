import React from 'react';
import CodeEditor from './components/CodeEditor';
import './style.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Code Execution Website</h1>
      </header>
      <main className="container mx-auto">
        <CodeEditor />
      </main>
    </div>
  );
};

export default App;