import React, {ChangeEvent, useEffect, useState} from 'react';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import SynchronousFile from '../SynchronousFile';
import CircularProgress from '../components/CircularProgress';
import {Props as PropsOfCodeAnalysisResult} from './CodeAnalysisResult';
import UploadButton from '../components/UploadButton';
import assert from 'assert';

export default function CodeFilesUpload() {
  const history = useHistory();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length <= 0) {
      return;
    }
    setIsLoading(true);
    getPropsForCodeAnalysisResult().then(props =>
      history.push(Path.CODE_ANALYSIS_RESULT, props)
    );
  }, [uploadedFiles]);

  async function getPropsForCodeAnalysisResult(): Promise<
    PropsOfCodeAnalysisResult
  > {
    const report = await requestReport();
    const synchronousFiles = await getConvertedFiles();
    return {report: report, synchronousFiles: synchronousFiles};
  }

  async function requestReport() {
    const codeAnalysisRequester = new CodeAnalysisRequester();
    return await codeAnalysisRequester.run(uploadedFiles);
  }

  async function getConvertedFiles() {
    const synchronousFiles: SynchronousFile[] = [];
    for (const file of uploadedFiles) {
      const synchronousFile = await SynchronousFile.fromFile(file);
      synchronousFiles.push(synchronousFile);
    }
    return synchronousFiles;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    assert(event.target.files !== null);
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  }

  return (
    <div className="code-files-upload">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <UploadButton accept=".java" onChange={handleChange} />
      )}
    </div>
  );
}
