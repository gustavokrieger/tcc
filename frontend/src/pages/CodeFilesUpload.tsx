import React, {ChangeEvent, useEffect, useState} from 'react';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import SynchronousFile from '../SynchronousFile';
import CircularProgress from '../components/CircularProgress';
import {Props as PropsOfCodeAnalysisResult} from './CodeAnalysisResult';
import UploadButton from '../components/UploadButton';
import assert from 'assert';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function CodeFilesUpload() {
  const classes = useStyles();
  const history = useHistory();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (uploadedFiles.length <= 0) {
      return;
    }
    setIsLoading(true);
    getPropsForCodeAnalysisResult(uploadedFiles).then(props =>
      history.push(Path.CODE_ANALYSIS_RESULT, props)
    );
  }, [uploadedFiles, history]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    assert(event.target.files !== null);
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  }

  return (
    <Container className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <UploadButton accept=".java" onChange={handleChange} />
      )}
    </Container>
  );
}

async function getPropsForCodeAnalysisResult(
  files: File[]
): Promise<PropsOfCodeAnalysisResult> {
  const report = await requestReport(files);
  const synchronousFiles = await getConvertedFiles(files);
  return {report: report, synchronousFiles: synchronousFiles};
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
