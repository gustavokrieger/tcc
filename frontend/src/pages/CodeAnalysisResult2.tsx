import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import VerticalTabs, {Tab} from '../components/vertical_tabs/VerticalTabs';
import ViolationCase3, {
  ViolationCaseProps,
} from '../components/ViolationCase/ViolationCase3';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  tabs: {
    height: '100%',
  },
});

export type CodeAnalysisResultProps = {
  codeSmellCasesList: CodeSmellCases[];
};

type CodeSmellCases = {
  codeSmell: string;
  cases: ViolationCaseProps[];
};

export default function CodeAnalysisResult2(
  props: RouteComponentProps<{}, any, CodeAnalysisResultProps | any> // "any" is a Workaround.
) {
  const classes = useStyles();
  const codeSmellCasesList: CodeSmellCases[] =
    props.location.state.codeSmellCasesList;

  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const newTabs: Tab[] = [];
    for (const codeSmellCases of codeSmellCasesList) {
      const tabChildren: React.ReactNode[] = [];
      for (const codeSmellCase of codeSmellCases.cases) {
        tabChildren.push(<ViolationCase3 {...codeSmellCase} />);
      }
      const newTab: Tab = {
        label: codeSmellCases.codeSmell,
        children: tabChildren,
      };
      newTabs.push(newTab);
    }
    setTabs(newTabs);
  }, [codeSmellCasesList]);

  return (
    <Container className={classes.root}>
      <VerticalTabs className={classes.tabs} tabs={tabs} />
    </Container>
  );
}
