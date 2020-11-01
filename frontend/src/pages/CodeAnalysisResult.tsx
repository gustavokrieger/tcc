import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import VerticalTabs, {Tab} from '../components/vertical_tabs/VerticalTabs';
import ViolationCase, {
  ViolationCaseProps,
} from '../components/violation_case/ViolationCase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsMenu from '../components/SettingsMenu';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  tabsPaper: {
    height: '68%',
    minWidth: '29.8%',
  },
});

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
  const codeSmellCasesList: CodeSmellCases[] =
    props.location.state.codeSmellCasesList;

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function createTabs(): Tab[] {
      const newTabs: Tab[] = [];
      for (const codeSmellCases of codeSmellCasesList) {
        const tabChildren: React.ReactNode[] = [];
        for (const codeSmellCase of codeSmellCases.cases) {
          tabChildren.push(<ViolationCase {...codeSmellCase} />);
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
    setLoading(false);
  }, [codeSmellCasesList]);

  if (loading) {
    return <></>;
  }
  if (tabs.length === 0) {
    return (
      <Typography variant="h1">
        Parabéns, nenhum code smell foi encontrado!
      </Typography>
    );
  }
  return (
    <>
      <SettingsMenu />
      <Container className={classes.mainContainer}>
        <Typography variant="h2">Resultado da Análise</Typography>
        <Paper variant="outlined" className={classes.tabsPaper}>
          <VerticalTabs tabs={tabs} />
        </Paper>
      </Container>
    </>
  );
}
