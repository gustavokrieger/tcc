import React, {useEffect, useState} from 'react';
import DropzoneArea from '../components/DropzoneArea';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import SynchronousFile from '../SynchronousFile';
import CircularProgress from '../components/CircularProgress';

export default function CodeFilesUpload() {
  const history = useHistory();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length <= 0) {
      return;
    }
    setIsLoading(true);
    getDataAndChangePage();
  }, [uploadedFiles]);

  async function getDataAndChangePage() {
    const report = await requestReport();
    const synchronousFiles = await getConvertedFiles();
    history.push(Path.CODE_ANALYSIS_RESULT, {
      report: report,
      synchronousFiles: synchronousFiles,
    });
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

  function handleDrop(files: File[]) {
    setUploadedFiles(files);
  }

  return (
    <div className="code-files-upload">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DropzoneArea onDrop={handleDrop} acceptedFiles={['.java']} />
      )}
    </div>
  );
}
