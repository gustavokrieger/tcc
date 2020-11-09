import React, {useState} from 'react';
import UploadButtonToResultPage from '../components/upload_button_to_result_page/UploadButtonToResultPage';
import SettingsMenu from '../components/settings/SettingsMenu';
import {Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CodeSmellInformation from '../components/CodeSmellInformation';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {RouteComponentProps} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadButton: {
      position: 'absolute',
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    title: {
      margin: theme.spacing(3),
    },
    footer: {
      marginTop: 'auto',
    },
  })
);

export type CodeAnalysisResultNoCasesProps = {
  text: string;
};

export default function CodeAnalysisResultNoCases(
  props: RouteComponentProps<{}, any, CodeAnalysisResultNoCasesProps | any> // "any" is a Workaround.
) {
  const classes = useStyles();
  const text: string[] = props.location.state.text;

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <></>;
  }
  return (
    <>
      <UploadButtonToResultPage
        className={classes.uploadButton}
        beforeChange={() => setIsLoading(true)}
      >
        novo upload
      </UploadButtonToResultPage>
      <SettingsMenu />
      <Container className={classes.mainContainer}>
        <Typography className={classes.title} variant="h2">
          {text}
        </Typography>
        <CodeSmellInformation className={classes.footer} />
      </Container>
    </>
  );
}
