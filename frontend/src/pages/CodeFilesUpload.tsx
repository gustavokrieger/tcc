import React, {ChangeEvent, useEffect, useState} from 'react';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import CircularProgress from '../components/CircularProgress';
import UploadButton from '../components/UploadButton';
import assert from 'assert';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import {ViolationCaseProps} from '../components/ViolationCase/ViolationCase3';
import {CodeAnalysisResultProps} from './CodeAnalysisResult2';
import ContentsOfFileUtility from '../ContentsOfFileUtility';
import {codeWithViolationGenerator} from '../code_with_violation/codeWithViolationGenerator';
import CodeSmellCasesList from '../CodeSmellCasesList';

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
      margin: theme.spacing(2),
    },
    subtitle: {
      fontSize: '18px',
      margin: theme.spacing(2),
    },
    upload: {
      margin: theme.spacing(2),
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
      CodeAnalysisResultProps
    > {
      const report = await requestReport();
      const contentsOfFiles = await ContentsOfFileUtility.convertFiles(
        uploadedFiles
      );
      const codeWithViolations = codeWithViolationGenerator(
        report,
        contentsOfFiles
      );
      const codeSmellCasesList = CodeSmellCasesList.fromIterable(
        codeWithViolations
      );
      return {codeSmellCasesList: codeSmellCasesList.getAll()};
    }

    async function requestReport() {
      const codeAnalysisRequester = new CodeAnalysisRequester();
      return await codeAnalysisRequester.run(uploadedFiles);
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
        encontrar code smells
      </Typography>
      <Typography className={classes.subtitle} color="textSecondary">
        selecione a pasta com o código que deseja analisar!
      </Typography>
      {isLoading ? (
        <CircularProgress className={classes.upload} />
      ) : (
        <>
          <UploadButton className={classes.upload} onChange={handleChange}>
            upload de código
          </UploadButton>
        </>
      )}
    </Container>
  );
}
