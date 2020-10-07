import React, {useEffect, useState} from 'react';
import {codeWithViolationGenerator} from '../code_with_violation/codeWithViolationGenerator';
import * as pmdOutput from '../pmdOutput';
import {RouteComponentProps} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '../components/vertical_tabs/Tabs';
import VerticalTabs from '../components/vertical_tabs/VerticalTabs';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  tabs: {
    height: '100%',
  },
});

export type Props = {
  report: pmdOutput.Report;
  contentsOfFiles: ContentsOfFile[];
};

export type ContentsOfFile = {
  name: string;
  text: string;
};

export default function CodeAnalysisResult(
  props: RouteComponentProps<{}, any, Props | any> // "any" is a Workaround.
) {
  const classes = useStyles();
  const report: pmdOutput.Report = props.location.state.report;
  const contentsOfFiles = props.location.state.contentsOfFiles;

  const [tabs, setTabs] = useState(new Tabs());

  useEffect(() => {
    function createTabs(): Tabs {
      const codeWithViolations = codeWithViolationGenerator(
        report,
        contentsOfFiles
      );
      return Tabs.fromIterable(codeWithViolations);
    }

    setTabs(createTabs());
  }, [report, contentsOfFiles]);

  return (
    <Container className={classes.root}>
      <VerticalTabs className={classes.tabs} tabs={tabs.getAll()} />
    </Container>
  );
}
