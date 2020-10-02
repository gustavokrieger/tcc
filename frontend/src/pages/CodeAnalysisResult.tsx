import React, {useEffect, useState} from 'react';
import VerticalTabs from '../components/vertical_tabs/VerticalTabs';
import Entries from '../components/vertical_tabs/Entries';
import {codeWithViolationGenerator} from '../code_with_violation/codeWithViolationGenerator';
import * as pmdOutput from '../pmdOutput';
import {RouteComponentProps} from 'react-router-dom';
import SynchronousFile from '../SynchronousFile';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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
  synchronousFiles: SynchronousFile[];
};

export default function CodeAnalysisResult(
  props: RouteComponentProps<{}, any, Props | any> // "any" is a Workaround.
) {
  const classes = useStyles();
  const report: pmdOutput.Report = props.location.state.report;
  const synchronousFiles: SynchronousFile[] =
    props.location.state.synchronousFiles;

  const [entries, setEntries] = useState(new Entries());

  useEffect(() => {
    function getEntries(): Entries {
      const codeWithViolations = codeWithViolationGenerator(
        report,
        synchronousFiles
      );
      return Entries.fromIterable(codeWithViolations);
    }

    setEntries(getEntries());
  }, [report, synchronousFiles]);

  return (
    <Container className={classes.root}>
      <VerticalTabs className={classes.tabs} entries={entries} />
    </Container>
  );
}
