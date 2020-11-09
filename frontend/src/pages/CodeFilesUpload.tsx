import React, {useState} from 'react';
import CircularProgress from '../components/CircularProgress';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SettingsMenu from '../components/settings/SettingsMenu';
import VideoPlayer from '../components/VideoPlayer';
import CodeSmellInformation from '../components/CodeSmellInformation';
import UploadButtonToResultPage from '../components/upload_button_to_result_page/UploadButtonToResultPage';

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

  const [isLoading, setIsLoading] = useState(false);

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
          <UploadButtonToResultPage beforeChange={() => setIsLoading(true)}>
            upload de código
          </UploadButtonToResultPage>
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
