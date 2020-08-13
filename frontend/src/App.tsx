import React from 'react';
import DropzoneArea from './DropzoneArea';
import CodeAnalysis from './CodeAnalysis';

export default function App() {
  async function handleDrop(files: File[]) {
    const codeAnalysis = new CodeAnalysis();
    await codeAnalysis.run(files);
  }

  return (
    <div className="app">
      <DropzoneArea onDrop={handleDrop} acceptedFiles={['.java']} />
    </div>
  );
}
