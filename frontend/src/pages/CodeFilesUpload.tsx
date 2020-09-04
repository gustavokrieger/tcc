import React from 'react';
import DropzoneArea from '../components/DropzoneArea';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import SynchronousFile from '../SynchronousFile';

export default function CodeFilesUpload() {
  const history = useHistory();

  async function handleDrop(files: File[]) {
    history.push(Path.LOADING);
    const report = await requestReport(files);
    const synchronousFiles = await getConvertedFiles(files);
    history.push(Path.CODE_ANALYSIS_RESULT, {
      report: report,
      synchronousFiles: synchronousFiles,
    });
  }

  async function requestReport(files: File[]) {
    const codeAnalysisRequester = new CodeAnalysisRequester();
    return await codeAnalysisRequester.run(files);
  }

  async function getConvertedFiles(files: File[]) {
    const synchronousFiles: SynchronousFile[] = [];
    for (const file of files) {
      const synchronousFile = await SynchronousFile.fromFile(file);
      synchronousFiles.push(synchronousFile);
    }
    return synchronousFiles;
  }

  return (
    <div className="code-files-upload">
      <DropzoneArea onDrop={handleDrop} acceptedFiles={['.java']} />
    </div>
  );
}
