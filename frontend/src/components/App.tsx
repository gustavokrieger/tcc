import React, {useState} from 'react';
import CodeFilesUpload from './CodeFilesUpload';
import CodeAnalysisResult from './CodeAnalysisResult';

export default function App() {
  const [isCodeUploaded] = useState(false);

  let component: object;
  if (!isCodeUploaded) {
    component = <CodeFilesUpload />;
  } else {
    component = <CodeAnalysisResult />;
  }

  return <div className="app"> {component} </div>;
}
