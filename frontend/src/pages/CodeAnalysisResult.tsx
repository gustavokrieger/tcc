import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import VerticalTabs, {Tab} from '../components/vertical_tabs/VerticalTabs';
import ViolationCase, {
  ViolationCaseProps,
} from '../components/violation_case/ViolationCase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsMenu from '../components/settings/SettingsMenu';
import CodeSmellInformation from '../components/CodeSmellInformation';
import UploadButtonToResultPage from '../components/upload_button_to_result_page/UploadButtonToResultPage';
import {CodeAnalysisResultNoCasesProps} from './CodeAnalysisResultNoCases';
import {Path} from './Path';

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
    tabsPaper: {
      height: '66%',
      margin: 'auto',
    },
  })
);

export type CodeAnalysisResultProps = {
  codeSmellCasesList: Iterable<CodeSmellCases>;
};

export type CodeSmellCases = {
  codeSmell: string;
  cases: ViolationCaseProps[];
};

export default function CodeAnalysisResult(
  props: RouteComponentProps<{}, any, CodeAnalysisResultProps | any> // "any" is a Workaround.
) {
  const classes = useStyles();
  const history = useHistory();
  const codeSmellCasesList: CodeSmellCases[] =
    props.location.state.codeSmellCasesList;

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function createTabs(): Tab[] {
      const newTabs: Tab[] = [];
      for (const codeSmellCases of codeSmellCasesList) {
        const tabChildren: React.ReactNode[] = [];
        for (const codeSmellCase of codeSmellCases.cases) {
          tabChildren.push(
            <ViolationCase key={codeSmellCase.id} {...codeSmellCase} />
          );
        }
        const newTab: Tab = {
          label: codeSmellCases.codeSmell,
          children: tabChildren,
        };
        newTabs.push(newTab);
      }
      return newTabs;
    }
    setTabs(createTabs());
    setIsLoading(false);
  }, [codeSmellCasesList]);

  if (isLoading) {
    return <></>;
  }
  if (tabs.length === 0) {
    const nextPageProps: CodeAnalysisResultNoCasesProps = {
      text: 'Parabéns, nenhum code smell foi encontrado!',
    };
    history.replace(Path.CODE_ANALYSIS_RESULT_NO_CASES, nextPageProps);
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
          Resultado da Análise
        </Typography>
        <Paper variant="outlined" square className={classes.tabsPaper}>
          <VerticalTabs tabs={tabs} />
        </Paper>
        <CodeSmellInformation />
      </Container>
    </>
  );
}
