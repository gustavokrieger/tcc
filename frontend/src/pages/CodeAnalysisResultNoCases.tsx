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
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    },
    textAndButton: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    text: {
      textAlign: 'center',
      marginBottom: theme.spacing(6.5),
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
      <SettingsMenu />
      <Container className={classes.mainContainer}>
        <div className={classes.textAndButton}>
          <Typography className={classes.text} variant="h2">
            {text}
          </Typography>
          <UploadButtonToResultPage beforeChange={() => setIsLoading(true)}>
            novo upload
          </UploadButtonToResultPage>
        </div>
        <CodeSmellInformation />
      </Container>
    </>
  );
}
