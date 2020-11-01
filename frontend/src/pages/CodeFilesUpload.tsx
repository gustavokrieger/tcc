import React, {ChangeEvent, useEffect, useState} from 'react';
import CodeAnalysisRequester from '../CodeAnalysisRequester';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import CircularProgress from '../components/CircularProgress';
import UploadButton from '../components/UploadButton';
import assert from 'assert';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {CodeAnalysisResultProps} from './CodeAnalysisResult';
import ContentsOfFileUtility from '../ContentsOfFileUtility';
import CodeSmellCasesList from '../CodeSmellCasesList';
import {codeWithViolationGenerator} from '../code_with_violation/codeWithViolationGenerator';
import SettingsMenu from '../components/SettingsMenu';
import VideoPlayer from '../components/VideoPlayer';
import CodeSmellInformation from '../components/CodeSmellInformation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    title: {
      textTransform: 'capitalize',
      margin: theme.spacing(4),
    },
    subtitle: {
      fontSize: theme.typography.fontSize + 4,
      margin: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    upload: {
      margin: theme.spacing(2),
    },
    video: {
      marginTop: 'auto',
    },
  })
);

export type ContentsOfFile = {
  text: string;
  relativePath: string;
};

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
        report.files,
        contentsOfFiles
      );
      const codeSmellCasesList = CodeSmellCasesList.fromIterable(
        codeWithViolations
      );
      return {codeSmellCasesList: codeSmellCasesList.getAll()};
    }

    async function requestReport() {
      const codeAnalysisRequester = new CodeAnalysisRequester();
      return codeAnalysisRequester.run(uploadedFiles);
    }

    getPropsForCodeAnalysisResult().then(props =>
      history.push(Path.CODE_ANALYSIS_RESULT, props)
    );
  }, [uploadedFiles, history]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    assert(event.target.files !== null);
    const files = Array.from(event.target.files);
    const javaFiles = files.filter(hasJavaExtension);
    setUploadedFiles(javaFiles);
  }

  function hasJavaExtension(file: File) {
    const fileNameParts = file.name.split('.');
    if (fileNameParts.length === 0) {
      return false;
    }
    return fileNameParts[fileNameParts.length - 1] === 'java';
  }

  return (
    <>
      <SettingsMenu disabled={isLoading} />
      <Container className={classes.mainContainer}>
        <Typography className={classes.title} variant="h2">
          encontrar code smells
        </Typography>
        <Typography className={classes.subtitle}>
          Selecione abaixo a pasta com o código que deseja analisar!
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
        <VideoPlayer
          className={classes.video}
          source="https://www.youtube.com/embed/RK1K2bCg4J8"
        />
        <CodeSmellInformation />
      </Container>
    </>
  );
}
