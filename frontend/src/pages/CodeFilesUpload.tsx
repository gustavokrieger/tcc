import React, {ChangeEvent, useEffect, useState} from 'react';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import SynchronousFile from '../SynchronousFile';
import CircularProgress from '../components/CircularProgress';
import {Props as PropsOfCodeAnalysisResult} from './CodeAnalysisResult';
import UploadButton from '../components/UploadButton';
import assert from 'assert';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '35vh',
    },
    title: {
      textTransform: 'capitalize',
      margin: theme.spacing(3),
    },
    upload: {
      margin: theme.spacing(3),
    },
  })
);

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

    getPropsForCodeAnalysisResult().then(props =>
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
      <Typography className={classes.title} variant="h2">
        find code smells
      </Typography>
      {isLoading ? (
        <CircularProgress className={classes.upload} />
      ) : (
        <>
          <UploadButton
            className={classes.upload}
            accept=".java"
            onChange={handleChange}
          >
            upload code
          </UploadButton>
        </>
      )}
    </Container>
  );
}
