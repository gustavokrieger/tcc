import React, {useState} from 'react';
import CodeFilesUpload from './CodeFilesUpload';
import CodeAnalysisResult from './CodeAnalysisResult';

export default function App() {
  const [isCodeUploaded, setIsCodeUploaded] = useState(false);

  function handleCodeFilesDrop() {
    setIsCodeUploaded(true);
  }

  const page = isCodeUploaded ? (
    <CodeAnalysisResult />
  ) : (
    <CodeFilesUpload onDrop={handleCodeFilesDrop} />
  );

  return <div className="app"> {page} </div>;
}
