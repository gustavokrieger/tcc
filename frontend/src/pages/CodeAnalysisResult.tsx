import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import VerticalTabs, {Tab} from '../components/vertical_tabs/VerticalTabs';
import ViolationCase, {
  ViolationCaseProps,
} from '../components/violation_case/ViolationCase';
import ControlledAccordions from '../components/ControlledAccordions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15vh',
  },
  title: {
    textTransform: 'capitalize',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '85vh',
  },
  tabsPaper: {
    height: '56%',
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
  }, [codeSmellCasesList]);

  return (
    <>
      <Container className={classes.titleContainer}>
        <Typography className={classes.title} variant="h2">
          resultado da análise
        </Typography>
      </Container>
      <Container className={classes.mainContainer}>
        <Paper variant="outlined" className={classes.tabsPaper}>
          <VerticalTabs tabs={tabs} />
        </Paper>
        <ControlledAccordions />
      </Container>
    </>
  );
}
