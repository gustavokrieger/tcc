import React, {useState} from 'react';
import CodeFilesUpload from './CodeFilesUpload';
import CodeAnalysisResult from './CodeAnalysisResult';

export default function App() {
  const [isCodeUploaded] = useState(false);

  let page;
  if (!isCodeUploaded) {
    page = <CodeFilesUpload />;
  } else {
    page = <CodeAnalysisResult />;
  }

  return <div className="app"> {page} </div>;
}
