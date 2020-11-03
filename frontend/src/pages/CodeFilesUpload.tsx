import React, {ChangeEvent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';
import CircularProgress from '../components/CircularProgress';
import UploadButton from '../components/UploadButton';
import assert from 'assert';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SettingsMenu from '../components/settings/SettingsMenu';
import VideoPlayer from '../components/VideoPlayer';
import CodeSmellInformation from '../components/CodeSmellInformation';
import JavaFiles from '../JavaFiles';
import CodeAnalysisResultUtility from '../CodeAnalysisResultUtility';

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
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
    },
    subtitle: {
      fontSize: theme.typography.fontSize + 4,
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: 'auto',
    },
    video: {
      marginBottom: theme.spacing(6),
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

  const [javaFiles, setJavaFiles] = useState(JavaFiles.createEmpty);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // todo mostrar componente caso aconteça
    if (javaFiles.isEmpty()) {
      return;
    }
    setIsLoading(true);
    CodeAnalysisResultUtility.convertFilesToProps(
      javaFiles
    ).then(nextPageProps =>
      history.push(Path.CODE_ANALYSIS_RESULT, nextPageProps)
    );
  }, [javaFiles, history]);

  function handleUploadChange(event: ChangeEvent<HTMLInputElement>) {
    assert(event.target.files !== null);
    const newJavaFiles = JavaFiles.fromListRemovingNonJava(event.target.files);
    setJavaFiles(newJavaFiles);
  }

  return (
    <>
      <SettingsMenu disabled={isLoading} />
      <Container className={classes.mainContainer}>
        <Typography className={classes.title} variant="h2">
          encontrar code smells
        </Typography>
        <Typography className={classes.subtitle}>
          Selecione a pasta com o código-fonte Java que deseja analisar!
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <UploadButton onChange={handleUploadChange}>
            upload de código
          </UploadButton>
        )}
        <div className={classes.footer}>
          <VideoPlayer
            className={classes.video}
            source="https://www.youtube.com/embed/RK1K2bCg4J8"
          />
          <CodeSmellInformation />
        </div>
      </Container>
    </>
  );
}
