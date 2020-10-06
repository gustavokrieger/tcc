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
  const [report, setReport] = useState<pmdOutput.Report>(
    props.location.state.report
  );
  const [synchronousFiles, setSynchronousFiles] = useState<SynchronousFile[]>(
    props.location.state.synchronousFiles
  );

  const [entries, setEntries] = useState(new Entries());

  useEffect(() => {
    let localReport = report;
    let localSynchronousFiles = synchronousFiles;

    const test = sessionStorage.getItem('test');
    if (test !== null) {
      const fromStorage: Props = JSON.parse(test);

      const newSynchronousFiles: SynchronousFile[] = [];
      for (const synchronousFile of fromStorage.synchronousFiles) {
        // fromStorage.synchronousFiles[index] = Object.create(
        //   SynchronousFile.prototype,
        //   Object.getOwnPropertyDescriptors(synchronousFile)
        // );
        // const instance = new SynchronousFile('', '');
        // Object.assign(instance, synchronousFile);
        // fromStorage.synchronousFiles[i] = instance;

        const newSynchronousFile = SynchronousFile.fromJSON(synchronousFile);
        newSynchronousFiles.push(newSynchronousFile);
      }
      setReport(fromStorage.report);
      setSynchronousFiles(newSynchronousFiles);

      localReport = fromStorage.report;
      localSynchronousFiles = newSynchronousFiles;
    }

    function getEntries(): Entries {
      const codeWithViolations = codeWithViolationGenerator(localReport, [
        ...localSynchronousFiles,
      ]);
      return Entries.fromIterable(codeWithViolations);
    }

    setEntries(getEntries());
  }, []);

  useEffect(() => {
    const toStorage: Props = {
      report: report,
      synchronousFiles: synchronousFiles,
    };
    sessionStorage.setItem('test', JSON.stringify(toStorage));
  }, [report, synchronousFiles]);

  return (
    <Container className={classes.root}>
      <VerticalTabs className={classes.tabs} entries={entries} />
    </Container>
  );
}
