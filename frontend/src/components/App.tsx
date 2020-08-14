import React, {useState} from 'react';
import CodeFilesUpload from './CodeFilesUpload';
import CodeAnalysisResult from './CodeAnalysisResult';

export default function App() {
  const [isCodeUploaded, setIsCodeUploaded] = useState(false);

  const page = isCodeUploaded ? <CodeAnalysisResult /> : <CodeFilesUpload />;

  return <div className="app"> {page} </div>;
}
